# NetBots Website Codebase

This project is a Next.js (App Router) website built for NetBots SMC-(PRIVATE)LIMITED, a software architecture and AI agency based in Skardu, Pakistan.

## Commands
- **Run dev server**: `npm run dev`
- **Build production bundle**: `npm run build`
- **Start production server**: `npm run start`
- **Lint code**: `npm run lint`

## Conventions & Rules
- Follow guidelines in `@AGENTS.md`.
- Use Next.js `<Image>` components instead of `<img>` tags.
- Use `.avif` format for all images in `/public/images` and `/public/client-logos`.
- SEO & metadata: Every page layout or page must define descriptive metadata, canonical URLs, and utilize structured JSON-LD schemas where applicable.
- SEO Sitemap: Served dynamically via `src/app/sitemap.ts`. Do not use or rely on static `public/sitemap.xml` files.
