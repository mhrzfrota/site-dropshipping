# Revisao do sistema (site-dropshipping)

## Escopo e objetivo
Esta revisao descreve o estado atual do front-end e os principais riscos visiveis no codigo e na estrutura do projeto.

## Visao geral
- SPA estatica com foco em vitrine/landing page de moda praia (Mar&Mov).
- Stack: Vite + React 19 + TypeScript + Tailwind CSS.
- Estrutura de pagina unica: TopBar fixa, Hero, destaques de categorias, vitrine de lancamentos.
- Sem integracao com backend, sem rotas e sem estado global.
- Dados e textos estao hardcoded nos componentes.

## Fluxo de execucao
- `index.html` carrega `src/main.tsx`.
- `src/main.tsx` monta `App` em `#root`.
- `src/App.tsx` compoe `TopBar`, `HeroSection`, `HighlightsSection`, `NewArrivalsSection`.

## Estrutura de pastas
- `src/` componentes e estilos.
- `public/` imagens e assets estaticos.
- `dist/` build gerado (pode estar desatualizado).
- `node_modules/` dependencias locais.

## Componentes principais
- **TopBar**: cabecalho fixo com menu principal, dropdown por click e menu mobile; links e textos hardcoded.
- **HeroSection**: banner com imagem local e fallback remoto, CTA para colecao.
- **HighlightsSection**: cards de categorias com imagens em `public/images`.
- **NewArrivalsSection**: carrossel horizontal com drag no desktop e botoes laterais; cards hardcoded.

## Componentes nao utilizados
- `src/components/Navbar.tsx` nao esta importado em `src/App.tsx`.
- `src/components/ProductCard.tsx` nao esta importado em `src/App.tsx`.

## Assets e midia
- Presentes: `public/images/home-hero.png`, `public/images/logo.svg`, `public/images/cat-*.jpg`.
- Faltando: `public/images/cat-maios.jpg` (referenciado em `src/components/HighlightsSection.tsx`).
- Faltando: `public/images/launch-1.jpg` a `public/images/launch-5.jpg` (referenciados em `src/components/NewArrivalsSection.tsx`).
- O Hero tem fallback externo via Unsplash, mas as demais imagens quebram se nao existirem.

## Configuracoes e tooling
- `package.json` com scripts `dev`, `build`, `preview`.
- `tsconfig.json` com `strict` e `noEmit`.
- `tailwind.config.js` define cores e fontes customizadas; as fontes (ex: Inter) nao sao carregadas via CSS ou HTML.
- `postcss.config.js` habilita Tailwind e Autoprefixer.

## Problemas e inconsistencias observaveis
- **Encoding**: textos exibem caracteres corrompidos em varios componentes (menu, hero, lancamentos, navbar).
- **Links placeholder**: varios `href="#"` e links apontando para secoes inexistentes (`#biquinis`, `#maios`, `#roupas`, `#acessorios`).
- **Idioma do HTML**: `index.html` usa `lang="en"` enquanto o conteudo e PT-BR.
- **Acessibilidade**: botoes de menu e dropdown nao expõem `aria-expanded`/`aria-controls`.
- **SEO**: titulo generico e falta de meta description/OG tags.
- **Qualidade**: nao ha configuracao de testes ou linting.

## Estado atual do produto
- Pagina unica de apresentacao com conteudo estatico.
- Sem integracao com carrinho, busca, autenticacao ou backend.
- Layout visual definido, mas dependente de assets faltantes e textos com encoding quebrado.
- Dados de produto sem origem dinamica (arrays locais).

## Recomendacoes iniciais (se o objetivo for evoluir)
1. Corrigir encoding dos textos e revisar o copy.
2. Incluir/ajustar assets faltantes e validar caminhos de imagens.
3. Revisar links e ids de secoes para navegacao consistente.
4. Ajustar `lang` para `pt-BR` e incluir meta tags basicas.
5. Definir estrategia de dados (API/mock) para produtos e carrinho.
6. Adicionar lint/teste basico conforme necessidade.
