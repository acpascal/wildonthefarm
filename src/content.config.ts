import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const journal = defineCollection({
  loader: glob({ pattern: '**/[^_]*.mdx', base: './src/content/journal' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      /** Italic centered lede shown right below the hero — distinct from
       * `description` (meta/listing text), matches the source site's
       * .pull-intro paragraph on every article. */
      pullIntro: z.string(),
      date: z.coerce.date(),
      kind: z.enum(['plant', 'note']),
      section: z.enum(['what-we-grow', 'farm-notes', 'travel-panama']),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      latinName: z.string().optional(),
      order: z.number().optional(),
      draft: z.boolean().default(false),
      needsPhotos: z.boolean().default(false),
      // Shared across locale versions of "the same" article so the
      // language switcher can find translations. Defaults to the
      // entry's own slug, which is automatically correct for English.
      translationKey: z.string().optional(),
    }),
});

export const collections = { journal };
