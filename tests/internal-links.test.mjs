import { test } from 'node:test';
import assert from 'node:assert/strict';
import { htmlFiles, read, hrefs, resolveInDist, DIST, relative } from './helpers.mjs';

// Every internal link in the built site must resolve to a real file. This is the
// single most valuable check for a wiki: it catches broken [[cross-links]],
// renamed slugs, and bad category URLs before they ship.
test('no broken internal links', () => {
  const broken = [];
  for (const file of htmlFiles()) {
    const html = read(file);
    for (const href of hrefs(html)) {
      // skip external, anchors, mailto, and intentional placeholder red links
      if (/^(https?:|mailto:|tel:|#)/.test(href)) continue;
      if (!href.startsWith('/')) continue; // relative assets handled by Astro
      if (resolveInDist(href) === null) {
        broken.push(`${relative(DIST, file)} -> ${href}`);
      }
    }
  }
  assert.equal(broken.length, 0, `broken internal links:\n${broken.join('\n')}`);
});

test('category links from articles resolve', () => {
  const catLinks = new Set();
  for (const file of htmlFiles()) {
    for (const href of hrefs(read(file))) {
      if (href.startsWith('/category/')) catLinks.add(href);
    }
  }
  assert.ok(catLinks.size > 0, 'expected at least one category link');
  for (const href of catLinks) {
    assert.ok(resolveInDist(href), `category link ${href} does not resolve`);
  }
});
