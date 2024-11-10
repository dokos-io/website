![nuxt-ui-saas-social-card](https://github.com/nuxt-ui-pro/saas/assets/739984/50bf4ddd-c4d5-47e5-a09e-0f699513dfb5)

# Nuxt UI Pro - SaaS template

[![Nuxt UI Pro](https://img.shields.io/badge/Made%20with-Nuxt%20UI%20Pro-00DC82?logo=nuxt.js&labelColor=020420)](https://ui.nuxt.com/pro)

- [Live demo](https://saas-template.nuxt.dev/)
- [Play on Stackblitz](https://stackblitz.com/github/nuxt-ui-pro/saas)
- [Documentation](https://ui.nuxt.com/pro/getting-started)

## Quick Start

```bash [Terminal]
npx nuxi init -t github:nuxt-ui-pro/saas
```

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Nuxt Studio integration

Add `@nuxthq/studio` dependency to your package.json:

```bash
# npm
npm install --save-dev @nuxthq/studio

# pnpm
pnpm add -D @nuxthq/studio

# yarn
yarn add -D @nuxthq/studio

# bun
bun add -d @nuxthq/studio
```

Add this module to your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  ...
  modules: [
    ...
    '@nuxthq/studio'
  ]
})
```

Read more on [Nuxt Studio docs](https://nuxt.studio/docs/projects/setup).

## Renovate integration

Install [Renovate GitHub app](https://github.com/apps/renovate/installations/select_target) on your repository and you are good to go.


## Style

Toutes les classes Tailwing CSS peuvent être utilisée.
Par exemple pour mettre le texte en gras: https://tailwindcss.com/docs/font-weight


## Syntaxe MDC

**Exemples**

1. Callout centré
::div
  ::callout
  ---
  color: "amber"
  icon: "i-heroicons-light-bulb"
  to: "https://nuxt.com"
  target: "_blank"
  class: max-w-52 mx-auto
  ---
  Hello world
  ::
::


2. Tabs avec et sans HTML
::tabs
  ::div{label=Code icon=i-heroicons-code-bracket-square}
  <span class="text-primary">Hello</span>
  ::

  ::div
  ---
  label: Preview
  icon: i-heroicons-magnifying-glass-circle
  ---
  > World
  ::
::


3. Bouton centré
::div{class="text-center"}
  <UButton color="primary" variant="solid">Button</UButton>
::


## Icônes

Liste des familles installées:
['heroicons', 'simple-icons', 'ic', 'mdi', 'icon-park-outline', 'octicon', 'carbon', 'ep', 'uil', 'eos-icons', 'vaadin', 'fluent', 'ri', 'material-symbols', 'gg', 'ic', 'circle-flags', 'iconoir', 'logos', 'cib', 'ph', 'map', 'hugeicons', 'oui', 'solar', 'tdesign']