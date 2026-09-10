# netbots.io — Lighthouse Audit Summary

**Scores:** Performance 27 🔴 | Accessibility 90 🟢 | Best Practices 73 🟠 | SEO 100 🟢 | Agentic Browsing 1/3 🔴
**Captured:** Sep 9, 2026 · Mobile emulation (Moto G Power) · Slow 4G

> ⚠️ **Important note before fixing anything:** This run was heavily polluted by Chrome extensions
> (Calendly extension, Immersive Translate, others). They alone account for **~10,000+ ms** of the
> Total Blocking Time and a big chunk of "unused JS". Re-run Lighthouse in **Incognito mode /
> extension-free profile** to get real numbers before trusting the Performance score fully.
> The issues below are still valid, but treat the raw numbers (29s LCP, 102s TBT) as inflated.

---

## 🔴 Performance (27/100) — Priority Fixes

1. **Images — biggest win (~107 KiB wasted)**
   - Client-logo images (`harriot`, `mtp`, `ecoutourism`, `ilyas`, `fjwc`, etc.) are served way
     larger than their display size (e.g. 375×413 shown at 57×63).
   - Fix: use Next.js `<Image>` with correct `sizes`, request smaller `w=` values, increase AVIF
     compression.

2. **Render-blocking CSS (~1.5s)**
   - 3 CSS chunk files block first paint. Fix: inline critical CSS, defer the rest.

3. **HTTP/1.1 everywhere**
   - Site is served over HTTP/1.1, not HTTP/2 or HTTP/3. Fix: enable HTTP/2 on the host/CDN
     (~300ms savings, but also affects everything else since requests can't multiplex).

4. **Legacy JavaScript (~14 KiB wasted)**
   - Build is transpiling modern features (`Array.prototype.at/flat/flatMap`, `Object.hasOwn`,
     etc.) unnecessarily. Fix: target modern browsers in the build config (no legacy polyfills).

5. **Unused JS/CSS**
   - ~15 KiB unused CSS, real (non-extension) unused JS in first-party chunks too.
   - Fix: check for unused component imports/dead code in the Next.js bundle.

6. **LCP element render delay is high (19s of the LCP time, even excluding extensions)**
   - LCP element: `h1.heroTitle`. Fix: make sure the hero text isn't blocked behind
     JS/font loading — render it server-side, avoid client-side-only rendering for above-the-fold
     content.

7. **Cache lifetimes**
   - `Clarity` script has short/no cache TTL. Minor (~10 KiB), low priority.

8. **Third-party scripts**
   - Google Tag Manager (170 KiB) and Microsoft Clarity (25 KiB, ~3s main-thread) are the two real
     (non-extension) third-party costs. Consider loading them `async`/`defer` or delaying until
     after page interactive.

---

## 🟠 Accessibility (90/100)

1. **Low color contrast** — footer links (`footer.Footer-module__footer`) fail contrast ratio.
   Fix: darken/lighten footer link color to meet WCAG AA.
2. **Links without discernible text** — some `<a>` tags have no accessible name (icon-only links
   probably). Fix: add `aria-label` or visible text.
3. **Heading order broken** — `<h4>` used without a preceding `<h1>/<h2>/<h3>` in that section
   (FAQ question, footer group title). Fix: correct heading hierarchy, don't skip levels.
4. **Images missing explicit `width`/`height`** — contributes to CLS risk. Fix: set explicit
   dimensions on `<img>` tags.

---

## 🟠 Best Practices (73/100)

1. **Third-party cookies (4 found)** — all from Microsoft Clarity. Will break under future
   cookie restrictions. Fix: consider Clarity's cookie-less mode or accept the future risk.
2. **CSP is weak/missing**
   - No `Content-Security-Policy` with Trusted Types → flagged **High severity**.
   - `script-src` allows `'unsafe-inline'` pattern issue → Medium severity.
   - Fix: add a proper CSP header (`script-src`, `require-trusted-types-for 'script'`).
3. **Browser console errors** — one from the Calendly extension (ignore, not your code).

---

## 🔴 Agentic Browsing (1/3) — new/experimental category, but easy wins

1. **`llms.txt` doesn't follow recommendations** — file exists but contains no links / isn't
   proper Markdown with an H1. Fix: rewrite `llms.txt` as a real Markdown file with an `# H1`
   heading and links to key pages (services, products, contact, etc.).
2. **Accessibility tree not well-formed** — same root cause as the "links without discernible
   text" issue above. Fixing that will fix this too.
3. ✅ Cumulative Layout Shift = 0 — already passing.

---

## ✅ What's already good — don't touch
- SEO: 100/100
- CLS: 0
- HTTPS, doctype, charset, robots.txt, canonical, hreflang — all pass
- No excessive DOM size issues flagged as blocking

---

## Suggested fix order (highest impact first)
1. Re-run audit in incognito to get clean numbers.
2. Optimize/resize client-logo images (`next/image` sizes).
3. Fix hero `<h1>` render delay (SSR the LCP element, don't block it on client JS).
4. Add HTTP/2, defer render-blocking CSS.
5. Fix footer contrast + link accessible names + heading order.
6. Add proper CSP header.
7. Rewrite `llms.txt`.
8. Modernize JS build target to drop legacy polyfills.
