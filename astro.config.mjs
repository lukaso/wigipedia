// @ts-check
import { defineConfig } from 'astro/config';
import { readdirSync } from 'node:fs';

// Build the set of article slugs that actually exist, so links to missing
// articles can be auto-styled as "red links" (the MediaWiki convention). This
// runs at config load; new articles are picked up on the next build.
const EXISTING = new Set(
  readdirSync('./src/content/articles')
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, '')),
);

// rehype plugin: (1) any <a href="/wiki/slug"> whose slug has no article file gets
// class="redlink" (lands on the 404 "create this article" page); (2) relabel the
// GFM footnotes heading from "Footnotes" to "References".
function rehypeWigiLinks() {
  return (tree) => {
    const walk = (node) => {
      if (node.type === 'element' && node.tagName === 'a' && node.properties) {
        const href = node.properties.href;
        if (typeof href === 'string') {
          const m = href.match(/^\/wiki\/([^/#?]+)\/?$/);
          if (m && !EXISTING.has(m[1])) {
            let cls = node.properties.className;
            cls = Array.isArray(cls) ? cls : cls ? [cls] : [];
            if (!cls.includes('redlink')) cls.push('redlink');
            node.properties.className = cls;
          }
        }
      }
      if (
        node.type === 'element' &&
        node.tagName === 'h2' &&
        node.properties &&
        String(node.properties.id || '').includes('footnote-label')
      ) {
        node.children = [{ type: 'text', value: 'References' }];
      }
      if (node.children) node.children.forEach(walk);
    };
    walk(tree);
  };
}

export default defineConfig({
  site: 'https://wigipedia.io',
  output: 'static',
  markdown: {
    rehypePlugins: [rehypeWigiLinks],
  },
});
