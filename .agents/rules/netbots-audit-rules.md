# NetBots.io — Standing Code Quality Rules

> **Site purpose:** Lead generation + Brand authority for NetBots (SMC-Private Limited), Skardu.
> Every page and blog must serve one or both of these goals. Read the `netbots-content-seo` skill
> before writing any new page or blog content.

---

## Content, Lead Gen & Indexing (check FIRST on every new page/blog)

- **Every page needs a lead capture path** — hero CTA → `LeadCaptureModal` or `/contact`. No page should end without a CTA.

- **Blog posts minimum 800 words** — thin content doesn't rank. Structure: H1 → H2s → FAQ → CTA conclusion.

- **Every blog/page must have ≥ 2 internal links** to other netbots.io pages. Without internal links, Googlebot may not discover the page for weeks.

- **After deploying a new page**, immediately:
  1. Verify it appears in `https://netbots.io/sitemap.xml`
  2. Go to Google Search Console → URL Inspection → "Request Indexing"
  3. Add an internal link from an existing high-traffic page (homepage, /blog, /services)

- **Blog sitemap is automatic** — Sanity publishes → sitemap updates within 1 hour (ISR).
  For instant update: `GET https://netbots.io/api/revalidate?secret=SANITY_REVALIDATE_SECRET`

- **Keyword targeting**: Each page/post must have 1 primary keyword in the H1, 2–4 secondary keywords naturally placed in H2s and body. Never two pages targeting the same primary keyword.

- **Meta description must be unique per page** — 150–160 chars, includes a hook or stat, ends with a soft CTA. Never copy from another page.

- **Local SEO**: Mention "Skardu", "Gilgit-Baltistan", or "Pakistan" naturally at least once per service page and relevant blog posts. This is a core ranking signal for the target audience.

---



These rules apply to **every change** in this repository. Check this list before considering any task done.
They exist to prevent the same class of issues from recurring after the Sep 2026 Lighthouse + GSC audit.

---

## Routing & SEO

- **Every new route must set `alternates.canonical`** in its `Metadata` export pointing to `https://netbots.io/<path>` — no `www`, no trailing slash ambiguity.
  ```ts
  // In layout.tsx or page.tsx:
  export const metadata: Metadata = {
    alternates: { canonical: 'https://netbots.io/new-page' },
  };
  ```

