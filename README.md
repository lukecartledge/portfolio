# lukecartledge.com

Personal photography portfolio built with [Astro](https://astro.build) and [Sanity](https://www.sanity.io), deployed on [Cloudflare Pages](https://pages.cloudflare.com).

## Stack

- **Astro v5** — Static site generation, zero client-side JavaScript
- **Sanity** — Headless CMS for photography and site content
- **Cloudflare Pages** — Hosting and CDN
- **Vanilla CSS** — Custom properties, scoped styles, no frameworks

## Getting Started

```sh
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start dev server
npm run dev
```

## Environment Variables

| Variable | Description | Required |
|---|---|---|
| `SANITY_PROJECT_ID` | Sanity project ID | Yes |
| `SANITY_DATASET` | Sanity dataset name | Yes (default: `production`) |
| `SANITY_API_TOKEN` | Sanity API token | Optional (for private datasets) |

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server |
| `npm run build` | Build for production (`dist/`) |
| `npm run preview` | Preview production build locally |

## Project Structure

```
src/
├── components/     # Reusable Astro components
├── layouts/        # Page layouts (Base, Page)
├── lib/            # Sanity client, image helpers
├── pages/          # Route pages
└── styles/         # Global CSS and utilities
```

## License

All photographs are copyright Luke Cartledge. Source code is MIT.