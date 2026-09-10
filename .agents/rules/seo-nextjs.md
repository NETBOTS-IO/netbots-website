---
# NetBots.io — Technical SEO Rules for Next.js (App Router)
# Location: .agents/rules/seo-nextjs.md
# Generated: 2026-09-10 | Source: docs/technical-seo-audit.md
#
# READ THIS FILE before finishing any task that touches routing, metadata,
# images, scripts, middleware, or redirects in this repo.
---

## Rule: new-route-metadata
**Applies when:** Creating any new page route (`src/app/**/page.tsx` or `layout.tsx`)  
**Do:**
```tsx
// Every new route ships with its own layout.tsx (or page-level generateMetadata) containing:
export const metadata: Metadata = {
  title: '[Specific Title] | NetBots',          // 50–60 chars, includes primary keyword
  description: '[Unique description]',           // 150–160 chars, unique per page
  alternates: { canonical: 'https://netbots.io/[path]' },
  openGraph: { url: 'https://netbots.io/[path]', type: 'website', images: [{ url: 'https://netbots.io/og-image.jpg', width: 1200, height: 630 }] },
};
```
**Don't:** Rely on the root layout metadata — it has no canonical and generic title/description. Every page that inherits root metadata appears as duplicate content to Google.  
**Why:** Pages without unique title + canonical cannot rank individually — they compete with the homepage and each other for the same query.

---

## Rule: new-route-sitemap
**Applies when:** Creating any new public-facing route  
**Do:** Add the route to `src/app/sitemap.ts` `staticRoutes` array in the same PR/commit as the new page, with appropriate `priority` and `freq`:
```ts
{ path: '/new-page', priority: 0.8, freq: 'weekly' as const },
```
Then after deploy: Google Search Console → URL Inspection → "Request Indexing".  
**Don't:** Add a page without a sitemap entry, or add a sitemap entry for a page that doesn't exist yet (causes GSC "404 not found in sitemap" errors).  
**Why:** Sitemap is how Google discovers new pages quickly. Missing entries = delayed indexing by days/weeks.

---

## Rule: ssr-first-for-indexable-content
**Applies when:** Creating or editing any page whose H1, body text, or primary content needs to rank  
**Do:** Keep the page file (`page.tsx`) as a Server Component (no `'use client'`). Push interactive state (modals, forms, accordions) into small leaf client components:
```tsx
// page.tsx — Server Component, renders H1 and content in initial HTML
export default function ServicesPage() {
  return (
    <>
      <h1>Web Development Services in Skardu</h1>  {/* SSR — crawler sees this */}
      <p>NetBots builds...</p>                      {/* SSR — crawler sees this */}
      <ModalCTA />                                  {/* Client leaf — only the button */}
    </>
  );
}
// ModalCTA.tsx — 'use client', handles only the modal state
```
**Don't:** Put `'use client'` at the top of a page file when the only reason is a modal button or animation. Use `useParams()` in a page (use async `params` prop instead).  
**Why:** In Next.js App Router, `'use client'` pages ARE server-rendered for initial HTML — but using `useParams()` or putting the entire page in a client boundary prevents `generateStaticParams` and `generateMetadata` from working, meaning no unique title/canonical/SSG for that route.

---

