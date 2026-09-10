# NetBots Blog Automation API & E-E-A-T SEO Guidelines

**Target Audience:** AI Agents, Automation Scripts, Content Generators
**Purpose:** This document provides the complete API specification, authentication details, and strict content guidelines required to generate and publish highly SEO-optimized, Google E-E-A-T compliant blog articles for NetBots.

---

## 1. API Endpoint Specification

The Blog Automation API allows publishing articles directly to Sanity CMS (defaulting to `draft` mode for safety).

*   **Endpoint:** `https://netbots.io/api/blog/publish` (Production) | `http://localhost:3000/api/blog/publish` (Local)
*   **Method:** `POST`
*   **Content-Type:** `application/json`

### Authentication
Include the API Key using **ONE** of the following methods:
1.  **Header (Recommended):** `x-api-key: <BLOG_API_KEY>`
2.  **Header:** `Authorization: Bearer <BLOG_API_KEY>`
3.  **Query Parameter:** `?apiKey=<BLOG_API_KEY>`

*(Note: The `BLOG_API_KEY` is securely stored in the `.env` / environment variables of the deployment)*

### CORS & Protocol
*   The API supports cross-origin requests (`Access-Control-Allow-Origin: *`).
*   It functions securely over both HTTP (for local automation scripts) and HTTPS.
*   Preflight `OPTIONS` requests are fully supported.

---

## 2. Payload Schema & Fields

Construct the JSON payload exactly according to this schema.

### Required Fields
| Field | Type | Description |
| :--- | :--- | :--- |
| `title` | `string` | The H1 title of the article. Max 100 characters. Keep it punchy, keyword-rich, and relevant. |
| `excerpt` | `string` | A compelling meta description/summary. Max 200 characters. Used for SEO and blog card snippets. |
| `category` | `string` | MUST be one of: `"Web Architecture"`, `"AI & Automation"`, `"Tech Entrepreneurship"`, `"Cloud & DevOps"`, `"Design & UI/UX"`. |
| `paragraphs` | `string[]` | The main body of the article. **Uses Markdown.** See "Formatting the Content" below. |

### Optional Configuration Fields
| Field | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `draft` | `boolean` | `true` | When `true`, saves to Sanity as a Draft (invisible on live site until published via Studio). When `false`, publishes immediately. |
| `slug` | `string` | Auto-generated | Custom URL slug. Auto-generated from `title` if omitted. |
| `tags` | `string[]` | `[]` | Array of 3-5 relevant keywords (e.g., `["AI Automation", "Next.js", "Pakistan"]`). |
| `coverImageUrl` | `string` | None | URL to an external hero image (e.g., Unsplash). |
| `featured` | `boolean` | `false` | If `true`, pins the article to the homepage hero banner. |
| `youtubeUrl` | `string` | None | YouTube video URL to embed automatically after the first paragraph. |

### SEO Overrides (Optional but Recommended)
| Field | Type | Description |
| :--- | :--- | :--- |
| `seo.metaTitle` | `string` | Overrides the `<title>` tag for search engines. |
| `seo.metaDescription` | `string` | Overrides the `<meta name="description">` tag. |
| `seo.keywords` | `string[]` | Specific SEO keywords. |

---

## 3. E-E-A-T Fields (CRITICAL FOR SEO)

Google ranks content based on **Experience, Expertise, Authoritativeness, and Trustworthiness (E-E-A-T)**. To maximize SEO, your generated content MUST populate these fields within the `eeat` object.

| E-E-A-T Pillar | JSON Field | Type | Description & AI Instruction |
| :--- | :--- | :--- | :--- |
| **Experience** | `eeat.keyTakeaways` | `string[]` | 3-4 bullet points summarizing the article's core value (TL;DR). Renders prominently at the top. |
| **Experience** | `eeat.experienceHighlight` | `string` | A strong, first-hand claim, case study result, or bold statement (e.g., *"We reduced server costs by 40% using this specific caching strategy."*). |
| **Expertise** | `eeat.reviewedBy` | `object` | The technical reviewer. Standard default: <br>`{ "name": "Saqlain Shah", "role": "Founder & CEO, NetBots", "credentials": "Full-Stack Engineer · AI Systems Architect", "linkedIn": "https://www.linkedin.com/in/syedsaqlainabbas110" }` |
| **Authoritative** | `eeat.citations` | `object[]` | Array of external, high-authority references backing up claims. Schema: `{ "title": "...", "url": "...", "publisher": "...", "year": "..." }`. Cite official docs, research papers, or reputable tech blogs. |
| **Trust** | `eeat.faqs` | `object[]` | 2-4 Frequently Asked Questions. Schema: `{ "question": "...", "answer": "..." }`. **Highly effective for winning Google Featured Snippets.** |

