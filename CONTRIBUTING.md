# Contributing to Wigipedia

Thanks for combing through. Wigipedia is edited through **pull requests** — there is no
in-browser editor (yet). Every article is a Markdown file, so contributing is just adding or
editing a file and opening a PR.

## Add or edit an article

1. Fork the repo (or branch, if you have write access).
2. Create or edit a file in `src/content/articles/`, named with a kebab-case slug — the
   filename becomes the URL: `comb-over.md` → `/wiki/comb-over`.
3. Use this frontmatter shape:

   ```markdown
   ---
   title: "The comb-over"
   summary: "One or two sentences shown under the title and on the home page."
   categories: ["Hairstyles", "The war against baldness"]
   featured: false        # true puts it in the home-page Featured slot
   stub: false            # true shows the "this is a stub" notice
   infobox:
     caption: "Optional caption (HTML allowed)."
     image: "/images/comb-over.png"   # put the file in public/images/
     imageAlt: "Alt text for the image"
     rows:
       - label: "Patent"
         value: "US 4,022,227 (1977)"
   ---

   Body text in Markdown. Cross-link other articles like
   [the toupée](/wiki/history-of-the-toupee). For a link to an article that does not exist
   yet, use a red link: <a class="redlink" href="#">Keratin</a>.

   Add the running gag with: <sup class="cn"><a href="#">[citation needed]</a></sup>
   ```

4. Run `npm test` and `npm run build` locally if you can.
5. Open a PR. The build check runs automatically.

## House style

- **Quirky but mostly true.** Pick real subjects and surprising real facts. The fun is in
  the framing, not in making things up. If a specific claim (a date, a patent number, a
  name) is checkable, check it.
- **Encyclopedic voice** with a dry wit. Neutral, then occasionally winking.
- Use the `[citation needed]` gag sparingly — it lands best once or twice per article.
- Keep articles cross-linked. A wiki is a web, not a list.

## Images

- Only **original or AI-generated** images, placed in `public/images/`.
- **No copyrighted images.** No real logos, no scraped photos, no stock you don't have rights to.
- Square-ish images work best in the infobox.

## Licensing of contributions

By contributing you agree your text and original images are released under
**CC BY-SA 4.0**, and any code under the **MIT** license.
