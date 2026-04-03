# Portfolio — Agent Instructions

## Overview

Photography portfolio for lukecartledge.com. Astro v5 (SSG) + Sanity CMS + Cloudflare Pages.

## Build & Dev

```sh
npm run dev       # Local dev server
npm run build     # Production build (output: dist/)
npm run preview   # Preview production build
```

## Stack

- **Framework**: Astro v5, static output
- **CMS**: Sanity (client in `src/lib/sanity.ts`, image helpers in `src/lib/image.ts`)
- **Hosting**: Cloudflare Pages (`wrangler.toml`)
- **Styling**: Vanilla CSS with custom properties. No Tailwind, no CSS-in-JS.
- **Fonts**: Playfair Display (headings), Inter (body) — self-hosted in `public/fonts/`

## Conventions

- **Zero client-side JavaScript** in Phase 1. Astro ships no JS by default — keep it that way.
- **Scoped styles**: Use `<style>` blocks in `.astro` components. Import `global.css` and `utilities.css` only in `Base.astro`.
- **Design tokens**: All spacing, colors, typography use CSS custom properties from `src/styles/global.css`.
- **Images**: All photography served from Sanity CDN with `auto=format` (WebP/AVIF). Use helpers in `src/lib/image.ts`.
- **Atomic commits**: Each commit does one thing. Build passes before and after. Message has no "and".

## File Structure

```
src/
├── components/     # Reusable .astro components
├── layouts/        # Page layouts (Base, Page)
├── lib/            # Sanity client, image helpers
├── pages/          # Route pages
└── styles/         # global.css, utilities.css
```

## Environment Variables

```
SANITY_PROJECT_ID   # Sanity project ID
SANITY_DATASET      # Sanity dataset (default: production)
SANITY_API_TOKEN    # Sanity API token (optional for public datasets)
```

## Do Not

- Add Tailwind or CSS-in-JS
- Add client-side JavaScript without explicit approval
- Suppress TypeScript errors with `as any` or `@ts-ignore`
- Modify font files or design tokens without checking the plan
- Commit `.env` files
