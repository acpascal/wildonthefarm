# Wild on the Farm

Astro site for Wild on the Farm, Boquete Cloud Forest Lodge. Static output, deployed to Netlify from `main`.

Currently live at `wildonthefarm.netlify.app` — the real domain (`wildonthefarm.com`) hasn't been cut over yet; see [TODO.md](TODO.md).

## Stack & routing

Astro v7 with content collections (MDX, schema in `src/content.config.ts`) for the journal, and built-in i18n routing: `en` (default, unprefixed) and `es` (prefixed). Which pages have real ES translations is tracked in one place, `src/data/pageTranslations.ts` — the nav, language switcher, and hreflang tags all read from it automatically.

## Project structure

- `src/pages/` — top-level routes (`.astro` files); `src/pages/es/` holds the translated route tree
- `src/content/journal/` — MDX journal articles per locale (`en/`, `es/`)
- `src/content.config.ts` — journal content collection schema
- `src/data/` — site data: nav (`nav.ts`), business info (`business.ts`), translation map (`pageTranslations.ts`)
- `src/i18n/` — locale strings (`ui.ts`) and routing helpers (`utils.ts`)
- `src/layouts/`, `src/components/` — shared layout and UI
- `src/lib/` — content/SEO helpers (journal queries, image handling, meta tags)
- `netlify.toml` — build config plus the full legacy-URL redirect map from the old Next.js site (v2)

## Setup

Requires Node `>=22.12.0` (see `engines` in `package.json`).

## Commands

| Command           | Action                                       |
| :----------------- | :-------------------------------------------- |
| `npm install`       | Install dependencies                          |
| `npm run dev`       | Start local dev server at `localhost:4321`    |
| `npm run build`     | Build production site to `./dist/`            |
| `npm run preview`   | Preview the build locally before deploying    |
