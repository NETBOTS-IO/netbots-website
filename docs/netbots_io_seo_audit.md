# netbots.io — Google Search Console Audit Summary

**Generated:** Sep 10, 2026 · **Sitemap pages:** 22 · **Internal links:** 191
**Clicks (28d):** 70+ · **Impressions:** 1,400+ · **Top audience:** Pakistan (60%) · **Top query:** "netbots"

---

## 🔴 Critical Issues

### 1. 404 Not Found
| URL | Last Crawled |
|---|---|
| `/pk` | Aug 25, 2026 |
| `/apply-training` | Jul 31, 2026 |

> Note: `/pk` and `/apply-training` are still getting real clicks (7 and 1) — don't just delete them,
> **redirect** them to the right live page (e.g. `/pk` → homepage or a `/pk` locale page,
> `/apply-training` → `/training` or `/register/the-founder-lab-masterclass`).

**Fix:** Add 301 redirects. Update any internal links still pointing to these old URLs. Only remove
from sitemap if truly gone.

### 2. Not Redirecting to HTTPS/canonical host
| URL | Issue |
|---|---|
| `http://netbots.io/` | No forced HTTPS redirect |
| `http://www.netbots.io/` | No forced HTTPS redirect |

**Fix:** Force **301** `http://` → `https://` and `www.` → non-`www` (or vice versa — pick one and
set it as the preferred domain in GSC).

### 3. Duplicate content / canonical tag issues
| URL |
|---|
| `https://www.netbots.io/` |
| `https://netbots.io/portfolio` |
| `https://www.netbots.io/careers` |
| `https://www.netbots.io/contact` |

**Fix:** Every page needs a `<link rel="canonical">` pointing to the single preferred version
(`https://netbots.io/...`, no `www`). Set preferred domain in Search Console.

### 4. Crawled but not indexed
| URL | Priority |
|---|---|
| `/site.webmanifest` | Low (expected — not a real page) |
| `/images/netbots-logo-original.avif` | Low (expected — image, not a page) |
| `/pricing` | Medium |
| `/pricing/design/pro` | Medium |
| `/pricing/design/elite` | Medium |
| `/contact?course=Artificial Intelligence` | Low (URL param — duplicate of `/contact`) |
| `/privacy-policy` | Medium (duplicate of `/privacy` in sitemap?) |
| `/tours?category=Cultural Tours` | Low (URL param duplicate) |

**Fix:**
- `/pricing*` pages: need thin/duplicate content fixed, more internal links, and to actually be
  listed in `sitemap.xml` (they're not in the current sitemap).
- URL-parameter pages (`?course=...`, `?category=...`): add canonical tag pointing to the clean
  base URL, or block via `robots.txt` if not meant to be indexed separately.
- `/privacy-policy` — likely a duplicate/old path of `/privacy`. Redirect it.

---

## ✅ What's working
- Sitemap: all pages have `lastmod`, sensible priority/frequency values.
- Internal linking: solid distribution (191 links, homepage + main nav pages all ~15 links each).
- Brand search ("netbots") performing well: 41 clicks / 538 impressions.
- Pakistan is 43% of clicks — strong local relevance already.

## ⚠️ Opportunities
- **High impressions, 0 clicks** queries: `netbot`, `netbot email`, `computer`, `net bot`,
  `web development`, `cyber security course` → meta titles/descriptions aren't compelling enough
  for these queries. Rewrite meta descriptions to match search intent.
- **`/services`**: 159 impressions but 0 clicks — check its title/meta description.
- Local SEO: India is already 21% of clicks with no dedicated content — opportunity to expand.

---

## Action Plan

### 🔴 Immediate (24–48h)
- [ ] Set preferred domain (non-www, https) in Google Search Console
- [ ] Add 301: `http://` → `https://`, `www` → non-www
- [ ] Fix/redirect `/pk` and `/apply-training` 404s

### 🟡 Short-term (1–2 weeks)
- [ ] Add canonical tags site-wide, pointing to `https://netbots.io/...`
- [ ] Add `/pricing*` pages to sitemap once content is unique
- [ ] Canonicalize or `noindex` URL-parameter pages (`?course=`, `?category=`)
- [ ] Redirect `/privacy-policy` → `/privacy`
- [ ] Rewrite meta descriptions for high-impression/low-click pages (`/services`, `netbot*` queries)

### 🟢 Long-term (1–3 months)
- [ ] Pakistan/India-specific landing content
- [ ] More training/course landing pages
- [ ] Blog/content section for organic growth
