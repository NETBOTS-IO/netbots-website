import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@sanity/client';
import { revalidatePath, revalidateTag } from 'next/cache';

// ─────────────────────────────────────────────────────────────────────────────
// CORS Headers — attached to EVERY response so local PC scripts never get
// blocked regardless of protocol (HTTP or HTTPS) or origin.
// ─────────────────────────────────────────────────────────────────────────────
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-KEY, x-api-key, Accept',
  'Access-Control-Max-Age': '86400',
};

function corsResponse(body: any, init: ResponseInit = {}) {
  const headers = new Headers(init.headers);
  for (const [k, v] of Object.entries(CORS_HEADERS)) {
    headers.set(k, v);
  }
  return NextResponse.json(body, { ...init, headers });
}

// ─────────────────────────────────────────────────────────────────────────────
// Sanity write client (server-side only — uses write token)
// ─────────────────────────────────────────────────────────────────────────────
const sanityWriteClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'utkskkc8',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// ─────────────────────────────────────────────────────────────────────────────
// Next.js 16: revalidateTag requires a second argument (profile)
// ─────────────────────────────────────────────────────────────────────────────
const CACHE_PROFILE = {};

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Estimate word count → reading time */
function estimateReadTime(paragraphs: string[]): string {
  const wordCount = paragraphs.join(' ').split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} min read`;
}

/** Parse Markdown-flavoured paragraph array into Sanity PortableText blocks */
function markdownToPortableText(paragraphs: string[]): any[] {
  const body: any[] = [];
  let keyIdx = 1;

  for (const p of paragraphs) {
    const trimmed = p.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith('### ')) {
      body.push({
        _key: `b${keyIdx++}`,
        _type: 'block',
        style: 'h3',
        children: [{ _key: `c${keyIdx++}`, _type: 'span', text: trimmed.replace('### ', '').trim() }],
      });
    } else if (trimmed.startsWith('## ')) {
      body.push({
        _key: `b${keyIdx++}`,
        _type: 'block',
        style: 'h2',
        children: [{ _key: `c${keyIdx++}`, _type: 'span', text: trimmed.replace('## ', '').trim() }],
      });
    } else if (trimmed.startsWith('#### ')) {
      body.push({
        _key: `b${keyIdx++}`,
        _type: 'block',
        style: 'h4',
        children: [{ _key: `c${keyIdx++}`, _type: 'span', text: trimmed.replace('#### ', '').trim() }],
      });
    } else if (trimmed.startsWith('> ')) {
      body.push({
        _key: `b${keyIdx++}`,
        _type: 'block',
        style: 'blockquote',
        children: [{ _key: `c${keyIdx++}`, _type: 'span', text: trimmed.replace(/^>\s*/, '').trim() }],
      });
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      // Bullet list item
      body.push({
        _key: `b${keyIdx++}`,
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [{ _key: `c${keyIdx++}`, _type: 'span', text: trimmed.replace(/^[-*]\s+/, '').trim() }],
      });
    } else if (/^\d+\.\s/.test(trimmed)) {
      // Numbered list item
      body.push({
        _key: `b${keyIdx++}`,
        _type: 'block',
        style: 'normal',
        listItem: 'number',
        level: 1,
        children: [{ _key: `c${keyIdx++}`, _type: 'span', text: trimmed.replace(/^\d+\.\s+/, '').trim() }],
      });
    } else {
      body.push({
        _key: `b${keyIdx++}`,
        _type: 'block',
        style: 'normal',
        children: [{ _key: `c${keyIdx++}`, _type: 'span', text: trimmed }],
      });
    }
  }

  return body;
}

/** Validate API key from multiple accepted locations */
function isAuthorized(request: NextRequest): boolean {
  const apiKey = process.env.BLOG_API_KEY;

  // In development with no key configured — allow open access
  if (!apiKey) return true;

  // Check x-api-key header (lowercase or uppercase)
  const xApiKey = request.headers.get('x-api-key') || request.headers.get('X-API-KEY');
  if (xApiKey === apiKey) return true;

  // Check Authorization: Bearer <token>
  const authHeader = request.headers.get('Authorization') || request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ') && authHeader.slice(7) === apiKey) return true;

  // Check ?apiKey= query param (for quick testing)
  const queryKey = request.nextUrl.searchParams.get('apiKey');
  if (queryKey === apiKey) return true;

  return false;
}

// ─────────────────────────────────────────────────────────────────────────────
// OPTIONS — Preflight handler (browser CORS preflight from fetch/axios)
// ─────────────────────────────────────────────────────────────────────────────
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// GET — Self-documenting schema (health check + field reference)
// ─────────────────────────────────────────────────────────────────────────────
export async function GET(request: NextRequest) {
  // Optionally protect GET docs endpoint too
  if (!isAuthorized(request)) {
    return corsResponse({ error: 'Unauthorized. Provide a valid x-api-key header or Authorization: Bearer <key>.' }, { status: 401 });
  }

  const baseUrl = process.env.SITE_URL || 'https://netbots.io';

  return corsResponse({
    endpoint: `${baseUrl}/api/blog/publish`,
    method: 'POST',
    description: 'Publishes a new blog article directly to Sanity CMS and auto-revalidates the Next.js cache.',
    authentication: {
      methods: [
        'Header: x-api-key: <BLOG_API_KEY>',
        'Header: Authorization: Bearer <BLOG_API_KEY>',
        'Query: ?apiKey=<BLOG_API_KEY>',
      ],
      note: 'Set BLOG_API_KEY in your .env file. Use the same value in your local automation scripts.',
    },
    fields: {
      required: {
        title: 'string — Article title (max 100 chars). Slug is auto-generated from this.',
        excerpt: 'string — Short excerpt / meta description (max 200 chars).',
        category: "string — One of: 'Web Architecture' | 'AI & Automation' | 'Tech Entrepreneurship' | 'Cloud & DevOps' | 'Design & UI/UX'",
        paragraphs: "string[] — Article content. Supports Markdown: '## ' for H2, '### ' for H3, '> ' for blockquote, '- ' for bullets, '1. ' for numbered lists.",
      },
      optional: {
        slug: 'string — Custom URL slug. Auto-generated from title if omitted.',
        draft: 'boolean — Save as Sanity draft (default: true). Set to false to publish immediately. Drafts are invisible on the live site until published from Sanity Studio.',
        tags: 'string[] — 3-5 keyword tags.',
        estimatedReadTime: "string — e.g. '7 min read'. Auto-computed if omitted.",
        featured: 'boolean — Feature this article in the homepage hero banner.',
        coverImageUrl: 'string — External cover image URL (Unsplash, Cloudinary, etc).',
        publishedAt: 'string — ISO 8601 datetime. Defaults to now.',
        authorRef: "string — Sanity author document _id. Defaults to 'author-saqlain-shah'.",
        youtubeUrl: 'string — YouTube video URL to embed in the article body.',
        youtubeTitle: 'string — Title for the embedded YouTube video.',
        seo: {
          metaTitle: 'string — Override meta title.',
          metaDescription: 'string — Override meta description.',
          keywords: 'string[] — SEO keywords array.',
        },
        // ── E-E-A-T Fields ────────────────────────────────────────────────
        'eeat.keyTakeaways': 'string[] — [EXPERIENCE] Key bullet-point learnings. Shown as a TL;DR box.',
        'eeat.experienceHighlight': 'string — [EXPERIENCE] First-hand case study result (e.g. "60% faster load time").',
        'eeat.reviewedBy': {
          description: '[EXPERTISE] Technical reviewer who fact-checked this article.',
          name: 'string',
          role: 'string',
          bio: 'string',
          credentials: 'string — e.g. "AWS Certified Solutions Architect"',
          linkedIn: 'string — LinkedIn profile URL.',
          avatarUrl: 'string — Avatar image URL.',
        },
        'eeat.citations': {
          description: '[AUTHORITATIVENESS] Array of authoritative sources.',
          _each: { title: 'string', url: 'string', publisher: 'string', year: 'string' },
        },
        'eeat.faqs': {
          description: '[TRUSTWORTHINESS] FAQs — rendered at end of post and feed Google FAQPage schema.',
          _each: { question: 'string', answer: 'string' },
        },
        'eeat.lastReviewedAt': 'string — [TRUSTWORTHINESS] ISO 8601 datetime of last content review.',
      },
    },
    examplePayload: {
      title: 'How AI Automation Is Transforming Small Businesses in Pakistan — 2026 Guide',
      excerpt: 'Discover how small businesses in Skardu and across Pakistan are using AI automation tools to cut costs, boost revenue, and compete globally. A NetBots 2026 guide.',
      category: 'AI & Automation',
      tags: ['AI Automation', 'Pakistan', 'Small Business', 'NetBots', 'Skardu'],
      coverImageUrl: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=1200&q=80',
      featured: false,
      paragraphs: [
        '## Why AI Automation Matters for Pakistani Businesses',
        'Small businesses in Gilgit-Baltistan are now leveraging AI to automate repetitive tasks and focus on growth.',
        '> Technology should feel instant, invisible, and resilient under massive loads.',
        '## How NetBots Implements AI Automation',
        'At NetBots, we deploy LLM-powered pipelines that integrate directly with your existing ERP and CRM systems.',
      ],
      eeat: {
        keyTakeaways: [
          'AI can reduce operational costs by up to 40% for SMBs.',
          'No-code AI integrations are now accessible even for startups.',
          'NetBots has deployed 5+ AI workflows for local businesses in 2025.',
        ],
        experienceHighlight: 'Deployed RAG-based customer support for a Skardu hospitality chain — 70% reduction in support tickets.',
        reviewedBy: {
          name: 'Saqlain Shah',
          role: 'Founder & CEO, NetBots',
          credentials: 'Full-Stack Engineer, AI Systems Architect',
          linkedIn: 'https://www.linkedin.com/in/syedsaqlainabbas110',
        },
        citations: [
          { title: 'McKinsey Global AI Report 2025', url: 'https://mckinsey.com', publisher: 'McKinsey & Company', year: '2025' },
          { title: 'Google AI for Business Documentation', url: 'https://ai.google', publisher: 'Google', year: '2025' },
        ],
        faqs: [
          { question: 'What is AI automation for small businesses?', answer: 'AI automation uses machine learning models to automate repetitive business tasks like customer support, invoicing, and data entry.' },
          { question: 'How much does AI automation cost in Pakistan?', answer: 'NetBots offers AI automation starting from PKR 50,000 per project depending on complexity. Contact us for a free audit.' },
        ],
      },
    },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// POST — Main Blog Publishing Handler
// ─────────────────────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  // 0. Auth check
  if (!isAuthorized(request)) {
    return corsResponse(
      { success: false, error: 'Unauthorized. Provide a valid x-api-key header or Authorization: Bearer <key>.' },
      { status: 401 }
    );
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return corsResponse({ success: false, error: 'Invalid JSON body.' }, { status: 400 });
  }

  // 1. Required field validation
  const { title, excerpt, category, paragraphs } = body;

  if (!title || typeof title !== 'string') {
    return corsResponse({ success: false, error: 'Required field missing: title (string).' }, { status: 400 });
  }
  if (!excerpt || typeof excerpt !== 'string') {
    return corsResponse({ success: false, error: 'Required field missing: excerpt (string).' }, { status: 400 });
  }

  const validCategories = ['Web Architecture', 'AI & Automation', 'Tech Entrepreneurship', 'Cloud & DevOps', 'Design & UI/UX'];
  if (!category || !validCategories.includes(category)) {
    return corsResponse({
      success: false,
      error: `Invalid or missing category. Must be one of: ${validCategories.join(', ')}`,
    }, { status: 400 });
  }
  if (!paragraphs || !Array.isArray(paragraphs) || paragraphs.length === 0) {
    return corsResponse({ success: false, error: 'Required field missing: paragraphs (non-empty string[]).' }, { status: 400 });
  }

  // 2. Derive slug
  const slug = body.slug ? slugify(body.slug) : slugify(title);
  // Sanity draft convention: prefix _id with 'drafts.' — keeps document
  // invisible on the live site until explicitly published from Sanity Studio.
  const saveAsDraft = body.draft !== false; // default = true (draft)
  const baseDocId = `post-${slug}`;
  const docId = saveAsDraft ? `drafts.${baseDocId}` : baseDocId;

  // 3. Build PortableText body
  let portableBody = markdownToPortableText(paragraphs);

  // Insert YouTube embed after the first text block if provided
  if (body.youtubeUrl && body.youtubeUrl.trim()) {
    const ytBlock = {
      _key: `b-youtube-${Date.now()}`,
      _type: 'youtube',
      url: body.youtubeUrl.trim(),
      title: body.youtubeTitle || title,
      caption: `Video: ${body.youtubeTitle || title}`,
    };
    portableBody = [portableBody[0], ytBlock, ...portableBody.slice(1)];
  }

  // 4. Assemble E-E-A-T data
  const eeat = body.eeat || {};

  // 5. Build Sanity document
  const postDoc: Record<string, any> & { _id: string; _type: string } = {
    _id: docId,
    _type: 'post',
    title: title.trim(),
    slug: { _type: 'slug', current: slug },
    // Draft: do NOT set publishedAt — Studio shows it as unpublished
    // Publish: set publishedAt so it sorts correctly on the live blog
    ...(saveAsDraft ? {} : { publishedAt: body.publishedAt || new Date().toISOString() }),
    excerpt: excerpt.trim().slice(0, 200),
    category,
    tags: Array.isArray(body.tags) ? body.tags : [],
    estimatedReadTime: body.estimatedReadTime || estimateReadTime(paragraphs),
    featured: Boolean(body.featured),
    body: portableBody,
    author: {
      _type: 'reference',
      _ref: body.authorRef || 'author-saqlain-shah',
    },
    seo: {
      metaTitle: body.seo?.metaTitle || `${title.trim()} | NetBots`,
      metaDescription: body.seo?.metaDescription || excerpt.trim().slice(0, 160),
      keywords: body.seo?.keywords || (Array.isArray(body.tags) ? body.tags : []),
    },
  };

  // Optional fields
  if (body.coverImageUrl) {
    postDoc.mainImageUrl = body.coverImageUrl;
  }

  // E-E-A-T optional fields
  if (eeat.keyTakeaways && Array.isArray(eeat.keyTakeaways) && eeat.keyTakeaways.length > 0) {
    postDoc.keyTakeaways = eeat.keyTakeaways;
  }
  if (eeat.experienceHighlight && typeof eeat.experienceHighlight === 'string') {
    postDoc.experienceHighlight = eeat.experienceHighlight;
  }
  if (eeat.reviewedBy && typeof eeat.reviewedBy === 'object' && eeat.reviewedBy.name) {
    postDoc.reviewedBy = eeat.reviewedBy;
  }
  if (eeat.citations && Array.isArray(eeat.citations) && eeat.citations.length > 0) {
    postDoc.citations = eeat.citations;
  }
  if (eeat.faqs && Array.isArray(eeat.faqs) && eeat.faqs.length > 0) {
    postDoc.faqs = eeat.faqs;
  }
  if (eeat.lastReviewedAt) {
    postDoc.lastReviewedAt = eeat.lastReviewedAt;
  }

  // 6. Write to Sanity
  try {
    const result = await sanityWriteClient.createOrReplace(postDoc);

    // 7. Revalidate Next.js cache only when publishing (not for drafts)
    if (!saveAsDraft) {
      try {
        revalidatePath('/sitemap.xml');
        revalidatePath('/blog', 'page');
        revalidatePath(`/blog/${slug}`, 'page');
        revalidateTag('blog-posts', CACHE_PROFILE);
        revalidateTag('post-slugs', CACHE_PROFILE);
      } catch (revalidateErr) {
        console.warn('[Blog API] Cache revalidation warning:', revalidateErr);
      }
    }

    const studioUrl = `https://netbots.io/studio/structure/post;${result._id}`;
    const studioLocalUrl = `http://localhost:3000/studio/structure/post;${result._id}`;

    return corsResponse({
      success: true,
      message: saveAsDraft
        ? `Draft "${title}" saved to Sanity. Open Studio to review and publish.`
        : `Article "${title}" published successfully.`,
      data: {
        _id: result._id,
        slug,
        draft: saveAsDraft,
        // Studio links to review/publish the draft
        studioUrl,
        studioLocalUrl,
        // Live URLs (only meaningful after publishing from Studio)
        liveUrl: `https://netbots.io/blog/${slug}`,
        localUrl: `http://localhost:3000/blog/${slug}`,
        eeatFields: {
          keyTakeaways: Boolean(postDoc.keyTakeaways),
          experienceHighlight: Boolean(postDoc.experienceHighlight),
          reviewedBy: Boolean(postDoc.reviewedBy),
          citations: Array.isArray(postDoc.citations) ? postDoc.citations.length : 0,
          faqs: Array.isArray(postDoc.faqs) ? postDoc.faqs.length : 0,
        },
      },
    });
  } catch (err: any) {
    console.error('[Blog API] Sanity write failed:', err);
    return corsResponse(
      {
        success: false,
        error: saveAsDraft ? 'Failed to save draft to Sanity CMS.' : 'Failed to publish to Sanity CMS.',
        details: err?.message || String(err),
      },
      { status: 500 }
    );
  }
}
