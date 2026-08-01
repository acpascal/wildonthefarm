// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://wildonthefarm.com',
  trailingSlash: 'always',
  build: { format: 'directory' },

  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },

  image: { layout: 'constrained', responsiveStyles: true, objectFit: 'cover' },

  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Fraunces',
      cssVariable: '--font-display',
      weights: [300, 400, 500, 600, 700],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['Georgia', 'serif'],
      // Fraunces' opsz axis reshapes the letterforms by rendered size — the
      // compact text cut at small sizes, the more dramatic display cut at
      // large ones. Without requesting it, Google Fonts freezes opsz at its
      // default (compact) value, so headings render with text-cut glyphs
      // scaled up instead of the intended display cut. 9..144 matches the
      // draft's own request (`opsz,wght@9..144,...`).
      options: {
        experimental: {
          variableAxis: { opsz: [[9, 144]] },
        },
      },
    },
    {
      provider: fontProviders.google(),
      name: 'Jost',
      cssVariable: '--font-body',
      weights: [300, 400, 500, 600, 700],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['Helvetica Neue', 'sans-serif'],
    },
  ],

  integrations: [
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', es: 'es' },
      },
    }),
  ],
});
