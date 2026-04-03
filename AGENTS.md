# Portfolio — Agent Instructions

## Overview

Photography portfolio for lukecartledge.com. Astro v6 (SSG) + Sanity CMS v5 + Cloudflare Pages.

## Build & Dev

```sh
npm run dev       # Local dev server
npm run build     # Production build (output: dist/)
npm run preview   # Preview production build

# Sanity Studio (from sanity/ directory)
cd sanity && npm run dev     # Studio dev server
cd sanity && npx sanity build  # Build Studio
```

## Stack

- **Framework**: Astro v6, static output
- **CMS**: Sanity (project `c42ibxe8`, dataset `production` — public, no token needed)
  - Client: `src/lib/sanity.ts`
  - Image helpers: `src/lib/image.ts`
  - Content loader: `src/content.config.ts` (custom Astro v5+ loader)
  - Studio: `sanity/` directory (deploys to lukecartledge.sanity.studio)
- **Hosting**: Cloudflare Pages (`wrangler.toml`)
- **Styling**: Vanilla CSS with custom properties. No Tailwind, no CSS-in-JS.
- **Fonts**: Playfair Display (headings), Satoshi variable (body) — self-hosted in `public/fonts/`

## Conventions

- **Zero client-side JavaScript** in Phase 1. Astro ships no JS by default — keep it that way.
- **Scoped styles**: Use `<style>` blocks in `.astro` components. Import `global.css` and `utilities.css` only in `Base.astro`.
- **Design tokens**: All spacing, colors, typography use CSS custom properties from `src/styles/global.css`.
- **Images**: All photography served from Sanity CDN with `auto=format` (WebP/AVIF). Use helpers in `src/lib/image.ts`.
- **Atomic commits**: Each commit does one thing. Build passes before and after. Message has no "and".
- **Content collections**: Astro content config at `src/content.config.ts` with custom Sanity loader. Uses `@sanity/client` directly (no `sanityLoader` — it doesn't exist).

## File Structure

```
├── sanity/
│   ├── schemaTypes/    # siteConfig, photo, collection, page
│   ├── sanity.config.ts
│   └── sanity.cli.ts
├── src/
│   ├── components/     # Reusable .astro components
│   ├── content.config.ts  # Astro content collections
│   ├── layouts/        # Page layouts (Base, Page)
│   ├── lib/            # Sanity client, image helpers
│   ├── pages/          # Route pages
│   └── styles/         # global.css, utilities.css
```

## Sanity

- **Project ID**: `c42ibxe8`
- **Dataset**: `production` (public — no API token needed for reads)
- **API Version**: `2024-01-01`
- **Studio**: Deploys separately to `lukecartledge.sanity.studio`
- **Schema types**: siteConfig (singleton), photo, collection, page

## Environment Variables

Dataset is public. No `.env` file required.

```
SANITY_API_TOKEN    # Only needed if dataset is changed to private
```

## Do Not

- Add Tailwind or CSS-in-JS
- Add client-side JavaScript without explicit approval
- Suppress TypeScript errors with `as any` or `@ts-ignore`
- Modify font files or design tokens without checking the plan
- Commit `.env` files
- Use `sanityLoader` (it does not exist in @sanity/astro)
- Add `react()` integration (Studio deploys separately)
