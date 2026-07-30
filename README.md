# Wild on the Farm

Astro site for Wild on the Farm, Boquete Cloud Forest Lodge. Static output, deployed to Netlify from `main`.

Currently live at `wildonthefarm.netlify.app` — the real domain (`wildonthefarm.com`) hasn't been cut over yet; see TODOs below.

## Stack & routing

Astro v7 with content collections (MDX, schema in `src/content.config.ts`) for the journal, and built-in i18n routing: `en` (default, unprefixed), `es` and `fr` (prefixed). Which pages have real ES/FR translations is tracked in one place, `src/data/pageTranslations.ts` — the nav, language switcher, and hreflang tags all read from it automatically.

## Project structure

- `src/pages/` — top-level routes (`.astro` files); `src/pages/es/` and `src/pages/fr/` hold translated route trees
- `src/content/journal/` — MDX journal articles per locale (`en/`, `es/`, `fr/`)
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

## TODOs

### Content

- **`src/content/journal/en/allergies-and-asthma.mdx`** (and its ES/FR translations): this article encourages guests to try consuming an unidentified wild plant on-site as a home remedy for allergies/asthma. Migrated as-is per an explicit decision during the v3 rebuild, but it carries real liability exposure beyond the standard plant-profile medical disclaimer (an unstudied, unidentified plant rather than a documented traditional-use herb). Worth a legal/content review before this gets meaningful traffic.

### Project

Work explicitly deferred during the v3 rebuild (Astro migration from the old Next.js site) — not bugs, just scope that was pushed past the initial launch:

- **Domain/DNS cutover**: the site is live at `wildonthefarm.netlify.app` but not yet on `wildonthefarm.com`. Point the apex domain (and `www.wildonthefarm.com`, `boquetecloudforestlodge.com`, `www.boquetecloudforestlodge.com`) at this Netlify project. The redirect rules for all three old domains already exist in `netlify.toml` and are ready to go — they're just inert until DNS actually points here. Once live, retire the old v2 Netlify project (currently still serving `boquetecloudforestlodge.com` from the `preview` branch).
- **Contact form**: `/faqs-contact/` has no working contact form yet (Netlify Forms was the planned approach). Currently just static contact info.
- **Remaining top-level pages in ES/FR**: only `/stay/` has real translations (`/es/estancia/`, `/fr/sejour/`) as a proof of the i18n routing. The rest — the-farm, kitchen, garden, wildlife, hiking, birdwatching, shop, rates-retreats, faqs-contact, cabin-1/2/3, and the homepage — are English-only. Add each as its own entry in `src/data/pageTranslations.ts` once translated; the nav, language switcher, and hreflang tags all pick it up automatically from that one file.
- **Remaining journal articles in ES/FR**: 9 of 15 English articles have no translation yet — the 7 farm/travel notes (`boquete-travel-guide`, `darien-embera-2008`, `french-visionary-of-boquete`, `garden-kimchi`, `hiking-in-boquete`, `panama-safety-guide`, `san-blas-guna-yala`) plus `thyme` and `verbena`. Add a new `.mdx` file in `src/content/journal/es/` or `src/content/journal/fr/` with a matching `translationKey` pointing back to the English slug — same pattern as the 6 articles already translated.
