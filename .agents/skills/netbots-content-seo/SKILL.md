---
name: netbots-content-seo
description: >
  Use this skill whenever creating or editing any page, blog post, or route on netbots.io.
  It ensures every piece of content is structured to get indexed fast, rank on multiple keywords,
  and convert visitors into leads — aligned with NetBots' brand identity goals.
---

# NetBots Content & SEO Skill

## Site Purpose (ALWAYS keep this in mind)

NetBots.io exists for **two goals**:
1. **Lead Generation** — every page should have a clear path to booking an audit, contacting us, or registering for a program.
2. **Brand Authority** — position NetBots as Pakistan's #1 technology company in Skardu/Gilgit-Baltistan, and a globally competitive AI + web agency.

Every page, blog post, and route must serve at least one of these goals. If it doesn't, it shouldn't be published.

---

## Fast Indexing Checklist (do this for EVERY new page/blog)

### 1. Canonical + Metadata (Required before publishing)
```tsx
// In layout.tsx or page.tsx — EVERY new route needs this
export const metadata: Metadata = {
  title: '[Specific Page Title] | NetBots',          // 50-60 chars
  description: '[Unique, action-oriented description]', // 150-160 chars
  alternates: { canonical: 'https://netbots.io/[path]' },
  openGraph: {
    title: '...',
    description: '...',
    url: 'https://netbots.io/[path]',
    type: 'article', // or 'website'
    images: [{ url: 'https://netbots.io/og/[page].jpg', width: 1200, height: 630 }],
  },
};
```

### 2. Sitemap (Required same day as publish)
- Add new static routes to `src/app/sitemap.ts` → `staticRoutes` array
- Blog posts are auto-added via Sanity — no manual update needed
- After adding a static page: submit `https://netbots.io/sitemap.xml` to Google Search Console → "Request Indexing"

### 3. Internal Links (Required — minimum 2 per new page)
- Every new page must be linked from at least 2 existing high-traffic pages
- Priority link sources: Homepage, /services, /blog index, /about
- Add a link in the footer nav or related-content sections
- This is how Googlebot discovers the page fast — without internal links, indexing can take weeks

### 4. robots.txt (Check when adding new page types)
- All public pages: allow crawling (default)
- Utility/auth/API routes: disallow in `src/app/robots.ts`
- URL parameter variants (`?course=`, `?category=`): disallow or canonical to base URL

---

## Blog Post SEO Formula (for each new blog)

Every blog published on `/blog/[slug]` must follow this structure:

### Title Formula
```
[Primary Keyword] — [Benefit or Angle] | NetBots
```
Examples:
- "Next.js Performance Optimization — 10 Techniques That Cut Load Time by 60% | NetBots"
- "AI Automation for Small Businesses in Pakistan — A 2026 Guide | NetBots"
- "Web Development Cost in Skardu — What to Expect and How to Save | NetBots"

### Meta Description Formula
```
[Pain/Problem statement] + [What the post delivers] + [CTA hint]
```
Example:
- "Slow websites lose 53% of mobile visitors. This guide covers 10 Next.js optimizations NetBots uses on every client project — with benchmarks. Read time: 8 min."

### Keyword Targeting Strategy
Each blog must target:
1. **Primary keyword** (1): high-intent, specific — e.g. "web development company skardu"
2. **Secondary keywords** (2-4): related long-tail — e.g. "affordable website development pakistan", "next.js agency gilgit baltistan"
3. **Brand keyword**: always mention "NetBots" naturally at least once per 400 words
4. **Local keyword**: include Skardu/Gilgit-Baltistan/Pakistan where natural

### Blog Post Structure (for Google's featured snippets)
```
H1: [Title with Primary Keyword]
  Intro paragraph (150 words): Problem → Solution → What reader gets
  
H2: [Section with Secondary Keyword]
  Content (200-400 words per H2)
  
H2: [Another section]
  - Use bullet lists for scannable content (Google loves lists for snippets)
  - Include statistics or specific numbers
  - Add internal links (minimum 2 per post)
  - Add 1 external authoritative link per H2
  
H2: Frequently Asked Questions
  Q: [Question with keyword]
  A: [Direct answer — this feeds FAQ schema and Google SERP snippets]
  
H2: Conclusion + CTA
  Recap + "Book a free audit with NetBots" or "Contact us to get started"
```

### Schema Markup (add to blog post pages)
Blog posts must include:
- `Article` schema with `author`, `datePublished`, `dateModified`
- `BreadcrumbList` schema
- `FAQPage` schema if post has FAQ section

---

## Multi-Keyword Ranking Strategy

### Keyword Clusters for NetBots
Group keywords into clusters — one page per cluster:

