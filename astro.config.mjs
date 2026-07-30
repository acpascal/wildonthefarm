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
    locales: ['en', 'es', 'fr'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },

  image: { layout: 'constrained', responsiveStyles: true, objectFit: 'cover' },

  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Fraunces',
      cssVariable: '--font-display',
      weights: [400, 500, 600],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['Georgia', 'serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Jost',
      cssVariable: '--font-body',
      weights: [300, 400, 500],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['Helvetica Neue', 'sans-serif'],
    },
  ],

  integrations: [
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', es: 'es', fr: 'fr' },
      },
    }),
  ],
});
