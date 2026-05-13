---
name: Skincare Dossier
description: A minimalist CRM for modern cosmetologists and medical-spa practitioners.
version: 1.0.0
updated: 2026-05-12

colors:
  # Neutrals — the cream-and-ink foundation
  bg: "#F4EFE7"           # Page background. Warm cream, off-white.
  bg-soft: "#EDE6DA"      # Secondary surfaces, alt sections, sidebars.
  bg-card: "#FBF8F2"      # Cards, modals, elevated surfaces.
  ink: "#1A1714"          # Primary text, primary buttons, hard borders.
  ink-2: "#3A332C"        # Secondary text, body copy.
  ink-3: "#6B6358"        # Tertiary text, labels, helper copy.
  ink-4: "#968D80"        # Quaternary — captions, counters, faint marks.
  rule: "#D8CFBE"         # Primary borders, dividers.
  rule-soft: "#E5DDCC"    # Subtle dividers inside cards, table rules.

  # Accent — used SPARINGLY (rule of thumb: ≤ 1 use per viewport)
  accent: "oklch(0.62 0.08 35)"       # Soft clay terracotta. ~#B8744E
  accent-ink: "oklch(0.34 0.06 35)"   # Darkened accent for text on cream.
  accent-soft: "oklch(0.92 0.025 35)" # Tinted background for pills, avatars.

  # Inverted surface (testimonial / dark CTA)
  ink-on-dark: "#F4EFE7"
  ink-on-dark-2: "rgba(244,239,231,0.65)"

typography:
  display:
    fontFamily: "Instrument Serif"
    fontStyle: "regular + italic"
    fontWeight: 400
    letterSpacing: "-0.02em"
    lineHeight: 0.96
    notes: "Display only. Italic reserved for emphasis fragments, never full headings."
  h1:
    fontFamily: "Instrument Serif"
    fontSize: "clamp(46px, 7.5vw, 104px)"
    lineHeight: 0.96
    letterSpacing: "-0.025em"
  h2:
    fontFamily: "Instrument Serif"
    fontSize: "clamp(38px, 5.4vw, 72px)"
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  h3:
    fontFamily: "Instrument Serif"
    fontSize: "30px"
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  body-lg:
    fontFamily: "Geist"
    fontWeight: 400
    fontSize: "19px"
    lineHeight: 1.5
  body:
    fontFamily: "Geist"
    fontWeight: 400
    fontSize: "16px"
    lineHeight: 1.55
  body-sm:
    fontFamily: "Geist"
    fontWeight: 400
    fontSize: "14px"
    lineHeight: 1.5
  ui-label:
    fontFamily: "Geist"
    fontWeight: 500
    fontSize: "13px"
    lineHeight: 1.3
  eyebrow:
    fontFamily: "Geist Mono"
    fontWeight: 400
    fontSize: "12px"
    textTransform: "uppercase"
    letterSpacing: "0.14em"
  meta:
    fontFamily: "Geist Mono"
    fontWeight: 400
    fontSize: "11px"
    textTransform: "uppercase"
    letterSpacing: "0.10em"
  numeric:
    fontFeatureSettings: '"tnum", "lnum"'
    notes: "All numeric data — dates, counts, prices — uses tabular lining figures."

spacing:
  base: 4
  scale:
    xs: 4
    sm: 8
    md: 12
    lg: 16
    xl: 24
    2xl: 32
    3xl: 48
    4xl: 64
    5xl: 96
    6xl: 144
  section-y: 110          # Vertical padding for marketing sections.
  container-max: 1240
  container-pad-desktop: 32
  container-pad-mobile: 22

radius:
  xs: 3
  sm: 6
  md: 8
  lg: 12
  xl: 16
  pill: 999

elevation:
  flat: "none"
  card: "0 1px 0 rgba(255,255,255,0.6) inset"
  raised: "0 1px 0 rgba(255,255,255,0.6) inset, 0 30px 60px -30px rgba(26,23,20,0.18), 0 80px 120px -60px rgba(26,23,20,0.12)"

motion:
  fast: "150ms ease"
  base: "200ms ease"
  slow: "350ms ease"
  reveal: "700ms ease"
  easing: "cubic-bezier(0.22, 0.61, 0.36, 1)"

