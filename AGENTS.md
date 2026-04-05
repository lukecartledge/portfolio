# Portfolio — Agent Instructions

## Overview

Photography portfolio for lukecartledge.com. Astro v6 (SSG) + Contentful CMS + Cloudflare Pages.

## Build & Dev

```sh
npm run dev       # Local dev server
npm run build     # Production build (output: dist/)
npm run preview   # Preview production build
```

## Stack

- **Framework**: Astro v6, static output
- **CMS**: Contentful (space `n8tdu288v05j`, environment `master`)
  - Client: `src/lib/contentful.ts`
  - Image helpers: `src/lib/image.ts`
  - Content loader: `src/content.config.ts` (custom Astro loader using contentful SDK)
- **Hosting**: Cloudflare Pages (`wrangler.toml`)
- **Styling**: Vanilla CSS with custom properties. No Tailwind, no CSS-in-JS.
- **Fonts**: Raleway (headings, 400/700), Poppins (body, 400) — self-hosted woff2 in `public/fonts/`

## Conventions

- **Minimal client-side JavaScript**: `<script is:inline>` only for progressive enhancements (lightbox, gallery reveal animations, mobile nav). Astro ships no JS by default — keep new JS to enhancement-only patterns.
- **Scoped styles**: Use `<style>` blocks in `.astro` components. Import `global.css` and `utilities.css` only in `Base.astro`.
- **Design tokens**: All spacing, colors, typography use CSS custom properties from `src/styles/global.css`.
- **Images**: All photography served from Contentful Images API (`images.ctfassets.net`) with `?fm=webp`. Use helpers in `src/lib/image.ts`.
- **Atomic commits**: Each commit does one thing. Build passes before and after. Message has no "and".
- **Content collections**: Astro content config at `src/content.config.ts` with custom Contentful loader.

## Current Status

- **Phase 6 complete** — site live at lukecartledge.com
- **Phase 7 next** — Photo portfolio: collection/album pages, individual photo pages, homepage curation
- **Remaining Phase 6 items** — Lighthouse ≥ 95 audit, OG meta social preview verification

## File Structure

```
├── src/
│   ├── components/     # Reusable .astro components (Header, Footer, PhotoCard, PhotoGrid, PhotoLightbox, Head)
│   ├── content.config.ts  # Astro content collections (custom Contentful loader)
│   ├── layouts/        # Page layouts (Base, Page)
│   ├── lib/            # Contentful client, image helpers
│   ├── pages/          # Route pages
│   │   ├── photo/      # Individual photo pages (Phase 7 — empty)
│   │   └── photography/ # Collection pages (Phase 7 — empty)
│   └── styles/         # global.css, utilities.css
```

## Contentful

- **Space ID**: `n8tdu288v05j`
- **Environment**: `master`
- **Content types**: siteConfig, photo, collection, page

## Environment Variables

```
CONTENTFUL_SPACE_ID
CONTENTFUL_DELIVERY_TOKEN
```

## Do Not

- Add Tailwind or CSS-in-JS
- Add client-side JavaScript without explicit approval
- Suppress TypeScript errors with `as any` or `@ts-ignore`
- Modify font files or design tokens without checking the plan
- Commit `.env` files
- Add `react()` integration
