# Master Prompt — netbots.io Audit Fixes (Next.js)

Paste this prompt into Antigravity along with these two files:
- `netbots_io_audit_issues.md` (Lighthouse: performance/accessibility/SEO/best-practices)
- `netbots_io_seo_audit.md` (Google Search Console: indexing/redirects/canonical)

---

## Context

This is a **Next.js** project (`netbots.io`). I'm attaching two audit reports. I want you to treat
this task in **two separate phases** — do not mix them:

1. **PHASE 1 — One-time fixes**: concrete bugs found in these two reports. Fix them now, once,
   directly in the codebase.
2. **PHASE 2 — Standing rules**: turn the *root causes* behind these bugs into a permanent skill/
   set of rules you follow on **every future change** to this codebase, so the same class of issue
   never comes back — even in code I haven't written yet.

Do not skip Phase 2. Phase 1 fixes today's symptoms; Phase 2 is the actual point of this exercise.

---

## PHASE 1 — Fix these now

Go through `netbots_io_audit_issues.md` and `netbots_io_seo_audit.md` top to bottom and fix each
item. Specifically:

**Redirects & routing**
- Add 301 redirects in `next.config.js` (`redirects()`): `http→https`, `www→non-www` (or agreed
  direction), `/pk` and `/apply-training` → their correct live destinations, `/privacy-policy` →
  `/privacy`.
- Confirm URL-parameter routes (`?course=`, `?category=`) either canonicalize to their base path
  or are excluded via `robots.txt` — don't let them be indexed as separate pages.

**SEO metadata**
- Add/verify `alternates: { canonical: ... }` in the Next.js Metadata API on every page, pointing
  to the single preferred `https://netbots.io/...` URL (no `www`).
- Rewrite meta descriptions for `/services` and any page ranking for `netbot`, `netbot email`,
  `web development`, `cyber security course` with 0 clicks despite impressions.
- Add missing pages (`/pricing`, `/pricing/design/pro`, `/pricing/design/elite`) to
  `sitemap.xml`/`sitemap.ts` once their content is unique (not thin/duplicate).
- Rewrite `llms.txt` as valid Markdown with an `# H1` and real links to key pages.

**Performance**
- Replace any plain `<img>` with `next/image`, with correct `sizes` prop, so client-logo and other
  images stop being served far larger than their display size.
- Move non-critical CSS/JS to be deferred; make sure the hero `<h1>` (LCP element) is server-rendered
  and not blocked behind client-side JS/font loading.
- Update `tsconfig`/build target so the JS build stops transpiling `Array.prototype.at/flat/flatMap`,
  `Object.hasOwn`, etc. for legacy browsers — target modern baseline only.
- Confirm hosting/CDN serves over HTTP/2 or HTTP/3 (this is infra-level, not code — flag to me if it
  needs a hosting change).

**Accessibility**
- Fix footer link color contrast to meet WCAG AA.
- Give every icon-only/empty `<a>` a discernible name (`aria-label` or visible text).
- Fix heading order so `<h4>` never appears without a preceding `<h1>/<h2>/<h3>` in that section.
- Add explicit `width`/`height` (or `next/image` sizing) to all images.

**Security / best practices**
- Add a `Content-Security-Policy` header (with `script-src` + `require-trusted-types-for 'script'`)
  in `next.config.js` headers or middleware.

After each fix, tell me the file(s) you changed and why, in one line per fix.

---

## PHASE 2 — Standing rules (apply to *every* future change, not just this cleanup)

Save these as permanent working rules for this project. From now on, whenever you write or review
any code in this repo — new pages, new components, edits to existing ones — check against this list
**before** considering the task done:

### Routing & SEO (do this for every new page/route)
- Every new route must set `alternates.canonical` in its Metadata export, pointing to the canonical
  `https://netbots.io/...` URL — no exceptions, no `www`.
- Never create a page that's reachable at two different URLs (with/without trailing slash, with/
  without `www`, with query params that don't change content) without canonicalizing one to the other.
- Any new route replacing/renaming an old one must add a 301 redirect in `next.config.js` in the
  same PR — never leave a dangling old URL to 404.
- Every new indexable page must be added to the sitemap generator in the same PR it's created.
- Write a real, specific meta description per page — never leave it as a generic template string
  copied from another page.

### Images (do this for every image added)
- Never use a raw `<img>` tag — always `next/image`.
- Always set a `sizes` prop matching the actual rendered size at each breakpoint; never let the
  browser download a full-resolution image for a 60px-wide thumbnail.
- Always source images already close to their max display resolution — don't upload a 2000px
  image and rely on compression alone.

### JavaScript/build
- Keep `browserslist`/build target set to modern baseline (no IE11-era polyfills). If a dependency
  forces a legacy polyfill back in, flag it — don't silently accept it.
- Before adding a new client-side dependency, check its bundle size; prefer server components /
  server-side data fetching over client JS where the content doesn't need interactivity.
- Anything above-the-fold (hero heading, hero image) must render on the server — never gate it
  behind a client-only `useEffect`/`useState` render path.

### Accessibility (check on every new component)
- Every interactive element (`<a>`, `<button>`, icon links) must have visible text or `aria-label`.
- New heading levels must follow the existing hierarchy on that page — never jump straight to
  `<h4>` without an `<h3>` above it in that section.
- Any new text/background color pairing must meet WCAG AA contrast — check before merging,
  especially in footers/secondary nav where low-contrast is common.
- Every `<img>` gets explicit dimensions (via `next/image`, this is automatic) and meaningful `alt`
  text (or `alt=""` if purely decorative).

### Security headers
- Any new third-party script (analytics, chat widgets, embeds) must be added to the CSP
  `script-src` allowlist in the same change — never rely on `unsafe-inline` as the default fix.

### llms.txt / agentic browsing
- If site navigation or key page structure changes, update `llms.txt` in the same PR so it stays
  accurate (valid Markdown, one `# H1`, real links to current key pages).

---

## How I want you to work going forward

Treat the "Standing rules" section above as a **skill/checklist you self-apply silently** on every
future task in this repo — don't wait for me to paste an audit report again. If a rule would be
violated by something I ask for, tell me before implementing it, rather than implementing it and
hoping I notice later.
