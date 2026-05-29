import { test } from 'node:test';
import assert from 'node:assert/strict';
import { htmlFiles, read, anchors, resolveInDist, DIST, relative } from './helpers.mjs';

// Every internal link must either resolve to a real file OR be a red link
// (class="redlink") that deliberately points at a not-yet-written article.
// This catches broken cross-links, renamed slugs, and bad category URLs, while
// allowing the intentional red links that drive the "create this article" flow.
test('no broken internal links (red links excepted)', () => {
  const broken = [];
  for (const file of htmlFiles()) {
    for (const { href, isRedlink } of anchors(read(file))) {
      if (isRedlink) continue;
      if (/^(https?:|mailto:|tel:|#)/.test(href)) continue;
      if (!href.startsWith('/')) continue;
      if (resolveInDist(href) === null) broken.push(`${relative(DIST, file)} -> ${href}`);
    }
  }
  assert.equal(broken.length, 0, `broken internal links:\n${broken.join('\n')}`);
});

// Red links should exist (they're a feature) and should all live under /wiki/.
test('red links are well-formed and point under /wiki/', () => {
  let redCount = 0;
  const bad = [];
  for (const file of htmlFiles()) {
    for (const { href, isRedlink } of anchors(read(file))) {
      if (!isRedlink) continue;
      redCount++;
      if (!/^\/wiki\/[^/#?]+\/?$/.test(href)) bad.push(`${relative(DIST, file)} -> ${href}`);
    }
  }
  assert.ok(redCount > 0, 'expected at least one red link');
  assert.equal(bad.length, 0, `malformed red links:\n${bad.join('\n')}`);
});

test('category links from articles resolve', () => {
  const catLinks = new Set();
  for (const file of htmlFiles()) {
    for (const { href } of anchors(read(file))) {
      if (href.startsWith('/category/')) catLinks.add(href);
    }
  }
  assert.ok(catLinks.size > 0, 'expected at least one category link');
  for (const href of catLinks) {
    assert.ok(resolveInDist(href), `category link ${href} does not resolve`);
  }
});
