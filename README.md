<<<<<<< HEAD
# Stark Industries — experiência conceitual

Landing page responsiva construída com React + Vite, com textos em português, navegação por âncoras, cards de modelos, avaliações demonstrativas, FAQ expansível e formulário modal simulado.

## Arquitetura MVVM

O projeto é organizado em três camadas bem definidas (Model → ViewModel → View):

```
src/
├── main.jsx                 # bootstrap da aplicação
├── styles.css
├── models/                  # MODEL — dados e domínio (sem dependência de UI)
│   ├── armors.js            # catálogo de modelos
│   └── content.js           # diferenciais, avaliações e FAQ
├── viewmodels/              # VIEWMODEL — estado e lógica (hooks)
│   ├── useAppViewModel.js   # ViewModel raiz (compõe os demais)
│   ├── useMenuViewModel.js  # estado do menu responsivo
│   ├── useModelsViewModel.js# seleção de modelo ativo
│   ├── useReviewsViewModel.js
│   ├── useFaqViewModel.js
│   └── useRequestModalViewModel.js # modal + formulário
└── views/                   # VIEW — componentes de apresentação
    ├── App.jsx              # composição (liga ViewModels às Views)
    ├── Header.jsx / Hero.jsx / Intro.jsx / Benefits.jsx
    ├── Models.jsx / Process.jsx / QuoteBand.jsx / Reviews.jsx
    ├── Offer.jsx / Faq.jsx / FinalCta.jsx / Footer.jsx
    └── RequestModal.jsx
```

### Responsabilidades

- **Model**: representa os dados puros da aplicação (modelos, conteúdo estático). Não conhece React nem estado de interface.
- **ViewModel**: concentra o estado e o comportamento (seleção de modelo, carrossel, FAQ, menu, modal/formulário). A View consome estado e invoca ações, sem conter regras de negócio.
- **View**: componentes presentes apenas no JSX, recebendo estado e callbacks via props e refletindo o ViewModel.

O fluxo é: `View` → dispara ação → `ViewModel` atualiza estado → `View` re-renderiza com o novo estado.

## Executar localmente

1. Instale o Node.js (versão LTS).
2. Extraia o ZIP e abra a pasta `stark-armor-react` no VS Code.
3. No terminal, execute:

```bash
npm install
npm run dev
```

4. Abra o endereço local exibido pelo Vite.

## Build de produção

```bash
npm run build
npm run preview
```

## Imagens

As imagens são carregadas de URLs do Unsplash e precisam de conexão com a internet. São imagens ilustrativas de tecnologia/ficção científica, não fotografias oficiais das armaduras. Para entrega final, você pode trocar os endereços `image` em `src/main.jsx` e a imagem de fundo em `src/styles.css` por assets próprios.

## Funcionalidades

- Menu responsivo para celular.
- Navegação para as seções da página.
- Seleção de modelo atualiza a oferta e o formulário.
- Carrossel simples de avaliações por controles anterior/próxima.
- FAQ expansível.
- Modal de solicitação com validação básica e confirmação simulada.
- Nenhum pagamento ou envio de dados real é realizado.

## Observação

O produto, os preços e as avaliações são fictícios e fazem parte de um protótipo acadêmico.
=======
# Primeiros-passos-com-o-OpenCode
>>>>>>> 5b981e78c59148b3d49e1d942ff4d9edf7a80f79