| Cluster | Primary Page | Keywords |
|---------|-------------|----------|
| Web Dev Pakistan | `/services/software-dev` | web development company skardu, software house gilgit baltistan, next.js agency pakistan |
| AI Automation | `/services/ai-automation` | AI automation agency pakistan, agentic AI workflows, LLM integration skardu |
| Digital Marketing | `/services/marketing` | digital marketing agency skardu, SEO company gilgit baltistan, social media marketing pakistan |
| Training | `/training` | IT training skardu, computer course gilgit baltistan, web development course pakistan |
| Founder Lab | `/register/the-founder-lab-masterclass` | founder lab masterclass, saqlain shah masterclass, startup training skardu |
| Blog (authority) | `/blog/*` | tech news pakistan, web dev tutorials, AI guides, agency playbooks |

### Rules:
- **1 page per keyword cluster** — never create two pages targeting the same primary keyword
- **Blog posts** should target long-tail keywords the service pages don't cover
- **Never stuff** — use keywords naturally, once in H1, once in first paragraph, once in a H2, naturally elsewhere

---

## Lead Generation Page Requirements

Every page must have at least ONE of these:

### Primary CTAs (pick the most relevant):
1. **"Book Your Free Audit"** → triggers `LeadCaptureModal`
2. **"Contact Us"** → links to `/contact`
3. **"Register Now"** → links to `/register/the-founder-lab-masterclass`
4. **"Get a Quote"** → triggers `LeadCaptureModal`

### CTA Placement Rules:
- Hero section: always has a primary CTA button
- Mid-page: at least 1 CTA after the main value proposition
- End of page/blog: always close with a CTA — never let a page end without one
- Footer: global CTA banner ("Book Your Free Audit") — already present

### Trust Signals (include on every service/landing page):
- Client count or logos
- A specific result/stat (e.g. "60% faster load time", "3x more leads")
- Location mention (Skardu, Gilgit-Baltistan, Pakistan — builds local credibility)
- Company legal name (Net Bots SMC-Private Limited) on about/contact pages

---

## Brand Identity Guidelines (for all content)

### Voice & Tone:
- **Confident but not arrogant** — "We engineer solutions" not "We're the best"
- **Technical credibility** — use specific tech (Next.js, RAG, LLM, MERN) not vague terms
- **Local pride + global ambition** — "Based in Gilgit-Baltistan, serving clients globally"
- **Action-oriented** — every section should push toward the next step

### Brand Keywords to Use Naturally:
- "NetBots" (brand name — always capital N and B)
- "Net Bots (SMC-Private) Limited" (legal name — on formal pages)
- "Gilgit-Baltistan" / "Skardu" (local identity)
- "enterprise-grade" (quality signal)
- "engineered to scale" (brand tagline)

### What NOT to write:
- ❌ Generic claims: "best company", "top quality" without proof
- ❌ Copied meta descriptions from other pages
- ❌ Thin content under 800 words for blog posts
- ❌ Posts without a clear CTA at the end
- ❌ Pages that don't link back to `/contact` or `/services`

---

## New Blog Post Publish Checklist

Before publishing any blog post in Sanity Studio:

```
[ ] Title has primary keyword (50-60 chars)
[ ] Meta description is unique, 150-160 chars, has a hook
[ ] Slug is URL-friendly: no caps, no spaces (e.g. web-development-skardu-guide)
[ ] Body has: H1 → H2s → FAQ section → CTA conclusion
[ ] At least 2 internal links to other netbots.io pages
[ ] Author is set (Saqlain Shah or team member)
[ ] Featured image uploaded with descriptive alt text
[ ] publishedAt date is set correctly
[ ] Category is set (matches existing categories)
[ ] Tags added (3-5 relevant tags)
```

After publishing:
```
[ ] Visit https://netbots.io/sitemap.xml — confirm new slug appears (within 1 hour)
[ ] Go to Google Search Console → URL Inspection → paste blog URL → "Request Indexing"
[ ] Share on social (LinkedIn, Instagram) with a link — social signals accelerate crawling
[ ] Add an internal link to this post from an existing high-traffic page (homepage or /blog)
```

---

## New Service/Landing Page Checklist

```
[ ] Unique H1 with primary keyword
[ ] canonical set in layout.tsx metadata
[ ] Added to sitemap.ts staticRoutes
[ ] 301 redirect added if replacing an old URL
[ ] Minimum 2 internal links from existing pages
[ ] Hero CTA present
[ ] Mid-page CTA present  
[ ] Conclusion CTA present
[ ] Schema markup (BreadcrumbList + relevant type)
[ ] Google Search Console → Request Indexing after deploy
[ ] Added to llms.txt Key Pages section if major page
```

---

## Indexing Acceleration Tactics

When a new page/blog is deployed:
1. **Request Indexing in GSC** (most important — gets indexed in hours not weeks)
2. **Share on socials** — Googlebot follows links from indexed pages
3. **Internal link immediately** — add a link from the homepage or /blog to the new content
4. **Ping sitemap**: `https://www.google.com/ping?sitemap=https://netbots.io/sitemap.xml`