components:
  button-primary:
    background: ink
    text: bg
    radius: pill
    padding: "11px 18px"
    fontSize: 14
    fontWeight: 500
    hover: "background → accent-ink"
  button-outline:
    background: bg-card
    text: ink
    border: "1px solid rule"
    radius: pill
    hover: "border-color → ink"
  button-ghost:
    background: transparent
    text: ink-2
    hover: "text → ink"
  card:
    background: bg-card
    border: "1px solid rule-soft"
    radius: lg
    padding: "20px"
  input:
    background: bg
    border: "1px solid rule"
    radius: sm
    padding: "9px 12px"
    focus: "outline: 2px solid accent; outline-offset: -1px"
  pill:
    background: accent-soft
    text: accent-ink
    radius: pill
    padding: "2px 8px"
    fontSize: 11
  tag:
    background: bg-soft
    text: ink-2
    border: "1px solid rule-soft"
    radius: xs
    fontFamily: "Geist Mono"
    textTransform: uppercase
    letterSpacing: "0.06em"
    fontSize: 10
---

# Skincare Dossier — Design System

## Overview

Skincare Dossier is a CRM for cosmetologists and medical-spa practitioners. The product transforms scattered notes and inherited spreadsheets into a calm, card-based treatment history. The visual language reflects the *clinical aesthetics* world it serves: rigorous, quiet, editorial — closer to a small-press monograph or a Kinfolk spread than a SaaS dashboard.

**Atmosphere:** "Architectural calm with editorial gravitas." Warm cream surfaces, deep ink type, a single muted clay accent. Generous whitespace. Tabular precision where data appears.

**Audience:** Independent practitioners and small medi-spas (1–10 seats). Discerning, design-aware, allergic to clinical-blue SaaS tropes and over-friendly mascots.

## Design Principles

1. **Whitespace is a feature, not waste.** A near-empty section reads as confidence. Resist the urge to fill.
2. **Editorial, not corporate.** Type does the heavy lifting — serif display, italic emphasis, mono eyebrows.
3. **One accent, used rarely.** Soft clay shows up at most once per viewport. It marks the singular important action or the freshest data point. Never decorate with it.
4. **Numbers are data, not ornament.** Always tabular figures, always restrained. No oversized hero stats that don't earn their size.
5. **Quiet motion.** Fades and tiny translates only. No bouncy springs, no parallax, no scroll-jacking.

## Colors

The palette is **warm cream + deep ink + one accent**. Treat the accent like saffron in a dish — present, never dominant.

### Neutrals
- `bg` `#F4EFE7` — page background. Warm, slightly yellowed, never pure white.
- `bg-soft` `#EDE6DA` — alternate sections, sidebars. Use to mark rhythm between marketing sections.
- `bg-card` `#FBF8F2` — cards and elevated surfaces. Lifts ~one shade above the page.
- `ink` `#1A1714` — primary text, dark CTAs, hard rules. Never pure black.
- `ink-2` `#3A332C` — long-form body copy.
- `ink-3` `#6B6358` — labels, helper copy, eyebrows, secondary lists.
- `ink-4` `#968D80` — counters, captions, faintest UI marks.
- `rule` / `rule-soft` — borders. `rule` for structural divides, `rule-soft` for inside-card lines.

### Accent
A single accent: **soft clay**, `oklch(0.62 0.08 35)` (~`#B8744E`). Used for:
- The fresh/active item in a timeline.
- The chosen tier badge in pricing.
- Single-word italic emphasis fragments inside serif headings (via `accent-ink`).
- The brand mark inner dot.

**Never** use the accent for entire button fills (use `ink` instead), gradients, or decorative bands.

### Inverted surface
A single dark section (the testimonial) inverts to `ink` background with `bg` text. This is the only dark surface in the system.

## Typography

A two-family pairing: **Instrument Serif** for display, **Geist** for everything else. **Geist Mono** for eyebrows, metadata, and IDs.

### Why Instrument Serif
It has the warmth of a Didone with looser proportions — it carries italic gracefully, scales to monumental sizes without feeling theatrical, and stays legible at 24px. Set it at weight 400 only.

