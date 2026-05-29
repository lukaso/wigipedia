// Turn a human category label into a URL-safe slug, and a small helper to
// gather every category across the article collection.
import type { CollectionEntry } from 'astro:content';

export const slugifyCategory = (name: string): string =>
  name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // strip accents: toupées -> toupees
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export interface CategoryGroup {
  name: string;
  slug: string;
  articles: CollectionEntry<'articles'>[];
}

export function groupByCategory(
  articles: CollectionEntry<'articles'>[],
): CategoryGroup[] {
  const map = new Map<string, CategoryGroup>();
  for (const article of articles) {
    for (const name of article.data.categories) {
      const slug = slugifyCategory(name);
      if (!map.has(slug)) map.set(slug, { name, slug, articles: [] });
      map.get(slug)!.articles.push(article);
    }
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
}
