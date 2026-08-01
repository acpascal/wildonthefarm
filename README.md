# Wild on the Farm

Astro site for Wild on the Farm, Boquete Cloud Forest Lodge. Static output, deployed to Netlify from `main`.

Currently live at `wildonthefarm.netlify.app` — the real domain (`wildonthefarm.com`) hasn't been cut over yet; see TODOs below.

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

## TODOs

### Content

- **`src/content/journal/en/allergies-and-asthma.mdx`** (and its ES translation): this article encourages guests to try consuming an unidentified wild plant on-site as a home remedy for allergies/asthma. Migrated as-is per an explicit decision during the v3 rebuild, but it carries real liability exposure beyond the standard plant-profile medical disclaimer (an unstudied, unidentified plant rather than a documented traditional-use herb). Worth a legal/content review before this gets meaningful traffic.

### Notes left on-page (NoteBox placeholders)

These are content gaps that were surfaced directly on the live site via the
`NoteBox` component (`variant="todo"`, a gold-bordered callout — see
`src/components/NoteBox.astro`) instead of being hidden. Once each is
resolved with real content, delete the corresponding `NoteBox` block (or
comment, for the alt-text item) from source and remove its bullet here.

- **`src/pages/birdwatching.astro`**: some bird photos are labeled from source filenames trusted as accurate; a handful of others couldn't be confidently identified and are flagged as such on the page.
- **`src/pages/cabin-1.astro`**: missing a bedroom photo and a clearly-identified exterior shot for Cabin One.
- **`src/pages/cabin-3.astro`**: missing an exterior or balcony shot specific to Cabin Three.
- **`src/pages/faqs-contact.astro`**: accepted payment methods not yet decided (cash, transfer, card, deposit vs. balance on arrival).
- **`src/pages/hiking.astro`**: needs practical trail details — names of the main trails, approximate distances/duration, difficulty level, and whether a guide is required or optional.
- **`src/pages/food.astro`**: placeholder copy for the "cultures and health" angle; needs real writing on why the farm grows and cooks this way.
- **`src/pages/shop.astro`** (nuts section): needs which formats are sold (raw/roasted, shell-on/shelled), bag sizes, prices, and whether orders ship beyond Panama or are pickup/on-site only.
- **`src/pages/shop.astro`** (teas section): needs prices, package sizes, and shipping vs. pickup.
- **`src/pages/shop.astro`** (preserves section): needs the rest of the preserves list, plus prices, jar/container sizes, and shipping vs. pickup.
- **`src/pages/shop.astro`** (fertilizer section): needs prices, bottle/container sizes, and shipping vs. pickup.
- **`src/pages/wildlife.astro`** (flora/fauna list): covers the Talamanca–Chiriquí highlands generally, not yet a confirmed inventory specific to the farm's own trees and orchids; needs a farm-specific pass.
- **`src/pages/wildlife.astro`** (jaguar quote): the "A Rare Encounter" quote is explicitly captioned "draft account — real details to come" — needs Pascal's actual account of the jaguar-and-cubs sighting before the placeholder caption can come off.
- **`src/content/journal/en/darien-embera-2008.mdx`**: alt text for images in this article is auto-generated from the section's subject matter (thematic) rather than photo-specific; worth a pass to make alt text describe the actual photos. This one is a source comment, not a visible `NoteBox` — no on-page cleanup needed, just remove the comment once alt text is fixed.

### Project

Work explicitly deferred during the v3 rebuild (Astro migration from the old Next.js site) — not bugs, just scope that was pushed past the initial launch:

- **Domain/DNS cutover**: the site is live at `wildonthefarm.netlify.app` but not yet on `wildonthefarm.com`. Point the apex domain (and `www.wildonthefarm.com`, `boquetecloudforestlodge.com`, `www.boquetecloudforestlodge.com`) at this Netlify project. The redirect rules for all three old domains already exist in `netlify.toml` and are ready to go — they're just inert until DNS actually points here. Once live, retire the old v2 Netlify project (currently still serving `boquetecloudforestlodge.com` from the `preview` branch).
- **Contact form**: `/faqs-contact/` has no working contact form yet (Netlify Forms was the planned approach). Currently just static contact info.
- **Remaining top-level pages in ES**: home, farm, story, lodge, food, garden, and journal have real translations. The rest — wildlife, hiking, birdwatching, shop, rates-retreats, faqs-contact, and cabin-1/2/3 — are English-only. Add each as its own entry in `src/data/pageTranslations.ts` once translated; the nav, language switcher, and hreflang tags all pick it up automatically from that one file.
- **Remaining journal articles in ES**: 9 of 15 English articles have no translation yet — the 7 farm/travel notes (`boquete-travel-guide`, `darien-embera-2008`, `french-visionary-of-boquete`, `garden-kimchi`, `hiking-in-boquete`, `panama-safety-guide`, `san-blas-guna-yala`) plus `thyme` and `verbena`. Add a new `.mdx` file in `src/content/journal/es/` with a matching `translationKey` pointing back to the English slug — same pattern as the 6 articles already translated.