### Rules
- **Display headings:** Instrument Serif, 400, tight tracking (`-0.02em`). Use sentence case, never ALL CAPS.
- **Italic emphasis:** italicize a single phrase per heading using `accent-ink` color. Example: `The dossier *your practice* has always deserved.`
- **Body:** Geist 400/500 with `text-wrap: pretty`. Headings get `text-wrap: balance`.
- **Eyebrows / labels:** Geist Mono, uppercase, `0.14em` tracking. Always paired with a section number (e.g. `01 ——  What's inside`).
- **Numbers:** turn on `font-feature-settings: "tnum", "lnum"` everywhere data appears. Dates, prices, counts.

### Don't
- Don't use Inter, Roboto, Arial, or system sans. Geist is the only sans.
- Don't bold the serif. Italic is the only emphasis modifier.
- Don't underline body links — use color or weight shift only.

## Spacing & Layout

- **Container max:** 1240px, padded 32px desktop / 22px mobile.
- **Section vertical rhythm:** 110px desktop, 80px mobile.
- **Component spacing scale:** 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 144.
- **Grid:** prefer CSS Grid with explicit `gap`. Never inline-block with margin spacing.
- **Density:** lean toward more whitespace than feels comfortable. If it looks empty, it's probably right.

## Radii

- `3` — tags, tiny chips.
- `6` — inputs, glyph blocks.
- `8` — small interactive surfaces.
- `12` — standard cards.
- `16` — large surfaces (feature grids, hero frame).
- `18` — hero product preview only.
- `999` — pills, badges, all buttons.

Buttons are ALWAYS fully-pilled. Cards are 12–16px. Inputs are 6px. Mixing these breaks the system.

## Elevation

Three levels only:
1. **Flat** — most surfaces. Borders create the separation, not shadow.
2. **Card** — a 1px inner highlight only. No drop shadow.
3. **Raised** — the hero product preview. A long, soft, low-opacity multi-layer shadow.

No mid-elevation hover lifts beyond a 1px translate.

## Motion

- **Hovers:** 150ms ease, color/border only. Buttons may shift their arrow by 2px.
- **Reveals:** 700ms `fadeUp` (`translateY(12px) + opacity`) triggered by IntersectionObserver at 10% threshold. Use sparingly — hero preview and a few statement sections only.
- **Tab transitions:** 350ms opacity crossfade.
- **No:** parallax, scroll-jacking, bouncy springs, infinite carousels, animated gradients.

## Iconography

The product does not ship a full icon set on the landing page. Where marks are needed, prefer **geometric glyphs built from CSS primitives** — a circle with an inner accent dot, a 3×2 muted grid, a small timeline of dots-and-bars. They read as diagrams, not icons. This intentional spareness reinforces the editorial voice.

Avoid: line-icon sets (Lucide, Feather, Material). Avoid emoji entirely.

## Imagery

The landing page intentionally uses **zero photography**. The product UI itself, rendered in-frame, is the hero image. If imagery is needed later, prefer:
- Black-and-white macro photography of texture (paper, ceramic, linen).
- Never stock photos of clinicians smiling at clipboards.
- Never gradients-as-illustration.

## Components

### Buttons
- **Primary:** ink background, cream text, fully pilled. The only filled button shape.
- **Outline:** cream-card background, ink text, 1px rule border.
- **Ghost:** text-only, ink-2 → ink on hover.
- All buttons: 11px×18px padding, 14px text, 500 weight, may include a single `→` arrow that translates 2px on hover.

### Cards
- `bg-card` background, 1px `rule-soft` border, 12px radius, 20px padding.
- On hover (when interactive): border darkens to `ink-4`, translate up 1px. No shadow change.

### Pills & Tags
- **Pill** (status, badge): rounded, `accent-soft` background with `accent-ink` text. 11–12px.
- **Tag** (treatment, mono): tiny mono caps, `bg-soft` background, `rule-soft` border, 3px radius.

### Inputs
- `bg` background, 1px `rule` border, 6px radius.
- Focus: 2px solid `accent` outline, `outline-offset: -1px`.
- Labels above inputs as Geist Mono uppercase eyebrows, never floating labels.

### Sectioning chrome
- Every major section opens with: an **eyebrow line** (`02 —— Section name` in Geist Mono caps) → **serif title** (with one italic-accent fragment) → **lede paragraph** in Geist, max-width 600px.

