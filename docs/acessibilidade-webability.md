# WebAbility no OpenCode — configuração e auditoria

## Ambiente verificado

- OpenCode **2.0.21**, configuração JSON V2 em `opencode.json`, usando `mcp.servers`.
- React **18**, JavaScript/JSX, CSS próprio, Vite **6** e ícones `lucide-react`.
- Estrutura MVVM: dados em `src/models/`, estado e lógica em `src/viewmodels/`, componentes em `src/views/`.
- Scripts existentes: `npm run dev`, `npm run build`, `npm run preview`. Não havia scripts de testes ou lint.
- MCP **WebAbility 1.3.1** já configurado localmente; MCP **Pencil** definido na configuração global do usuário. Ambos foram preservados.
- As alterações preexistentes em `package-lock.json` e `node_modules/` foram preservadas. Não foi executado `npm install`/`npm ci` e nenhuma dependência foi adicionada ao `package.json`. Executar o Vite pode atualizar seu cache em `node_modules/.vite/`.

## Configuração

O servidor local existente foi mantido. Foi acrescentado somente `$schema` ao `opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "servers": {
      "webability": {
        "type": "local",
        "command": ["npx", "-y", "-p", "@webability/mcp", "webability-mcp"]
      }
    }
  }
}
```

O OpenCode inicia o processo MCP automaticamente. Para verificar:

```bash
opencode --version
opencode mcp list
```

Resultado confirmado durante esta implementação:

```text
✓ pencil      connected
✓ webability  connected
```

Para recriar **apenas esta entrada**, se ela não existir:

```bash
opencode mcp add webability -- npx -y -p @webability/mcp webability-mcp
```

### Local versus remoto

- **Local (escolhido):** o navegador roda nesta máquina e alcança localhost. Auditorias básicas não exigem conta ou chave de API.
- **Remoto:** `https://mcp.webability.io/mcp`, apropriado para páginas públicas/homologação. Não alcança o localhost desta máquina diretamente. Não foi adicionado para evitar ferramentas duplicadas e não foi testado.
- Caso seja necessário trocar a entrada por uma conexão remota para um projeto publicado: `opencode mcp add webability --url https://mcp.webability.io/mcp`. Essa troca deixa de usar o navegador local. Se a conexão solicitar autenticação, utilizar `/mcps` no OpenCode e seguir a autenticação oficial; não colocar credenciais no JSON.

### Navegador de auditoria

A conexão MCP funcionava, mas as varreduras falhavam por ausência de `chromium_headless_shell-1217`. Foi utilizado o instalador do **Playwright 1.59.1 já incluído no MCP**, com `install chromium --only-shell`. O download instalou Chromium headless e seus auxiliares FFmpeg/Winldd no cache `%LOCALAPPDATA%\ms-playwright`, não nas dependências da aplicação.

Se o navegador voltar a faltar, reutilizar o Playwright do pacote:

```bash
npx -y -p @webability/mcp -c "playwright install chromium --only-shell"
```

Não é necessário instalar `@playwright/test`, outro MCP, widget de acessibilidade ou uma biblioteca na aplicação.

## Execução do projeto

O Vite usa normalmente a porta **5173**, mas ela já estava ocupada pelo projeto EcoDog Park. A porta **5174** servia um build anterior de Stark Industries. Esse build foi preservado; ele não representa as correções atuais.

Para testar o código atual, foi iniciado o Vite em **http://127.0.0.1:5175/**:

```bash
npm run dev -- --host 127.0.0.1 --port 5175 --strictPort
```

Reutilizar esse servidor se ele ainda estiver ativo. Não encerrar o outro projeto para liberar a porta padrão.

## Ferramentas realmente disponíveis

O catálogo da conexão expôs 14 ferramentas:

| Ferramenta | Finalidade |
| --- | --- |
| `scan_page` | Varredura de URL em desktop, tablet ou celular; aceita escopo por seletor. |
| `flow_scan` | Varredura de sequência explícita de URLs. |
| `scan_html` | Auditoria de HTML; nesta versão usa navegador e axe-core. |
| `detect_framework` | Detecção heurística da interface. |
| `generate_ai_fix` | Sugestões de correção contextualizadas; não altera os arquivos automaticamente. |
| `verify_fix` | Revalidação de seletor/critério. |
| `check_color_contrast` | Verificação de pares de cores. |
| `check_aria` | Validação de atributos ARIA e nomes/roles. |
| `get_rules` | Consulta às regras disponíveis. |
| `find_source` | Busca de origem em arquivos locais. |
| `scan_history` | Consulta ao histórico local. |
| `visual_audit` | Auditoria visual; não utilizada neste trabalho. |
| `start_audit` / `get_audit` | Relatório remoto com conta; não utilizados. |

`diff_scan` **não estava disponível** na versão conectada. A comparação foi feita por novas chamadas a `scan_page`, sem atribuir a elas funcionalidades de `diff_scan`.

O detector isolado retornou `tailwind`, enquanto os scans retornaram `plain-css`. A inspeção de `package.json` e `src/styles.css` confirmou **CSS próprio**, sem Tailwind. Essa heurística não foi usada para instalar frameworks ou gerar alterações incompatíveis.

## Auditoria: antes e depois

As contagens abaixo são **ocorrências por contexto**, não um total de problemas únicos. Não somar desktop, celular e snapshots: há sobreposição.

| Contexto | Antes: críticos / graves / moderados / leves | Depois |
| --- | --- | --- |
| Página inicial — desktop | 0 / 5 / 12 / 0 (**17**) | **0** |
| Página inicial — celular | 0 / 5 / 7 / 0 (**12**) | **0** |
| Menu móvel aberto | 0 / 5 / 8 / 0 (**13**, incluindo o restante da página) | **0** |
| Modal — somente `.modal`, desktop | 0 / 1 / 7 / 0 (**8**) | **0** |
| Página inicial — tablet | Não houve baseline inicial; a validação ampliada encontrou **1 grave** no índice sobre a imagem | **0**, após correção |
| Modal em celular, confirmação e FAQ em outro estado | Sem baseline isolado comparável | **0** nos escopos reavaliados |

As varreduras finais não retornaram novos problemas nem itens `incomplete`. Isso não dispensa revisão humana.

### Metodologia e limites dos estados interativos

`scan_page` desta conexão não oferece passos para clicar ou preencher formulários. Um auxiliar **temporário fora do repositório**, usando o Playwright do MCP, abriu a aplicação real, acionou menu/modal/FAQ e capturou o DOM renderizado com seus estilos. Esses snapshots foram servidos em localhost, porta **5176**, exclusivamente para `scan_page` e `verify_fix`.

Os snapshots não executam as interações da aplicação e não validam o comportamento do foco. Para isso foram usados testes separados na aplicação real. Nos modais, o escopo `.modal` evita tratar contrastes do conteúdo atrás do backdrop como violações do formulário.

O servidor temporário de snapshots foi encerrado ao terminar a auditoria. O Vite em 5175 permaneceu disponível para revisar as mudanças. Os arquivos auxiliares e o build de validação estão no diretório temporário, fora do repositório.

### Arquivos desta implementação

- Modificados: `opencode.json`, `README.md`, `src/styles.css`, `src/viewmodels/useRequestModalViewModel.js`, `src/views/App.jsx`, `src/views/Header.jsx`, `src/views/Models.jsx`, `src/views/RequestModal.jsx`, `src/views/Reviews.jsx`.
- Criados: `scripts/check-accessibility.mjs` e este relatório (`docs/acessibilidade-webability.md`).
- Fora do repositório: navegador/auxiliares no cache do Playwright; auxiliar de snapshots, capturas de tela e build no diretório temporário do OpenCode.

### Problemas e correções

