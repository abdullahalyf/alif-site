# Make a site for someone else in 10 minutes

This is a starter workflow, not an automatic rebrand. Publishing safely takes a review of claims, photos, contact details and links. Current page layouts stay the same.

1. Use a separate repository for the new person's site. Install Node (CI uses 22), pinned pnpm, then `pnpm install --frozen-lockfile`. Keep a recoverable commit before replacing content.
2. Copy `templates/starter/content/site.ts` to `src/content/site.ts`. Change its type import to `./schema`. This file includes all shared copy exports needed by the existing app; do not copy only the `site` object.
3. Copy `templates/starter/content/projects.ts` to `src/content/projects.ts` and change its type import to `./schema`. The example includes `getProject`, which existing routes use.
4. Remove the old person's Markdown posts from the new site's `src/content/posts/` after backing them up. Copy `templates/starter/content/posts/welcome.md` there. Keep it draft until its words and date are ready.
5. Search the copied files for `// REPLACE`, and the post for `REPLACE`. Fill every field with the new person's facts. Review all shared labels and SEO descriptions too. Minimum schema requirements include two testimonial objects: obtain genuine approved quotes before publication; placeholders are not endorsements. A later task can make those sections optional.
6. Add an owned portrait with `pnpm add:image /path/to/photo.jpg your-portrait`. Paste its output into heroPhoto, avatar and aboutPhoto as appropriate, with real alt text. The starter's `/images/your-portrait.jpg` is deliberately a placeholder path; schema validation passes, but the content CLI will require the file to exist. Story image may remain `null`, project images may remain `[]`.
7. Inspect `docs/THEME.md`. Today colours/type/spacing are in globals.css, font registrations in layout.tsx, and share-image presentation in src/seo/share-image.tsx. A theme change needs a separate, reviewed code change; copying the starter does not apply a new theme. Keep local fonts and check contrast.
8. Run `pnpm validate:content`, resolve all errors, then `pnpm check`. Run browser tests where available. Existing browser tests assert Alif's sample content and may need deliberate updates for the new person's site; do not simply delete assertions to turn them green.
9. Preview every page on desktop/mobile, including production (drafts hidden), contact links and share images. Search all content for the old person's name, email, phone, handles, `TODO(` and `DEMO`. Check static public assets as well.
10. Connect the new repository to its own Vercel project, set `NEXT_PUBLIC_SITE_URL` to its HTTPS origin, then review and merge. Vercel auto-deploys main. Confirm the live result before sharing.

See [CONTENT-GUIDE.md](CONTENT-GUIDE.md) for field examples and [THEME.md](THEME.md) for current design definitions. Schema-valid starter content is intentionally obvious sample content, not launch-ready copy.

## Planned refactor

Task 15 will run alone, after page work has settled. Move editable content to a single `content/` folder and introduce the proposed `theme.ts` shape from THEME.md. Routes/components should import stable adapters, and build-time validation should keep the existing schemas as the contract. Generate CSS variables and share-image styling from the same theme data, preserve local fonts, and make optional sections explicit. Plan migration of post paths, image paths, tests and documentation together; keep URLs and rendering behavior stable. None of these moves is implemented in Task 14.
