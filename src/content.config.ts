import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// One row in the right-hand infobox card (label + value).
const infoboxRow = z.object({
  label: z.string(),
  value: z.string(),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    // Short lead sentence shown under the title and on the home page.
    summary: z.string(),
    categories: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    stub: z.boolean().default(false),
    // Infobox: the boxed fact card on the top-right of a real wiki article.
    infobox: z
      .object({
        caption: z.string().optional(),
        image: z.string().optional(), // path under /public, e.g. /images/comb-over.png
        imageAlt: z.string().optional(),
        rows: z.array(infoboxRow).default([]),
      })
      .optional(),
  }),
});

export const collections = { articles };
