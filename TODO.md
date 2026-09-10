# TODOs

### Notes left on-page (NoteBox placeholders)

These are content gaps that were surfaced directly on the live site via the
`NoteBox` component (`variant="todo"`, a gold-bordered callout — see
`src/components/NoteBox.astro`) instead of being hidden. This file is the
single source of truth for them: once a gap is resolved with real content,
delete the corresponding `NoteBox` block (or comment, for the alt-text item)
from source (all locale variants) and remove its bullet here — don't leave
the same todo tracked in both places.

- **`src/pages/birdwatching.astro`**: some bird photos are labeled from source filenames trusted as accurate; a handful of others couldn't be confidently identified and are flagged as such on the page.
- **`src/pages/cabin-1.astro`**: missing a bedroom photo and a clearly-identified exterior shot for Cabin One.
- **`src/pages/faq.astro`**: accepted payment methods not yet decided (cash, transfer, card, deposit vs. balance on arrival).
- **`src/pages/contact.astro`, `src/pages/faq.astro`, `src/pages/reserve.astro`**: all three use the same hero image (`farm/property_overview.jpg`); needs distinct hero photos per page.
- **`src/pages/food.astro`**: placeholder copy for the "cultures and health" angle; needs real writing on why the farm grows and cooks this way.
- **`src/pages/shop.astro`** (nuts section): needs which formats are sold (raw/roasted, shell-on/shelled), bag sizes, prices, and whether orders ship beyond Panama or are pickup/on-site only.
- **`src/pages/shop.astro`** (teas section): needs prices, package sizes, and shipping vs. pickup.
- **`src/pages/shop.astro`** (preserves section): needs the rest of the preserves list, plus prices, jar/container sizes, and shipping vs. pickup.
- **`src/pages/shop.astro`** (fertilizer section): needs prices, bottle/container sizes, and shipping vs. pickup.
- **`src/pages/wildlife.astro`** (flora/fauna list): covers the Talamanca–Chiriquí highlands generally, not yet a confirmed inventory specific to the farm's own trees and orchids; needs a farm-specific pass.
- **`src/content/journal/en/darien-embera-2008.mdx`**: alt text for images in this article is auto-generated from the section's subject matter (thematic) rather than photo-specific; worth a pass to make alt text describe the actual photos. This one is a source comment, not a visible `NoteBox` — no on-page cleanup needed, just remove the comment once alt text is fixed.

### Project

Work explicitly deferred during the v3 rebuild (Astro migration from the old Next.js site) — not bugs, just scope that was pushed past the initial launch:

- **Domain/DNS cutover**: the site is live at `wildonthefarm.netlify.app` but not yet on `wildonthefarm.com`. Point the apex domain (and `www.wildonthefarm.com`, `boquetecloudforestlodge.com`, `www.boquetecloudforestlodge.com`) at this Netlify project. The redirect rules for all three old domains already exist in `netlify.toml` and are ready to go — they're just inert until DNS actually points here. Once live, retire the old v2 Netlify project (currently still serving `boquetecloudforestlodge.com` from the `preview` branch).
- **Contact form**: `/faqs-contact/` has no working contact form yet (Netlify Forms was the planned approach). Currently just static contact info.
- **Remaining top-level pages in ES**: home, farm, story, lodge, food, garden, and journal have real translations. The rest — wildlife, hiking, birdwatching, shop, rates-retreats, faqs-contact, and cabin-1/2/3 — are English-only. Add each as its own entry in `src/data/pageTranslations.ts` once translated; the nav, language switcher, and hreflang tags all pick it up automatically from that one file.
- **Remaining journal articles in ES**: 9 of 15 English articles have no translation yet — the 7 farm/travel notes (`boquete-travel-guide`, `darien-embera-2008`, `french-visionary-of-boquete`, `garden-kimchi`, `hiking-in-boquete`, `panama-safety-guide`, `san-blas-guna-yala`) plus `thyme` and `verbena`. Add a new `.mdx` file in `src/content/journal/es/` with a matching `translationKey` pointing back to the English slug — same pattern as the 6 articles already translated.
