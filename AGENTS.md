## Consistency

This site is not generated from a template — every page is hand-written .astro
markup that composes shared components (`PageLayout`, `Section`, `PageHero`,
etc.). Nothing enforces uniformity automatically except what's built into
those shared components and global.css. That means consistency across pages
is a standing responsibility for every change, not a one-time cleanup:

- Never add a per-page spacing/style override (a new prop, inline style, or
  one-off CSS rule) to solve a problem that's really about the shared
  component or stylesheet. Fix it there so every page gets the fix.
- Section top/bottom padding is fully automatic (see `Section.astro` and the
  hero/pull-intro rules in `global.css`) — there is no padding prop. If
  spacing looks wrong on some page, the shared rule is wrong; don't patch
  around it locally.
- Before copying a pattern from one page to write another, check whether
  other pages already do the same thing differently. If they do, that's
  drift to resolve (pick one, apply it everywhere), not a precedent to
  extend.

## Typography

Fonts are loaded via Astro's `fonts` config in `astro.config.mjs`. Both
`--font-display` (Fraunces) and `--font-body` (Jost) load the full
`[300, 400, 500, 600, 700]` weight range, so any `font-weight` value in that
set — including the browser's default `bold` (700) on `<strong>`/`<b>`/
markdown `**bold**` — renders as a real downloaded cut.

- Only use a `font-weight` value from `[300, 400, 500, 600, 700]`. Anything
  outside that range (e.g. `800`/`900`) makes the browser synthesize
  ("faux-bold") the text — thick and blurry instead of actually bold — so if
  a design needs a weight outside the loaded set, add it to `weights` in
  `astro.config.mjs` first, then use it in CSS.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
