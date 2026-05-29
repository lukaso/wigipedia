import { readdirSync, statSync, readFileSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = fileURLToPath(new URL('..', import.meta.url));
export const DIST = join(ROOT, 'dist');
export const ARTICLES_DIR = join(ROOT, 'src/content/articles');

export function walk(dir, filter = () => true) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...walk(full, filter));
    else if (filter(full)) out.push(full);
  }
  return out;
}

export const htmlFiles = () => walk(DIST, (f) => f.endsWith('.html'));
export const articleSlugs = () =>
  readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));

export const read = (f) => readFileSync(f, 'utf8');

// Extract href="..." values from an HTML string.
export function hrefs(html) {
  return [...html.matchAll(/href="([^"]*)"/g)].map((m) => m[1]);
}
export function imgSrcs(html) {
  return [...html.matchAll(/<img[^>]*\ssrc="([^"]*)"/g)].map((m) => m[1]);
}

// Resolve a site-absolute path ("/wiki/x") to a file in dist, trying the common
// static-site shapes. Returns the resolved path or null.
export function resolveInDist(p) {
  const clean = p.split('#')[0].split('?')[0];
  if (clean === '' ) return DIST;
  const candidates = [
    join(DIST, clean),
    join(DIST, clean, 'index.html'),
    join(DIST, clean + '.html'),
    join(DIST, clean.replace(/\/$/, ''), 'index.html'),
  ];
  return candidates.find((c) => existsSync(c) && statSync(c).isFile()) ?? null;
}

export { existsSync, join, relative };