---

## 4. Content Generation Guidelines (For AI Agents)

When writing the content (the `paragraphs` array), adhere to these strict rules:

### A. Formatting the Content (`paragraphs` array)
The system parses specific markdown prefixes in the string array to render rich HTML.
*   **H2 Headers:** Prefix string with `## ` (e.g., `"## The Role of AI in 2026"`)
*   **H3 Headers:** Prefix string with `### `
*   **Blockquotes:** Prefix string with `> ` (Use for emphasis, key quotes, or important stats)
*   **Bullet Lists:** Prefix string with `- ` or `* `
*   **Numbered Lists:** Prefix string with `1. `
*   **Normal Text:** Just the raw string without prefixes.

**Example `paragraphs` Array:**
```json
"paragraphs": [
  "Artificial Intelligence is rapidly transforming how businesses operate in Pakistan.",
  "## Core Benefits of AI Automation",
  "- Reduces manual data entry by 80%",
  "- Improves customer response times",
  "> Organizations adopting AI scale 3x faster than traditional competitors."
]
```

### B. SEO & Brand Alignment (The NetBots Voice)
*   **Audience:** B2B tech leaders, startup founders, and enterprise IT managers (especially in Pakistan / Gilgit-Baltistan context when relevant).
*   **Tone:** Authoritative, technical, concise, and premium. Avoid fluff.
*   **Value Proposition:** Always tie technical concepts back to business value (ROI, cost reduction, speed, scalability). Position NetBots as the expert implementation partner.
*   **Structure:**
    1.  **Hook:** Start strong. Address a specific pain point.
    2.  **Body:** Use H2s and bullet points for scannability.
    3.  **Proof:** Back up claims using the `experienceHighlight` and `citations`.
    4.  **Call to Action (CTA):** Conclude by inviting the reader to contact NetBots for a technical audit or implementation.

---

## 5. Complete Example Payload

```json
{
  "title": "Optimizing Next.js 16 for Enterprise Applications",
  "excerpt": "Learn how to leverage Next.js 16 Partial Prerendering and React Server Components to reduce TTFB by 60% and improve Core Web Vitals.",
  "category": "Web Architecture",
  "draft": true,
  "tags": ["Next.js", "Performance", "React", "NetBots"],
  "paragraphs": [
    "Enterprise web performance directly impacts revenue. Slow load times lead to higher bounce rates.",
    "## Partial Prerendering (PPR)",
    "Next.js 16 introduces PPR, allowing you to serve a static shell instantly.",
    "- Faster Time to First Byte (TTFB)",
    "- Improved Core Web Vitals",
    "> Implementing PPR increased our client's conversion rate by 15%."
  ],
  "eeat": {
    "keyTakeaways": [
      "PPR combines static and dynamic rendering.",
      "RSCs reduce client-side JavaScript bundles."
    ],
    "experienceHighlight": "Deployed these optimizations for a Pakistani e-commerce client, achieving a perfect 100 Lighthouse performance score.",
    "reviewedBy": {
      "name": "Saqlain Shah",
      "role": "Founder & CEO, NetBots",
      "credentials": "Full-Stack Engineer · Next.js Expert",
      "linkedIn": "https://www.linkedin.com/in/syedsaqlainabbas110"
    },
    "citations": [
      {
        "title": "Next.js 16 Release Notes",
        "url": "https://nextjs.org/blog/next-16",
        "publisher": "Vercel",
        "year": "2025"
      }
    ],
    "faqs": [
      {
        "question": "What are Core Web Vitals?",
        "answer": "Metrics introduced by Google to measure user experience, including LCP, FID, and CLS."
      }
    ]
  }
}
```