- **Never create a page reachable at two URLs** (with/without www, with/without trailing slash, with query params that don't change content) without canonicalizing one to the other.

- **Any route rename or removal must add a 301 redirect in `next.config.ts`** in the same change — never leave a dangling old URL that 404s.
  ```ts
  // In next.config.ts redirects():
  { source: '/old-path', destination: '/new-path', permanent: true }
  ```

- **Every new indexable page must be added to `sitemap.ts`** in the same PR it's created. If it's dynamic, add its slug generation to the sitemap's dynamic entries block.

- **Write a real, specific meta `description` per page** — never copy-paste from another page. Target: 150–160 chars, action-oriented, matches the search intent of the page's primary keyword.

- **URL query parameters** (`?course=`, `?category=`, etc.) that don't create unique content must either:
  - Have a canonical pointing to the base URL, **OR**
  - Be blocked in `robots.ts` disallow rules.

---

## Images

- **Never use a raw `<img>` tag** — always use `next/image` (`Image` from `'next/image'`).

- **Always set a `sizes` prop** that matches the actual rendered width at each breakpoint. Examples:
  ```tsx
  // Full-width hero image:
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1200px"

  // Small logo/thumbnail (e.g. 120px wide):
  sizes="120px"

  // Card grid (3 columns on desktop, 1 on mobile):
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  ```

- **Don't upload source images larger than their max display resolution.** For a 120px logo, source should be max ~240px (2× for Retina). A 2000px image for a 120px slot wastes network and is what caused the Lighthouse ~107 KiB image waste flag.

- **All images must have meaningful `alt` text** (or `alt=""` if purely decorative). Omitting `alt` fails accessibility and hurts SEO.

---

## JavaScript & Build

- **Keep `tsconfig.json` target at `ES2022` or higher** — never downgrade to ES2017. ES2017 forces Webpack/SWC to polyfill `Array.at`, `Object.hasOwn`, `flatMap`, etc. unnecessarily.

- **Above-the-fold content (hero `<h1>`, hero image) must be server-rendered.** Never gate the LCP element behind a `useEffect`/`useState` render path that requires JS hydration to display.
  - If a section needs animations, use `motion` with `initial` set to a visible state so content renders immediately even if JS hasn't loaded.
  - Prefer Server Components for layout, headers, hero text.

- **Before adding a new client-side `npm` package**, check its bundle size (bundlephobia.com). Prefer server data fetching over client-side libraries when interactivity isn't required.

---

## Accessibility

- **Every interactive element** (`<a>`, `<button>`, icon-only links) must have either:
  - Visible text, **OR**
  - `aria-label="descriptive name"` + `aria-hidden="true"` on any inner decorative SVG/icon.

- **Heading hierarchy must not skip levels.** On any given page/section:
  - `<h1>` → `<h2>` → `<h3>` — in that order.
  - `<h4>` must never appear without a preceding `<h3>` in that section.
  - Footer column group titles should be `<h3>` (not `<h4>`) since they follow the `<h2>` banner.

- **All new text/background color pairings must meet WCAG AA** (4.5:1 for normal text, 3:1 for large text/UI components). Low-contrast areas to always double-check: footers, secondary nav, placeholder text, icon-only states.
  - Tool: https://webaim.org/resources/contrastchecker/
  - The footer background is `#0036ab`. Min WCAG AA text color on it: `rgba(255,255,255,0.87)` or brighter.

---

## Security Headers & CSP

- **Any new third-party script** (analytics, chat widget, A/B test, embed) must be added to `src/middleware.ts` CSP `script-src` allowlist in the **same change** — never use `'unsafe-inline'` as a shortcut fix.

- **Middleware (`src/middleware.ts`) handles nonce-based CSP.** Do not add a separate CSP header in `next.config.ts` headers — they would conflict. Only one place for CSP.

- **New external image domains** must be added to `next.config.ts` → `images.remotePatterns` before using them in `next/image`. Never use `unoptimized` as a workaround.

---

## Sanity Studio

- **Access control** is enforced by `StudioAccessGuard` component. To allow a new email or domain, edit `ALLOWED_EMAILS` / `ALLOWED_DOMAINS` in `src/sanity/components/StudioAccessGuard.tsx`.

- **Primary security** is managed at [sanity.io/manage](https://sanity.io/manage). The access guard is a UI-level supplement, not a replacement.

- **New schema fields** must be added to the Sanity schema files in `src/sanity/schema/` before they appear in the Studio. If data exists in the dataset with a field not in the schema, Studio will show "Unknown field" warnings.

---

## llms.txt / Agentic Browsing

- **Update `src/app/llms.txt/route.ts`** any time:
  - A new major page or product is added
  - Navigation structure changes significantly
  - A key service is renamed or removed

- `llms.txt` must always start with a `# H1` heading and include real, working links to current key pages.

---

## Sitemap Coverage Checklist

When creating a new page, verify all of these before merging:
- `[ ]` `alternates.canonical` set in metadata
- `[ ]` Page added to `src/app/sitemap.ts`
- `[ ]` If replacing an old URL: 301 redirect added to `next.config.ts`
- `[ ]` Meta description is unique and page-specific (not copied)
- `[ ]` All images use `next/image` with `sizes` prop
- `[ ]` All interactive elements have accessible names
- `[ ]` Heading hierarchy is correct
- `[ ]` If any new third-party scripts: added to CSP in `middleware.ts`
- `[ ]` If `llms.txt` coverage affected: updated `route.ts`
