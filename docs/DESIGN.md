# Design

Status: **APPROVED direction** (2026-11-17). Main reference: **steno.ai**. Supporting: atlasnyc.us (About photo story), raw.london (intro + separate pages).

This is a multi-page **personal website + portfolio**, not a single landing page:
- **Home** — overview: who Alif is, what he does, where he lives, how he works, selected work, contact.
- **About me** — the personal-website part: his full story with photos (childhood → school → university → now), interests, what drives him.
- **Approach** — how he works with clients.
- **Work** — all projects + one case-study page per project.

Feel: warm, calm, editorial. A personal site people actually read — who Alif is, what he does, where he lives, how he got here. Premium through typography, space and soft motion, not effects. No 3D/WebGL/video.

## Colours (CSS variables in `globals.css`, exposed to Tailwind via `@theme`)
| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#FAF8F4` | `#1C1B18` | Main page background |
| `--surface-1` | `#FFFDFA` | `#242320` | Raised cards and product mockups |
| `--surface-2` | `#F1EEE8` | `#2C2A25` | Neutral bands, panels and image placeholders |
| `--tint-a` | `#F0F2E9` | `#262B23` | Soft green section background |
| `--tint-b` | `#E8EDE2` | `#2E352A` | Deeper green section background |
| `--ink` | `#22231E` | `#F4EFE7` | Primary text |
| `--ink-muted` | `#56554D` | `#C0B9AD` | Secondary text, captions and control outlines |
| `--line` | `#D4D0C5` | `#49463F` | Decorative dividers |
| `--accent` | `#285438` | `#A8CC9F` | Forest green links, focus rings and key actions |
| `--accent-2` | `#93492C` | `#E2A17E` | Terracotta for occasional highlights |
| `--on-accent` | `#FFFDFA` | `#1C1B18` | Text on the forest accent |
| `--night` | `#252823` | `#262823` | Home approach panel and footer |
| `--night-text` | `#F4EFE7` | `#F4EFE7` | Text on night surfaces |
| `--night-muted` | `#C0B9AD` | `#C0B9AD` | Secondary text on night surfaces |
| `--night-line` | `#5B5E53` | `#5B5E53` | Decorative dividers on night surfaces |
| `--night-accent` | `#A8CC9F` | `#A8CC9F` | Green links and focus rings on night surfaces |

All text/background pairs must pass WCAG AA.

## Typography (local fonts in `src/fonts/`, `next/font/local`)
- Display/headings: **Instrument Serif** 400 (+ italic for emphasis words). Large, tight leading (1.05), slight negative tracking.
- Body/UI: **Inter** variable. 16–18px body, line-height 1.6, max line length ~65ch.
- Small labels (captions, section labels): Inter 12–13px, uppercase, letter-spacing 0.08em, `--ink-muted`.
- Scale (fluid with `clamp`): h1 48→96px, h2 36→64px, h3 24→32px.

## Global elements
- **Header**: wordmark on the left and navigation on wide screens. The Menu button opens a side drawer that fills small screens. Both the header and drawer offer a theme control. Dark is the default, and the site remembers the visitor’s theme choice. The header stays fixed, compacts as visitors scroll down, and expands as they scroll up.
- **Buttons**: pill shape, `--ink` background with `--bg` text (primary); 1px `--ink` outline (secondary). Hover: slight lift + colour swap.
- **Section label**: small uppercase label + hairline rule above each section.
- **Footer**: `--night` background. Big serif line "Let's build something that keeps working.", email + WhatsApp buttons, socials, location, © year.

## Pages

### Home `/` (more info than raw.london — a visitor should understand Alif without clicking)
1. **Intro**: multilingual greetings and versions of “Alif,” followed by an upward exit within 1.6s. Plays on arrival at Home and skips reloads within 10 seconds. Click or Escape dismisses it, and the page underneath is available without JavaScript.
2. **Hero** (Steno hero): quote pill (`site.tagline`, small avatar dot) → serif h1 (`site.role`) → intro paragraph (`site.intro`) → buttons "Email me" / "See my work" → location line (`site.location`).
   Below it: wide rounded panel (radius ~24px) showing `site.heroPhoto` (grey-wall portrait, `object-fit: cover`, keep his face in frame on mobile), with 3–4 thin diagonal lines (`--line`) crossing over the top edge of the panel (like steno's hero stripes). Subtle bottom gradient into the page background.
3. **About teaser**: two columns — short paragraph (`site.about[0]`) + "More about me" link → `/about`.
4. **How I work** (Steno "Your Twin, custom built" section): `--night` background, serif h2, then `site.approach` steps stacked with hairline dividers, each step = h3 + paragraph. Link → `/approach`.
5. **Services**: `site.services` as a large list with hairline rows.
6. **Selected work** (Steno card row): horizontal row of project cards (scroll-snap, swipe on mobile, arrow buttons on desktop). Card = image or `--surface-2` placeholder, category label, title, summary. Link → `/work/[slug]`.
7. Footer (contact).

### About me `/about` (personal page, Atlas photo story)
- h1 + `site.aboutPhoto` large, `site.about` paragraphs beside it.
- **Story**: `site.story` chapters in an alternating staggered layout — big image on one side / text on the other, next chapter flips; images of different sizes (big, small, offset) like Atlas. Caption under each image: `[LABEL]` uppercase + chapter title. `image: null` → `--surface-2` placeholder block of the same size.

### Approach `/approach`
- h1 + intro line, then `site.approach` as large numbered steps (01, 02, …) — number in serif, title, text. Hairline between steps.

### Work `/work` and case study `/work/[slug]`
- Work: list of projects as wide rows (year · category · title · arrow); hovering a row shows its image (desktop only).
- Case study: label row (client · year · role), serif h1, summary, big image (or placeholder), then Problem / Solution (list) / Stack (pills) / Results, next-project link at the bottom.

## Animations (GSAP + ScrollTrigger + Lenis)
Every animation: skipped when `prefers-reduced-motion: reduce` (final state shown immediately) and never hides content without JS (set initial states from JS, not CSS).
1. **Smooth scroll** — Lenis site-wide.
2. **Intro** — see Home 1.
3. **Photo reveal (signature effect, from Steno)** — images start soft: `blur(12px)`, `saturate(0.4)`, `opacity 0.6`, scale 1.06; as they scroll into view they sharpen to normal (scrubbed with scroll). Applies only to the Home hero photo in the wide panel.
4. **Text reveal** — content stays readable at full opacity. A short rise starts when an element reaches 92% of the viewport. The initial viewport and the next 15% appear immediately.
5. **Hero stripes** — diagonal lines draw in (stroke-dashoffset) on load, then drift slowly with scroll (parallax).
6. **Card row** — cards slide in from the right with a small stagger when the section enters.
7. **Dark section** — the dark “How I work” panel grows from inset to full width as it enters.
8. **Hover** — buttons lift; project rows show image preview; links underline from left.

## Images
- `alif-portrait.jpg` (2400×1350) — home hero + OG/share image. `alif-about.jpg` (1200×1500) — About. `alif-avatar.jpg` (400×400) — tagline pill. These are final; use them as they are.
- Project screenshots and story photos: not yet provided → placeholders.
