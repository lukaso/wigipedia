import { test } from 'node:test';
import assert from 'node:assert/strict';
import { join } from 'node:path';
import {
  DIST, existsSync, articleSlugs, htmlFiles, read, imgSrcs,
} from './helpers.mjs';

test('home page is built', () => {
  assert.ok(existsSync(join(DIST, 'index.html')), 'dist/index.html should exist');
});

test('every article has a built page', () => {
  for (const slug of articleSlugs()) {
    const page = join(DIST, 'wiki', slug, 'index.html');
    assert.ok(existsSync(page), `missing built page for /wiki/${slug}`);
  }
});

test('we have at least 10 articles', () => {
  assert.ok(articleSlugs().length >= 10, `expected >= 10 articles, got ${articleSlugs().length}`);
});

test('each article infobox image file exists', () => {
  for (const slug of articleSlugs()) {
    const html = read(join(DIST, 'wiki', slug, 'index.html'));
    const imgs = imgSrcs(html).filter((s) => s.startsWith('/images/'));
    for (const src of imgs) {
      assert.ok(existsSync(join(DIST, src)), `image ${src} referenced by ${slug} is missing`);
    }
  }
});

test('supporting pages are built (about, categories, random, search)', () => {
  for (const p of ['about', 'categories', 'random', 'search']) {
    assert.ok(existsSync(join(DIST, p, 'index.html')), `missing /${p}`);
  }
});

test('pagefind search index was generated', () => {
  assert.ok(existsSync(join(DIST, 'pagefind', 'pagefind.js')), 'pagefind index missing — did the pagefind step run?');
});

test('built HTML files exist', () => {
  assert.ok(htmlFiles().length >= 12, 'expected a dozen+ HTML pages');
});
