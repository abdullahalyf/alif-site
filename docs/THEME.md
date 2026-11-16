# Theme inventory

This describes the current theme; no theme module is wired up yet. Definitions are in `src/app/globals.css` unless noted. `docs/DESIGN.md` explains the approved visual direction.

## Colours

The `:root` variables below are exposed through `@theme inline` as `--color-<name>` (Tailwind colour utilities).

| Variable | Value | Affects |
| --- | --- | --- |
| `--cream` | `#f2ede3` | Page, header, menu, button text, hero gradient |
| `--cream-2` | `#e8e1d3` | Image placeholders, project media, gradient, scrollbar track |
| `--ink` | `#1e1c19` | Body text, buttons, focus outline |
| `--ink-muted` | `#6a645a` | Labels, captions, secondary text, dark dividers, scrollbar |
| `--line` | `#d6cebf` | Hairline borders and hero stripes |
| `--night` | `#22201c` | Footer and dark section backgrounds |
| `--night-text` | `#ede7db` | Dark section text, buttons and focus |
| `--accent` | `#9db34a` | Location dot and focus halo |

`transparent` is used for secondary buttons, tap highlights and the hero gradient. Focus uses ink/night-text plus an accent halo; accent alone is not the text colour. Recheck WCAG AA whenever changing a pair.

## Fonts and type

Local fonts are registered in `src/app/layout.tsx`: Inter variable (`--font-inter`) and Instrument Serif regular/italic (`--font-instrument`), from `src/fonts/`. `@theme inline` maps them to `--font-sans` and `--font-serif`, with system sans-serif/serif fallbacks. Share images separately use the TTF fonts in `src/seo/share-image.tsx`.

| Definition | Current value | Affects |
| --- | --- | --- |
| `--type-h1` / `--text-h1` | `clamp(3rem, 1.8rem + 5vw, 6rem)` | H1, approach step numbers |
| `--type-h2` / `--text-h2` | `clamp(2.25rem, 1.5rem + 3vw, 4rem)` | H2, next-project link |
| `--type-h3` / `--text-h3` | `clamp(1.5rem, 1.2rem + 1vw, 2rem)` | H3, work rows, mobile approach |
| Body | `clamp(1rem, .95rem + .2vw, 1.125rem)` / 1.6 | Reading text |
| Headings | weight 400, line-height 1.05, tracking -.025em | H1–H3 |
| Labels | .75rem, tracking .08em, uppercase | Section labels |
| Lead | 1.25rem | Intro copy |
| Hero intro | `clamp(1.125rem, 1rem + .4vw, 1.375rem)` | Hero paragraph |
| Menu | `clamp(2.5rem, 8vw, 4rem)` / 1.1 | Mobile links |
| Supporting type | .8rem tagline; .875rem captions, location, pills, footer; .9rem logo; 1rem buttons; 2rem arrows | UI details |

## Shape, spacing and layout

These are literal CSS values, not central variables today. Tailwind's imported default theme is also available; this inventory describes the site-specific choices rather than every upstream utility.

| Definition | Values | Affects |
| --- | --- | --- |
| Radius | 999px | Buttons, tagline, stack pills |
| Radius | 50% | Avatar and status dot |
| Radius | 24px | Hero photo/panel and lower gradient corners |
| Radius | 1.5rem | About portrait |
| Radius | 1rem | Project media |
| Radius | .75rem | Story photos |
| Spacing literals | .25, .35, .4, .5, .65, .7, .75, .9, 1, 1.25, 1.5, 1.75, 2, 2.5, 2.75, 3, 4, 5, 5.5, 6, 7, 8, 12rem | Padding, gaps, margins, offsets, controls, header heights, stripes; declarations remain in the relevant selectors |
| Section/page spacing | `clamp(4rem, 9vw, 8rem)` | `.section-space`, `.page-shell` |
| Footer spacing | `clamp(3rem, 8vw, 7rem)` | `.footer-inner` |
| Hero top | `clamp(3rem, 6vw, 6rem)` | `.hero` |
| Split/story gap | `clamp(2rem, 7vw, 7rem)` | Split sections, About, story chapters |
| Chapter separation | `clamp(4rem, 12vw, 10rem)` | `.story-chapters` |
| Approach padding | `clamp(2.5rem, 5vw, 5rem)` | `.approach-steps li` |
| Container | `min(100% - 3rem, 76rem)` | Page width and horizontal gutters |
| Text measures | 18ch H1; 20ch section titles; 23ch footer; 28ch work titles; 45/48/50/65ch prose; 64rem hero copy | Reading width |
| Borders/focus | 1px hairlines; 2px outline, 5px offset, 3px halo | Dividers and keyboard focus |
| Breakpoints | 47.999rem max; 64rem min with hover | Mobile layouts and desktop project preview |
| Media ratios | 16:9 hero/case; 4:5 mobile hero/story; 4:3 cards/mobile case; 1:1 and 5:4 story variants | Photo cropping |
| Carousel | 42% card width, 88% mobile; scroll snap | Selected work |
| Layout | 1fr/1fr splits; 1fr/2fr details; mobile single column | Main sections |

Motion literals in globals: 180ms transitions, -2px hover lift, header translate -100%; reduced-motion rules disable transitions/animations. Other layout dimensions (e.g. 17rem work preview, 60dvh main minimum, 100dvh menu) remain component-specific, not reusable theme tokens. Motion logic lives in existing components/lib and is outside this task.

## Proposed single theme.ts shape (future only)

```ts
export const theme = {
  colors: { cream: '#f2ede3', cream2: '#e8e1d3', ink: '#1e1c19', inkMuted: '#6a645a', line: '#d6cebf', night: '#22201c', nightText: '#ede7db', accent: '#9db34a' },
  fonts: { body: 'Inter', display: 'Instrument Serif' },
  type: { h1: 'clamp(3rem, 1.8rem + 5vw, 6rem)', h2: 'clamp(2.25rem, 1.5rem + 3vw, 4rem)', h3: 'clamp(1.5rem, 1.2rem + 1vw, 2rem)', bodyLineHeight: 1.6 },
  radii: { small: '.75rem', card: '1rem', photo: '1.5rem', pill: '999px', circle: '50%' },
  layout: { maxWidth: '76rem', gutter: '1.5rem', sectionSpace: 'clamp(4rem, 9vw, 8rem)', splitGap: 'clamp(2rem, 7vw, 7rem)' },
  spacing: { unit: '.25rem' },
  breakpoints: { mobileMax: '47.999rem', previewMin: '64rem' },
  motion: { transitionMs: 180, hoverLift: '-2px' },
};
```

A later standalone refactor should generate CSS variables and share-image colours/fonts from this shape, retain local font assets, and preserve accessible contrast and reduced-motion behavior. Do not import this proposed object yet.
