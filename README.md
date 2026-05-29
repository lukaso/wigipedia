# Wigipedia

**The free hair encyclopedia that anyone can comb.**

Wigipedia is a Wikipedia-*feeling* encyclopedia about hair, wigs, and (a little) fur.
The editorial line is **quirky but mostly true**: genuinely interesting, surprising,
slightly weird facts, written in a fun encyclopedic voice — with the occasional dry
"[citation needed]" gag. It is a parody in tone, not in facts. We are not affiliated with
Wikipedia or the Wikimedia Foundation.

Built as a fully static [Astro](https://astro.build) site, deployed to Cloudflare Pages.

## Develop locally

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run preview  # serve the built site
npm test         # schema + build + link checks
```

## How it's organized

- `src/content/articles/*.md` — every article is one Markdown file with frontmatter.
- `src/content.config.ts` — the article schema (title, summary, categories, infobox).
- `src/layouts/`, `src/components/`, `src/pages/` — the Astro layout, UI, and routes.
- `public/images/` — article images (original or AI-generated; never copyrighted).

## Contributing

Editing happens through **GitHub pull requests** — see [CONTRIBUTING.md](./CONTRIBUTING.md).
The short version: add or edit a Markdown file under `src/content/articles/`, open a PR,
and the build check runs automatically.

## Licensing

- **Code** — [MIT](./LICENSE).
- **Article text and original images** — [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

Nothing in this repository may contain copyrighted text or images you do not have the right
to publish under these licenses. Keep it original.
