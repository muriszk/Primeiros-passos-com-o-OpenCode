# Armaduras do Homem de Ferro — STARK INDUSTRIES #

Landing page responsiva construída com React + Vite, com textos em português, navegação por âncoras, cards de modelos, avaliações demonstrativas, FAQ expansível e formulário modal simulado.

# Integrantes #

Larissa Rocha Dias

Murilo Marinho Suzuki

# Sobre o produto #

Nosso projeto é uma landing page da STARK INDUSTRIES, uma empresa fictícia inspirada na tecnologia do Homem de Ferro. A ideia é apresentar armaduras avançadas que oferecem recursos como proteção, superforça e inteligência artificial.
Pensamos em diferentes modelos para atender desde pessoas que gostam de tecnologia e produtos sofisticados até super-heróis que precisam desses recursos durante suas missões.
O site apresenta os benefícios das armaduras, seus modelos, como a tecnologia funciona, depoimentos fictícios, uma oferta e uma seção de perguntas frequentes. Organizamos as informações para que o visitante consiga conhecer o produto e entender sua proposta enquanto navega pela página.

# Jornada de construção #
# Ideia inicial #

Durante a construção da ideia, consideramos fazer a lading page de um produto fictício, mas que fosse útil e tecnológico. Nós queríamos um tipo de inovação que saísse do obvio e trouxesse poder a quem fosse utilizar.
A princípio, separamos ideias como: óculos tecnológicos, automóveis futuristas e robôs com funcionalidades úteis para auxiliar em atividades de força e inteligência. Porém, fomos além e unificamos essa ideia na armadura do homem de ferro, que faz tudo isso e muito mais. 
A principal escolha do produto, foi por ser muito completo. A armadura conta com suporte inteligente, proteção contra danos, super força e tecnologia avançada.
Ao final da escolha do produto desenvolvemos uma landing page, reunindo as informações necessárias para conhecer o produto e interagir com a oferta. Assim, o usuário percorre a proposta, os benefícios, os modelos, a explicação de funcionamento, os depoimentos, a oferta e as dúvidas frequentes.

# Pesquisa e referências #

Para desenvolver o projeto, pesquisamos referências de empresas de tecnologia e de sites que apresentam produtos de forma moderna. Utilizamos os sites da Apple e da Samsung como inspiração para a apresentação dos produtos e para a organização visual das páginas. Também buscamos referências na Marvel, principalmente por causa do universo do Homem de Ferro e do estilo tecnológico das armaduras.
Pesquisamos ideias de interfaces futuristas, cores e tipografias que combinassem com a proposta do produto. Queríamos que o site tivesse uma aparência tecnológica, mas sem ficar visualmente carregado ou difícil de navegar.
Essas referências nos ajudaram a definir o estilo da página e a pensar em como apresentar as informações de maneira organizada.

# Ferramentas utilizadas

Durante o desenvolvimento, utilizamos ferramentas para criar a interface, organizar o código e testar o resultado.

React: utilizamos para construir a interface do site por meio de componentes.

Vite: utilizado para iniciar o projeto e executar o ambiente de desenvolvimento.

JavaScript (JSX): utilizado na construção dos componentes e na implementação da interface.

CSS: utilizado para definir as cores, fontes, espaçamentos, organização dos elementos e adaptação do layout.

Visual Studio Code: utilizado para editar os arquivos e organizar o código do projeto.

# Uso de IA

Durante o projeto, testamos diferentes ferramentas de inteligência artificial para ajudar na criação da landing page. Nós queríamos comparar os resultados e descobrir qual delas conseguiria seguir melhor a ideia que tínhamos para o site.

ChatGPT: Foi a ferramenta que apresentou o resultado mais próximo do que estávamos procurando. Ela conseguiu seguir melhor as instruções do prompt e gerar uma página de acordo com a proposta do produto. Por isso, utilizamos esse resultado como base para o projeto, fazendo ajustes onde achamos necessário.

Claude: O Claude gerou uma página bastante completa, mas acrescentou funcionalidades que não havíamos solicitado. O resultado ficou mais complexo do que precisávamos para a atividade, então optamos por não seguir essa versão.

Gemini: O Gemini também foi testado, mas o visual gerado ficou mais infantil do que imaginávamos para uma empresa de tecnologia avançada. Como queríamos uma aparência mais futurista e sofisticada, decidimos não utilizar esse resultado.

OpenCode: Utilizamos o OpenCode para explorar ideias durante o desenvolvimento. Porém, algumas imagens geradas não combinavam com o tema e com a identidade visual que queríamos para o projeto.

Por fim, escolhemos manter a versão gerada pelo ChatGPT como base e fizemos alterações principalmente nas imagens e na aparência do site. Os testes mostraram que nem sempre a primeira resposta de uma IA atende ao que precisamos. Foi necessário comparar as opções e decidir quais resultados realmente combinavam com a nossa proposta.

# Evolução da solução

Durante o desenvolvimento, fizemos algumas mudanças para deixar o site mais próximo da ideia inicial.
No começo, a página tinha uma paleta de cores mais concentrada no preto e no cinza. Depois, acrescentamos detalhes em vermelho para combinar melhor com a identidade visual que imaginávamos para a STARK INDUSTRIES.
Também precisamos trocar as imagens utilizadas no projeto. Tivemos dificuldades para conseguir imagens do personagem diretamente pelas ferramentas de IA, por causa das limitações relacionadas à geração de imagens de personagens protegidos por direitos autorais. Por isso, tivemos que buscar alternativas que combinassem com a proposta da página.
Outra mudança foi retirar a ideia de um chat direto com o Homem de Ferro, que havia sido sugerida pela IA. Apesar de ser uma ideia interessante, ela não era necessária para o objetivo principal do projeto e exigiria funcionalidades que não pretendíamos desenvolver nesta atividade.
Em vez de manter todas as sugestões geradas automaticamente, escolhemos aquelas que faziam sentido e descartamos as que fugiam da proposta.

# Resultado final

Gostamos do resultado final, principalmente da aparência do site e da forma como as informações foram organizadas. Conseguimos apresentar a ideia das armaduras e criar uma página com um visual tecnológico, mantendo a proposta que escolhemos no início.
Também achamos que a navegação ficou boa, pois o visitante consegue passar pelas seções e conhecer melhor o produto.
Se tivéssemos mais tempo, gostaríamos de adicionar outras imagens para deixar a apresentação das armaduras mais interessante. Também implementaríamos uma tela de cadastro e login e exploraríamos novas funcionalidades para tornar o site mais interativo.
No geral, ficamos satisfeitos com o resultado e com o processo de desenvolvimento, principalmente por termos testado diferentes ferramentas de IA e precisado escolher quais sugestões realmente funcionavam para o nosso projeto.

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
- Acessibilidade: atalho para conteúdo, navegação por teclado, foco gerenciado no modal, FAQ associado às respostas, alvos de toque ampliados e suporte às preferências de movimento reduzido e cores forçadas.
- Nenhum pagamento ou envio de dados real é realizado.

## Observação

O produto, os preços e as avaliações são fictícios e fazem parte de um protótipo acadêmico.

## Auditoria de acessibilidade

O projeto utiliza o MCP WebAbility local no OpenCode, sem chave de API para auditorias básicas. Consulte [configuração, resultados e validação](docs/acessibilidade-webability.md) para executar o projeto, repetir as auditorias e testar os fluxos acessíveis.
