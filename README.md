# lukecartledge.com

Personal photography portfolio — live at [lukecartledge.com](https://lukecartledge.com). Built with [Astro](https://astro.build) and [Contentful](https://www.contentful.com), deployed on [Cloudflare Pages](https://pages.cloudflare.com).

## Stack

- **Astro v6** — Static site generation, zero client-side JavaScript
- **Contentful** — Headless CMS for photography and site content
- **Cloudflare Pages** — Hosting and CDN
- **Vanilla CSS** — Custom properties, scoped styles, no frameworks
- **Fonts** — Raleway (headings), Poppins (body) — self-hosted woff2

## Getting Started

```sh
# Install dependencies
npm install

# Start dev server
npm run dev
```

## Environment Variables

Copy `.env.example` to `.env` and fill in your Contentful credentials.

| Variable                    | Description               | Required |
| --------------------------- | ------------------------- | -------- |
| `CONTENTFUL_SPACE_ID`       | Contentful space ID       | Yes      |
| `CONTENTFUL_DELIVERY_TOKEN` | Contentful delivery token | Yes      |

## Scripts

| Command           | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start local dev server           |
| `npm run build`   | Build for production (`dist/`)   |
| `npm run preview` | Preview production build locally |
| `npm run lint`    | Prettier + ESLint + astro check  |

## Project Structure

```
├── public/
│   └── fonts/             # Self-hosted Raleway + Poppins
├── src/
│   ├── components/        # Reusable Astro components
│   ├── content.config.ts  # Astro content collections (custom Contentful loader)
│   ├── layouts/           # Page layouts (Base, Page)
│   ├── lib/               # Contentful client, image helpers
│   ├── pages/             # Route pages
│   └── styles/            # Global CSS and design tokens
├── astro.config.mjs
└── wrangler.toml          # Cloudflare Pages config
```

## Content Types

| Type         | Description                                                    |
| ------------ | -------------------------------------------------------------- |
| `siteConfig` | Singleton — title, tagline, bio, social links, featured photos |
| `photo`      | Image with location, EXIF data, tags, collections              |
| `collection` | Photo album — cover photo, photos, location, date              |
| `page`       | Generic page — title, slug, rich text body, SEO fields         |

## License

All photographs are copyright Luke Cartledge. Source code is MIT.