| Impacto / critério | Local | Correção |
| --- | --- | --- |
| Grave/moderado, 1.4.3 | `src/styles.css`, números/tags dos modelos e textos secundários das avaliações | Fundos opacos nos pequenos identificadores sobre imagens e maior contraste nos textos afetados. |
| Moderado, 1.4.3 | Botões, avisos de demonstração, rodapé e nota do modal | Fundo vermelho dos botões `#d91f2a`, mantendo o vermelho decorativo original; textos secundários com o tom já existente `--muted`. Branco sobre o botão: **4,10:1 → 5,02:1**. |
| Grave, 1.4.3, descoberto em tablet | `.hero-index` em `src/styles.css` | Fundo escuro discreto para que o contraste não dependa da imagem. |
| Grave, 3.3.2 | Formulário em `src/views/RequestModal.jsx` | Indicação visível “obrigatório” e asterisco decorativo nos campos de nome/e-mail. |
| Moderado, 1.3.5 | Campos de nome/e-mail | `autoComplete="name"` e `autoComplete="email"`. |
| Moderado, 1.4.11 | Inputs e select | Bordas mais contrastantes, mantendo fundo e disposição do formulário. |
| Verificado no navegador, foco/teclado | `src/viewmodels/useRequestModalViewModel.js` e `src/views/RequestModal.jsx` | Foco inicial no nome, contenção de Tab/Shift+Tab, Escape, fundo `inert`, restauração do foco e foco no título da confirmação. |
| Revisão complementar, estado/nome dos controles | `src/views/Header.jsx`, `src/views/Models.jsx` | `aria-expanded`/`aria-controls` no menu; Escape e retorno ao botão; `aria-pressed` na seleção e nome contextual para “Ver modelo”. |
| Revisão complementar, orientação/navegação | `src/views/App.jsx`, `src/views/Reviews.jsx`, `src/styles.css` | Atalho para conteúdo, região de status do carrossel e indicador de foco explícito, incluindo campos cujo CSS antes usava `outline:none`. |

Não foram removidos campos, botões, imagens, validação ou funcionalidades. Os textos alternativos existentes foram preservados; sua qualidade semântica continua dependendo de avaliação humana.

## Validação executada

- **26 chamadas individuais a `verify_fix`:** 17 ocorrências da página inicial, 8 do modal e o índice adicional de tablet. Todas retornaram `verified: true`, `remainingCount: 0`, `needsReview: 0`.
- Os seletores correspondentes foram conferidos no DOM: não houve aprovação causada por remoção dos elementos.
- `scan_page` final: página inicial em desktop/tablet/celular; menu móvel; FAQ em estado alternado; modal em desktop/celular e confirmação. Resultado: **0 problemas** nos escopos testados.
- Testes funcionais em Chromium: **114 verificações**, em 1280, 768, 390 e 320 px, incluindo foco, teclado, modal, seleção/oferta, campos obrigatórios, confirmação, FAQ, carrossel e ausência de erros JavaScript.
- Build Vite aprovado; saída em `%LOCALAPPDATA%\Temp\opencode\stark-accessibility-build`, com `--emptyOutDir false`, sem substituir ou apagar `dist/`.
- `git diff --check` sem erros de whitespace; somente avisos de conversão LF/CRLF do Git no Windows.

### Repetir os testes funcionais

O script não instala Playwright. Reutilize o módulo do MCP; neste ambiente:

```bash
node scripts/check-accessibility.mjs --url http://127.0.0.1:5175/ --playwright C:/Users/0000/AppData/Local/npm-cache/_npx/7df13cb1ec8ef4da/node_modules/playwright/index.mjs
```

O caminho do cache varia entre máquinas/instalações. No PowerShell, localize o Playwright **da instalação do WebAbility** e passe seu `index.mjs` em `--playwright`. Também é possível informar o caminho pela variável `PLAYWRIGHT_MODULE`. Não adicionar Playwright à aplicação apenas para resolver o caminho do cache.

Para compilar sem substituir o build existente, no PowerShell:

```powershell
npm run build -- --outDir "$env:LOCALAPPDATA/Temp/opencode/stark-accessibility-build" --emptyOutDir false
```

### Repetir a auditoria no OpenCode

1. Verifique `opencode mcp list` e reutilize/inicie o Vite na URL correta.
2. Peça: “Use WebAbility `scan_page` em http://127.0.0.1:5175/ para desktop, tablet e mobile. Separe `issues` de `incomplete`. Não aplique correções contextuais sem revisar.”
3. Após editar e servir a mudança, execute `verify_fix` com URL, seletor original e critério WCAG. Confirme também que o seletor ainda existe e faça uma nova auditoria completa.
4. Consulte `scan_history` para resultados anteriores. Nesta instalação, o histórico é local em `~/.webability/scans/`; sua disponibilidade não foi desativada.
5. Para estados de modal/menu, lembre-se de que `scan_page` não clica nos componentes: use uma captura do estado real ou testes de navegador separados. Não assuma que a auditoria da página inicial cobriu o modal fechado.