## Rule: dynamic-routes-use-server-params
**Applies when:** Creating any dynamic route (`[slug]`, `[id]`, `[[...catchall]]`)  
**Do:**
```tsx
// page.tsx — no 'use client', reads params as async server prop
export async function generateStaticParams() {
  return knownSlugs.map((slug) => ({ slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return { title: `${data[slug].title} | NetBots`, alternates: { canonical: `https://netbots.io/services/${slug}` } };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!data[slug]) notFound(); // 404 unknown slugs — never fall back to default content
}
```
**Don't:** Use `useParams()` in a dynamic route page — it forces `'use client'` and disables `generateStaticParams` + `generateMetadata`.  
**Why:** Without `generateMetadata`, all slug variants share the root title. Without `generateStaticParams`, Next.js can't pre-render the pages. Without `notFound()`, any URL renders content, creating duplicate/thin pages.

---

## Rule: redirects-must-be-301
**Applies when:** Renaming, removing, or moving any existing public URL  
**Do:** Add a `permanent: true` redirect in `next.config.ts` redirects array in the same commit:
```ts
// next.config.ts
{ source: '/old-path', destination: '/new-path', permanent: true }, // 301
```
**Don't:** Use `redirect()` from `next/navigation` for permanent URL changes — it issues a 307 (temporary), which does not pass PageRank to the new URL. Also don't let pages 404 without a redirect when they previously existed.  
**Why:** 301s transfer link equity (PageRank) to the destination. 307s do not. Backlinks to the old URL lose all value if the redirect is temporary.

---

## Rule: images-use-next-image
**Applies when:** Adding any image to a page or component  
**Do:**
```tsx
import Image from 'next/image';
// Always provide width, height, alt, and sizes for responsive images:
<Image
  src="/path/to/image.jpg"
  alt="Descriptive alt text — NetBots [what the image shows]"
  width={1200}
  height={630}
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```
**Don't:** Use `<img>` tags directly, omit `sizes` on responsive images, or use empty/generic alt text like `alt=""` on content images (decorative images may use `alt=""`).  
**Why:** `next/image` handles lazy loading, modern formats (AVIF/WebP), and proper sizing — all of which affect Core Web Vitals (LCP), which is a Google ranking factor.

---

## Rule: third-party-scripts-need-csp-update
**Applies when:** Adding any new third-party script (analytics, chat, ads, maps, etc.)  
**Do:** Add the script's domain to `src/proxy.ts` `buildCsp()` function in the same commit:
```ts
// In proxy.ts buildCsp():
`script-src 'self' 'nonce-${nonce}' ... https://new-script-domain.com`,
`connect-src 'self' ... https://new-script-domain.com`,
```
Then test: open DevTools Console → look for CSP violation errors.  
**Don't:** Add a `<Script>` tag without updating the CSP. The script will be silently blocked in production, breaking analytics or functionality.  
**Why:** The nonce-based CSP in `proxy.ts` blocks all scripts not explicitly allowed. A script that fails to load = broken analytics = no data for SEO decisions.

---

## Rule: no-csp-in-next-config-headers
**Applies when:** Touching `next.config.ts` security headers  
**Do:** Keep HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy in `next.config.ts` headers.  
**Don't:** Add `Content-Security-Policy` to `next.config.ts` headers — the CSP is handled by `src/proxy.ts` with per-request nonces. Two CSP headers on one response causes conflicts where browsers apply the most restrictive combination.  
**Why:** Duplicate CSP headers can block legitimate scripts (Framer Motion, Sanity Studio) and create hard-to-debug issues.

---

## Rule: robots-sitemap-review-on-routing-changes
**Applies when:** Adding new route types (API endpoints, auth pages, preview pages, admin sections)  
**Do:** Check `src/app/robots.ts` — does the new route need to be in `disallow`? Check `src/app/sitemap.ts` — does the new public route need to be added?  
**Don't:** Add a new `/admin` or `/api/` route without adding it to `robots.ts` disallow. Don't forget to remove sitemap entries when routes are deleted.  
**Why:** Crawlers indexing internal API routes wastes crawl budget. Sitemap pointing to 404s damages GSC health metrics.

---

## Rule: structured-data-for-new-content-types
**Applies when:** Adding a new page type (service, product, FAQ, blog post, event, job posting)  
**Do:** Add the appropriate JSON-LD schema in the Server Component (layout or page), not inside a client component:
```tsx
// In layout.tsx or page.tsx (Server Component)
import { JsonLd } from '@/components/structured-data/JsonLd';
// Use existing helpers in src/lib/schema/schema-helpers.ts
const schema = getProfessionalServiceSchema(title, description, url);
return <><JsonLd data={schema} />{children}</>;
```
Available schema types: `Organization`, `LocalBusiness`, `ProfessionalService`, `BreadcrumbList`, `FAQPage`, `Article`.  
**Don't:** Inject JSON-LD inside a `'use client'` component — Google's structured data crawler reads from initial HTML. Client-injected schema may not generate rich results.  
**Why:** Structured data enables rich results (FAQ accordions, star ratings, breadcrumbs in SERPs) — directly increases click-through rate from search.

---

## Rule: canonical-per-page-not-root
**Applies when:** Any page, layout, or metadata export  
**Do:** Set `alternates: { canonical: 'https://netbots.io/exact-path' }` in each page's own layout or `generateMetadata`.  
**Don't:** Set a root-level canonical in `src/app/layout.tsx` — it gets inherited by all pages and overrides their specific canonicals, making every page appear to canonicalize to the homepage.  
**Why:** Pages without a self-referencing canonical may be de-duplicated by Google against the homepage, preventing them from ranking individually.

---

## Rule: no-keyword-stuffing
**Applies when:** Editing root layout metadata or any page metadata  
**Do:** Use 3–6 focused, relevant keywords in `metadata.keywords` (though Google ignores this tag, Bing may use it):
```ts
keywords: ['web development skardu', 'AI automation Pakistan', 'NetBots'],
```
**Don't:** Add large keyword arrays (50+) with variations, superlatives ("top 1 best"), or repetitions. This is a Bing spam signal and adds unnecessary HTML payload.  
**Why:** Google has not used `<meta keywords>` since 2009. Bing uses it as a spam signal if stuffed.

---

## Rule: proxy-middleware-crawler-safe
**Applies when:** Editing `src/proxy.ts` (formerly middleware.ts)  
**Do:** Before merging any change to `proxy.ts`, ask: "Could this redirect or block Googlebot?" Specifically check: geo-redirects (Googlebot crawls from the US), bot-detection logic, auth checks on public routes.  
**Don't:** Add redirects that fire based on `User-Agent` headers for search engine bots, or that block requests without a session cookie (public pages must be accessible without login).  
**Why:** If `proxy.ts` redirects Googlebot away from your public pages, those pages will not be indexed — the middleware runs before the page renders.

---

## Rule: staging-noindex
**Applies when:** Any public deployment that is not the production site  
**Do:** The root layout already has an environment guard. Ensure preview/staging deployments set `VERCEL_ENV` to something other than `'production'`. Also verify at deploy time that `robots.txt` in non-prod envs returns `Disallow: /`.  
**Don't:** Allow a staging or preview URL to be publicly accessible without noindex. Google may index preview content and create duplicate content issues.  
**Why:** Indexed staging URLs with identical content to production trigger duplicate content penalties.

---

## Rule: og-images-must-exist
**Applies when:** Adding or updating metadata with `openGraph.images` or `twitter.images`  
**Do:** Verify the image file exists in `public/` before shipping:
```bash
Test-Path "public\og-image.jpg"  # Must return True
```
Use the generated `public/og-image.jpg` (1200×630) and `public/twitter-image.jpg` as defaults. Page-specific OG images go in `public/og/[page-name].jpg`.  
**Don't:** Reference OG image paths that don't exist — they return 404 silently, breaking all social media preview cards.  
**Why:** Broken OG images = no preview when links are shared on LinkedIn, WhatsApp, Twitter — directly hurts CTR from social traffic.

---

## Rule: internal-links-for-new-pages
**Applies when:** Publishing any new page  
**Do:** Add at least 2 internal links to the new page from existing high-traffic pages (homepage, /blog, /services, footer nav). For service sub-pages, add to `src/lib/content.ts` footer navigation. After deploy, also add an internal link from a recent blog post.  
**Don't:** Launch a page with no internal links pointing to it. Such pages are "orphaned" — Googlebot may never discover them via crawling (only via sitemap).  
**Why:** Internal links are how PageRank flows through the site. Orphaned pages have near-zero authority and almost never rank.

---

## How to use this file

Before finishing ANY task that touches routing, metadata, images, third-party scripts,
middleware, or redirects in this repo, re-read the relevant rule(s) above and self-check your
change against them BEFORE presenting it as done. If a user request would violate one of these
rules, say so and propose the compliant alternative instead of silently implementing the
violation. Update this file whenever a new technical-SEO issue is found in review — treat it as
living documentation, not a one-time checklist.
