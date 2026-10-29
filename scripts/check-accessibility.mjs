import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

// Reutiliza o Playwright do MCP; não adiciona dependências à aplicação.
const args = process.argv.slice(2);
const option = name => args[args.indexOf(name) + 1];
const url = args.includes('--url') ? option('--url') : 'http://127.0.0.1:5175/';
const modulePath = args.includes('--playwright') ? option('--playwright') : process.env.PLAYWRIGHT_MODULE;
const { chromium } = await import(modulePath ? pathToFileURL(resolve(modulePath)).href : 'playwright');
const browser = await chromium.launch();
let checks = 0;
const check = (condition, message) => {
  assert.ok(condition, message);
  checks += 1;
  console.log(`OK ${checks}: ${message}`);
};

try {
  for (const width of [1280, 768, 390, 320]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(url);
    await page.locator('.model-card').first().waitFor();
    check(await page.title() === 'Stark Industries — Armaduras de Próxima Geração', `${width}px: projeto correto`);
    check(await page.locator('h1').count() === 1, `${width}px: título principal único`);
    check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px: sem rolagem horizontal da página`);
    check(await page.locator('.mobile-menu,.image-arrow,.review-controls button,.modal-close,.model-bottom button').evaluateAll(elements => elements.filter(element => element.getClientRects().length > 0).every(element => {
      const { width, height } = element.getBoundingClientRect();
      return width >= 44 && height >= 44;
    })), `${width}px: controles pequenos têm alvos de toque de pelo menos 44px`);

    await page.keyboard.press('Tab');
    check(await page.locator('.skip-link').evaluate(element => element === document.activeElement), `${width}px: atalho para conteúdo é o primeiro foco`);
    check(await page.locator('.skip-link').evaluate(element => getComputedStyle(element).outlineStyle === 'solid'), `${width}px: indicador de foco explícito`);
    await page.keyboard.press('Enter');
    check(await page.locator('main').evaluate(element => element === document.activeElement), `${width}px: atalho leva o foco ao conteúdo`);

    if (width <= 760) {
      const toggle = page.getByRole('button', { name: 'Abrir menu', exact: true });
      await toggle.click();
      check(await page.locator('.mobile-menu').getAttribute('aria-expanded') === 'true', `${width}px: menu anuncia abertura`);
      await page.locator('.nav a').first().focus();
      await page.keyboard.press('Escape');
      check(await page.locator('.mobile-menu').getAttribute('aria-expanded') === 'false', `${width}px: Escape fecha menu`);
      check(await page.locator('.mobile-menu').evaluate(element => element === document.activeElement), `${width}px: foco retorna ao botão do menu`);
    }

    const select = page.getByRole('button', { name: 'Selecionar MARK III', exact: true });
    await select.click();
    check(await select.getAttribute('aria-pressed') === 'true', `${width}px: modelo anuncia seleção`);
    check(await page.locator('.image-arrow[aria-pressed="true"]').count() === 1, `${width}px: apenas um modelo selecionado`);
    check((await page.locator('.offer-price').innerText()).includes('4.999'), `${width}px: seleção atualiza oferta`);

    const trigger = page.locator('.offer-info .button');
    await trigger.click();
    check(await page.getByRole('dialog').count() === 1, `${width}px: solicitação abre diálogo`);
    check(await page.getByRole('dialog').getAttribute('aria-describedby') === 'modal-description' && (await page.locator('#modal-description').innerText()).includes('Nenhum dado será enviado'), `${width}px: diálogo descreve a simulação`);
    check(await page.locator('.modal-close').evaluate(element => element.getBoundingClientRect().width >= 44 && element.getBoundingClientRect().height >= 44), `${width}px: fechar modal tem alvo de toque de pelo menos 44px`);
    check(await page.getByRole('textbox', { name: 'Seu nome (obrigatório)', exact: true }).evaluate(element => element === document.activeElement), `${width}px: foco inicial no campo de nome`);
    check(await page.getByRole('textbox', { name: 'Seu nome (obrigatório)', exact: true }).evaluate(element => getComputedStyle(element).outlineWidth === '2px' && getComputedStyle(element).outlineStyle === 'solid'), `${width}px: foco do campo não é ocultado pelo CSS existente`);
    check(await page.locator('main').evaluate(element => element.inert), `${width}px: fundo inerte com modal aberto`);
    check(await page.getByRole('textbox', { name: 'Seu nome (obrigatório)', exact: true }).getAttribute('autocomplete') === 'name', `${width}px: propósito do campo de nome`);
    check(await page.getByRole('textbox', { name: 'Seu e-mail (obrigatório)', exact: true }).getAttribute('autocomplete') === 'email', `${width}px: propósito do campo de e-mail`);

    for (const key of ['Tab', 'Shift+Tab']) {
      let inside = true;
      for (let i = 0; i < 10; i += 1) {
        await page.keyboard.press(key);
        inside &&= await page.evaluate(() => !!document.activeElement.closest('.modal'));
      }
      check(inside, `${width}px: ${key} permanece no diálogo`);
    }
    await page.keyboard.press('Escape');
    check(await page.locator('.modal').count() === 0, `${width}px: Escape fecha diálogo`);
    check(await trigger.evaluate(element => element === document.activeElement), `${width}px: foco retorna ao acionador`);
    check(await page.locator('main').evaluate(element => !element.inert), `${width}px: conteúdo deixa de ser inerte`);

    await page.getByRole('button', { name: 'Ver modelo MARK III e solicitar acesso', exact: true }).click();
    check((await page.locator('.selected-model b').innerText()) === 'MARK III', `${width}px: card abre solicitação para o modelo correto`);
    await page.locator('form button[type="submit"]').click();
    check(await page.locator('.success-state').count() === 0, `${width}px: validação impede envio vazio`);
    await page.getByRole('textbox', { name: 'Seu nome (obrigatório)', exact: true }).fill('Teste de acessibilidade');
    await page.getByRole('textbox', { name: 'Seu e-mail (obrigatório)', exact: true }).fill('teste@example.com');
    await page.locator('form button[type="submit"]').click();
    await page.locator('.success-state').waitFor();
    check((await page.locator('#modal-description').innerText()).includes('não foi enviada'), `${width}px: descrição do diálogo acompanha a confirmação`);
    check(await page.locator('#modal-title').evaluate(element => element === document.activeElement), `${width}px: confirmação recebe foco`);
    await page.getByRole('button', { name: 'Voltar ao site' }).click();
    check(await page.locator('.modal').count() === 0, `${width}px: retorno fecha confirmação`);

    const faq = page.locator('.faq-item button').first();
    await faq.focus();
    const oldState = await faq.getAttribute('aria-expanded');
    await page.keyboard.press('Enter');
    check(await faq.getAttribute('aria-expanded') !== oldState, `${width}px: FAQ operável por teclado`);
    check(await faq.evaluate(button => {
      const answer = document.getElementById(button.getAttribute('aria-controls'));
      return answer && answer.getAttribute('aria-labelledby') === button.id && answer.hidden === (button.getAttribute('aria-expanded') === 'false');
    }), `${width}px: FAQ associa pergunta e resposta e oculta o painel fechado`);
    check(await page.locator('.faq-item p[hidden]').evaluateAll(elements => elements.every(element => getComputedStyle(element).display === 'none')), `${width}px: respostas fechadas não ocupam espaço nem ficam visíveis`);
    const oldReview = await page.locator('.reviews [role="status"]').innerText();
    await page.getByRole('button', { name: 'Próxima avaliação' }).click();
    check(await page.locator('.reviews [role="status"]').innerText() !== oldReview, `${width}px: carrossel atualiza anúncio acessível`);
    await page.emulateMedia({ forcedColors: 'active', reducedMotion: 'reduce' });
    await page.keyboard.press('Tab');
    await select.focus();
    check(await select.evaluate(element => getComputedStyle(element).outlineStyle === 'solid' && getComputedStyle(element).borderStyle === 'solid'), `${width}px: foco e seleção permanecem sinalizados em cores forçadas`);
    check(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior === 'auto'), `${width}px: movimento reduzido desativa rolagem animada`);
    check(errors.length === 0, `${width}px: sem erros JavaScript (${errors.join(', ')})`);
    await page.close();
  }
  console.log(`\n${checks} verificações funcionais aprovadas. Não substituem testes com leitor de tela ou a auditoria WCAG.`);
} finally {
  await browser.close();
}