## Pendências e próximos passos

- **Leitor de tela:** testar com NVDA no Windows; conferir nomes, mudanças da avaliação e anúncio da confirmação.
- **Zoom e legibilidade:** testar 200%/400%, espaçamento de texto e preferência de tamanho de fonte. Reflow em 320 px foi testado, mas não equivale a todos esses cenários.
- **Teclado e foco visual:** revisão humana de todos os controles, incluindo menu aberto, backdrop, alto contraste/cores forçadas e ausência de foco encoberto.
- **Imagens:** revisar se cada alternativa textual comunica a finalidade real e se as imagens meramente decorativas estão corretamente identificadas.
- **Toque:** conferir alvos de interação e espaçamento, especialmente os botões pequenos dos modelos e do carrossel.
- **Navegadores:** validar Firefox, Edge e dispositivos reais; os testes automatizados deste trabalho usaram Chromium headless.
- **Produção:** publicar/regerar `dist/` quando apropriado e repetir a auditoria na URL publicada. O build antigo em 5174 foi preservado e não contém estas correções.

Nenhuma aprovação automatizada constitui certificação de conformidade integral com WCAG 2.2 A/AA.

## Complemento de implementação e revalidação

As melhorias preexistentes foram preservadas. Esta rodada acrescentou:

- **FAQ:** associação estável entre pergunta e resposta com `aria-controls`/`aria-labelledby`, regiões nomeadas e respostas fechadas com `hidden`; números e ícones decorativos não entram no nome do botão.
- **Modal:** `aria-describedby` vincula o diálogo à explicação de que o envio é simulado; a descrição também acompanha o estado de confirmação.
- **Toque:** alvos mínimos de 44 × 44 px no menu móvel, seleção de modelos, controles de avaliações e fechamento do modal; altura mínima de 44 px nos botões “Ver modelo”.
- **Cores forçadas:** bordas dos controles, indicação do modelo/avaliação selecionados e foco respeitam as cores de sistema (`ButtonText`, `Highlight`, `Canvas` e `CanvasText`).

Validação desta rodada na aplicação atual em **http://127.0.0.1:5175/**:

- `scan_page` antes e depois, em desktop, tablet e mobile: **0 issues e 0 incomplete** na página inicial. Não havia violações automatizadas iniciais nesta rodada; os complementos são melhorias de interação e semântica.
- Duas chamadas complementares a `verify_fix`, para `.faq-list` (4.1.2) e `.image-arrow` (mobile): ambas com `verified: true`. Os elementos continuam presentes e são exercitados pelos testes funcionais.
- **146 verificações funcionais aprovadas** pelo script existente ampliado, em 1280, 768, 390 e 320 px. Incluem associação/ocultação do FAQ, descrição dos dois estados do modal, dimensões dos alvos, foco em cores forçadas e respeito a movimento reduzido, além dos fluxos anteriores.
- Build aprovado em `%LOCALAPPDATA%/Temp/opencode/stark-accessibility-update-build`, sem substituir `dist/`. Verificação de whitespace dos arquivos de código alterados sem erros.

O modal foi exercitado pelos testes de navegador; as novas varreduras de WebAbility cobrem a página inicial, não um modal aberto. A emulação de cores forçadas valida estilos, não substitui revisão visual no Windows nem testes com NVDA. Nenhum widget, dependência ou serviço pago foi adicionado.

## Documentação consultada

- [OpenCode V2 — MCP](https://opencode.ai/v2/docs/mcp-servers)
- [OpenCode V2 — configuração](https://opencode.ai/v2/docs/config)
- [WebAbility MCP](https://mcpservers.org/pt-BR/servers/snayyar00/webability-mcp)
- [Repositório WebAbility](https://github.com/snayyar00/webability-mcp)

O catálogo da conexão e a versão efetivamente instalada prevaleceram sobre exemplos de recursos mais recentes da documentação.