### Product surfaces (the in-app UI shown on the landing page)
- **Sidebar nav** lives on `bg-soft`. Active item gets `bg-card` and ink weight; others stay in `ink-3`.
- **Client cards** in the directory grid: 20px padding, avatar circle in `accent-soft`/`accent-ink`, name in Geist 500, ID in Geist Mono 11px.
- **Timeline** uses a 1px `rule` vertical track with 11px dots. The newest dot is filled with `accent`; older dots are hollow with `ink` border.

## Voice & Copy

- **Tone:** editorial, restrained, second-person. Confident without bravado.
- **Length:** ledes are 20–35 words. Headings are 4–10 words. Italicize one fragment for cadence.
- **Vocabulary:** "case," "dossier," "session," "practitioner," "treatment," "follow-up." Avoid "users," "leverage," "powerful," "seamless," "revolutionize."
- **Numbers in copy:** spell out one through nine; numerals for ten+. Always tabular figures in UI.
- **CTAs:** `Start free trial`, `Book a 15-min demo`, `Talk to founders`. Never "Get started!" with an exclamation.

## Accessibility

- All ink-on-cream and cream-on-ink pairings pass WCAG AA at body sizes (`ink` on `bg` ≈ 14.8:1).
- Accent is **not** used as the sole signal for state — pair with text or position.
- Focus rings are visible: 2px accent outline on inputs, 2px ink outline on buttons (default browser focus retained).
- Minimum hit target: 44×44px on touch.
- Reduced motion: disable reveal animations under `@media (prefers-reduced-motion: reduce)`.

## Don'ts

A working filter — every line below was a real generation tendency we shut down.

- **Don't** introduce gradients. Anywhere. Backgrounds are flat warm cream.
- **Don't** use rounded-rectangle cards with a left accent border. That's the SaaS template tell.
- **Don't** add emoji to headings, eyebrows, or feature names.
- **Don't** illustrate with SVG line-icons of faces, clipboards, sparkles, lightbulbs, or rockets.
- **Don't** scale the accent above ~6% of a viewport's filled pixels. It loses its meaning.
- **Don't** mix sans-serif headings with the serif. The serif owns display.
- **Don't** auto-rotate carousels longer than 3 panels or faster than 5 seconds.
- **Don't** stack three CTAs in a row. One primary + one secondary, ever.
- **Don't** use stock photography of clinicians or skincare bottles. Use the product UI as the hero image, or restrained geometric glyphs.
- **Don't** add "Trusted by 10,000+ businesses" social proof inflation. Quiet logos with no count.
- **Don't** introduce a third font family. Instrument Serif + Geist + Geist Mono is the entire set.
- **Don't** use pure black (`#000`) or pure white (`#fff`). Always warm: ink `#1A1714`, cream `#F4EFE7`.

## Agent Prompt Guide

When generating any new screen or component for this project:

1. **Start from the tokens.** Use the YAML front matter values verbatim. Hex codes only — no inventing colors.
2. **Sectioning is fixed.** Every marketing section opens with `eyebrow → serif title → lede`. Don't skip the eyebrow.
3. **Accent is rationed.** Use it for at most one element per visible region. If two things compete for it, pick one and let the other go monochrome.
4. **Use ink, not accent, for primary buttons.** This is the most common mistake. Filled primary = ink. Accent is for status, freshness, and italic emphasis.
5. **Display type is serif. Body is sans. Eyebrows are mono.** Three families, three jobs.
6. **Italicize a fragment in every display heading.** It is the signature gesture of this brand.
7. **Tabular figures everywhere a number appears.**
8. **Generous spacing.** Default to the next-larger spacing value when uncertain.
9. **No filler.** If a section feels light, leave it. Do not invent stats, badges, or testimonial avatars to fill space.
10. **Read the Don'ts section before shipping.** It exists because each item happened once.

## File Map

- `index.html` — landing page (current source of truth for tokens applied in CSS custom properties).
- `tweaks-panel.jsx` — Tweaks shell (do not modify).
- `DESIGN.md` — this file.

When tokens change, update `:root` in `index.html` AND the YAML front matter here in the same commit.
