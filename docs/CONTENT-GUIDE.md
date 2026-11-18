# Change your site content

Run commands from the repository root. Install Node (CI uses 22) and the pinned pnpm version from `package.json`, then run `pnpm install --frozen-lockfile`.

## Change text

1. Open `src/content/site.ts`. Find the current words and replace them. Keep quotes, commas and brackets.
2. `site` holds your profile, services, story, contact details and photos. The other exports in this file hold navigation, buttons, section headings and SEO descriptions. Search the whole file when changing your name or role.
3. Project words live in `src/content/projects.ts`. Blog words live in `src/content/posts/*.md`. Do not put copy in page components.
4. Run `pnpm validate:content`. Each error names the file and field. Fix errors; review warnings too. Then run `pnpm check`.

## Add a project

1. Copy one object inside the `projects` array in `src/content/projects.ts`.
2. Give it a unique lowercase slug, such as `shop-dashboard`. Use letters, numbers and single hyphens. This creates `/work/shop-dashboard`.
3. Fill title, client, year (2000 or later), role, summary, problem, solution, stack and results. Category must be `Client work`, `Research`, `Personal` or `Open source`.
4. Set `link` to a full URL or `null`. Use `images: []` for a neutral placeholder, or add photo objects with src, width, height and alt. Remove `demo: true` only when the content is real and approved.
5. Validate and preview the Work list and case study. Projects do not support drafts: keep unfinished projects out of the array until ready.

## Add a blog post

Create `src/content/posts/my-post.md` (the filename becomes the slug):

```md
---
title: "My first post"
date: "2026-01-15"
summary: "One short sentence about this post."
tags: ["Software"]
draft: true
---
## My first section

Write Markdown here.
```

Use a real date in YYYY-MM-DD format. Keep `draft: true` while editing: development shows it, production, RSS and sitemap hide it. Change to `false` to publish. Draft posts are still validated. Markdown images currently render as alt text; use the supported site/project photo fields for photos. Site sections have no draft switch.

## Add or replace a photo

1. Keep the original outside `public/images` and run `pnpm add:image /path/to/original.jpg your-photo --max 2400`.
2. The tool rotates the image, limits its width without enlargement, removes metadata, and writes `public/images/your-photo.jpg`. Inputs with an alpha channel become PNG instead.
3. Paste the printed object into a photo field in site.ts or the project's images array. Replace `alt: "TODO"` with a useful description.
4. The tool refuses to overwrite a file. For replacements use a new name, then update the content path. Never re-process the existing final Alif portraits.
5. Preview desktop and mobile crops. Keep the printed width and height; do not guess dimensions.

Local paths begin `/images/` and point into `public/images/`. HTTPS images must also be permitted by `next.config.ts`; use local files to avoid requiring configuration changes. The validator checks local file existence, not remote availability.

## ছবি বদলাবেন কীভাবে

1. নতুন নামে ছবিটি `public/images/…`-এ রাখুন। চাইলে `pnpm add:image <file> <name>` চালান। টুলটি সঠিক মাপসহ ছবির তথ্য দেখাবে।
2. নিচের ফিল্ডে `src` বদলান। যেমন `public/images/my-campus.jpg` হলে লিখুন `/images/my-campus.jpg`। ছবির আসল `width`, `height` ও ছবিতে কী দেখা যাচ্ছে তার ছোট বর্ণনা `alt`-এ দিন।
3. যে ছবি DEMO helper দিয়ে বসানো আছে, সেখানে পুরো helper কলের জায়গায় নতুন `{ src, width, height, alt }` বসান। Travel-এ `caption`-ও দিন। `pnpm validate:content` চালিয়ে মোবাইল ও ডেস্কটপে কাটছাঁট দেখুন।

| পেজ ও ছবির জায়গা | ফাইল ও ফিল্ড | প্রস্তাবিত মাপ |
| --- | --- | --- |
| Home মূল পোর্ট্রেট ও সাইট শেয়ার কার্ড | `site.ts → site.heroPhoto` | 2400×1350, JPG বা PNG |
| Home ট্যাগলাইনের গোল ছবি | `site.ts → site.avatar` | 400×400 |
| Home ডান পাশের পোর্ট্রেট | `site.ts → site.heroSide` | 900×1100 |
| Home ছবির স্ট্রিপ ও ভাসমান প্রথম ছবি | `site.ts → heroPhotos.images[]` (প্রথমটি `site.aboutPhoto`) | প্রথমটি 1200×1500, বাকিগুলো 1200×900 |
| About পোর্ট্রেট | `site.ts → site.aboutPhoto` | 1200×1500, মুখ মাঝের ওপরের দিকে রাখুন |
| About বিশ্ববিদ্যালয়, কলেজ ও স্কুল | `site.ts → site.education[].image` | 1200×900, 4:3 |
| About চারটি জীবনের অধ্যায় | `site.ts → site.story[].image` | 1600×1200, মাঝ বরাবর বিষয় রাখুন |
| About Interests | `site.ts → demoContent.interestsPhoto` | 800×1000, পোর্ট্রেট |
| Home Selected Work ও Work তালিকার থাম্বনেইল | `projects.ts → projects[].images[0]` | 1600×1000, ল্যান্ডস্কেপ |
| Work কেস স্টাডির কভার ও গ্যালারি | `projects.ts → projects[].images[]` (প্রথমটি কভার) | 1600×1000, ল্যান্ডস্কেপ |
| About ভ্রমণ স্ট্রিপ, Travel বই, ম্যাপ, তালিকা, ট্রিপ কভার ও গ্যালারি | `travel.ts → trips[].photos[]` ও `internationalTrips[].photos[]` (প্রথমটি কভার ও থাম্বনেইল) | 1200×900, 4:3, সঙ্গে `caption` |
| ব্রাউজার ট্যাবের আইকন | `site.ts → site.logoInitial` থেকে 64×64 আইকন তৈরি হয় | আলাদা ছবি লাগে না |
| Work, Writing ও Travel শেয়ার কার্ড | `projects.ts`, `posts/*.md` ও `travel.ts`-এর শিরোনাম এবং মেটাডেটা থেকে 1200×630 কার্ড তৈরি হয় | আলাদা ছবি লাগে না |

সব কনটেন্ট ফাইলের শুরুতে `src/content/` যোগ করুন। Writing, Services, Approach, Contact, Lab, Estimate, Résumé, Uses ও Now-এর মূল পাতায় বদলানোর আলাদা ছবি নেই।

## Replace demo content

Run `rg -n '// DEMO' src/content` (or search for `// DEMO` in your editor). Replace each marked example with confirmed facts, approved quotes and owned photos. Check every item in a marked group. Search for `DEMO` and `TODO(` as well, including Markdown comments. Remove markers only after replacing the content. The validator prints marker counts per file and warns about `TODO(` in non-draft sources. It cannot confirm whether a claim is true.

## Preview and deploy

Run `pnpm dev`, then open the local site in your normal development browser. Check Home, About, Approach, Work, Writing, Now, links, keyboard navigation and mobile layout. Run `pnpm check` and `pnpm test:e2e` (install Playwright Chromium if needed). Production preview: stop dev, run `pnpm build && pnpm start`; drafts should disappear.

Review your changes in a branch/PR. Vercel auto-deploys merged changes on main. In Vercel set `NEXT_PUBLIC_SITE_URL` to the site's public HTTPS origin so canonical links and sharing metadata do not use localhost. Confirm the live pages, contact details and share images after deployment. Never put private credentials in content files.
