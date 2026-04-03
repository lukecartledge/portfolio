# lukecartledge.com

Personal photography portfolio built with [Astro](https://astro.build) and [Sanity](https://www.sanity.io), deployed on [Cloudflare Pages](https://pages.cloudflare.com).

## Stack

- **Astro v6** — Static site generation, zero client-side JavaScript
- **Sanity v5** — Headless CMS for photography and site content
- **Cloudflare Pages** — Hosting and CDN
- **Vanilla CSS** — Custom properties, scoped styles, no frameworks
- **Fonts** — Playfair Display (headings), Satoshi (body) — self-hosted

## Getting Started

```sh
# Install dependencies
npm install

# Start dev server
npm run dev
```

### Sanity Studio

The CMS lives in the `sanity/` directory and deploys separately to `lukecartledge.sanity.studio`.

```sh
# Install Studio dependencies
cd sanity && npm install

# Start Studio dev server
cd sanity && npm run dev

# Build Studio
cd sanity && npx sanity build

# Deploy Studio (interactive — requires auth)
cd sanity && npx sanity deploy
```

## Environment Variables

The Sanity dataset is **public**, so no API token is needed for reads. No `.env` file is required for local development or production builds.

| Variable | Description | Required |
|---|---|---|
| `SANITY_API_TOKEN` | Sanity API token | No (dataset is public) |

The project ID (`c42ibxe8`) and dataset (`production`) are configured directly in `astro.config.mjs` and `sanity/sanity.config.ts`.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server |
| `npm run build` | Build for production (`dist/`) |
| `npm run preview` | Preview production build locally |

## Project Structure

```
├── public/
│   └── fonts/          # Self-hosted Playfair Display + Satoshi
├── sanity/
│   ├── schemaTypes/    # Sanity schema definitions
│   ├── sanity.config.ts
│   └── sanity.cli.ts
├── src/
│   ├── components/     # Reusable Astro components
│   ├── content.config.ts  # Astro content collections (custom Sanity loader)
│   ├── layouts/        # Page layouts (Base, Page)
│   ├── lib/            # Sanity client, image helpers
│   ├── pages/          # Route pages
│   └── styles/         # Global CSS and design tokens
├── astro.config.mjs
└── wrangler.toml       # Cloudflare Pages config
```

## Sanity Schema

| Type | Description |
|------|-------------|
| `siteConfig` | Singleton — title, tagline, bio, social links, featured photos |
| `photo` | Image with hotspot/crop, location, EXIF data, tags |
| `collection` | Photo album — cover photo, photos, location, date |
| `page` | Generic page — title, slug, rich text body, SEO fields |

## License

All photographs are copyright Luke Cartledge. Source code is MIT.
