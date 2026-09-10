import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { createClient } from '@sanity/client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read and parse .env manually
const envPath = resolve(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx !== -1) {
        const key = trimmed.slice(0, eqIdx).trim();
        let val = trimmed.slice(eqIdx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        process.env[key] = val;
      }
    }
  });
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'utkskkc8';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN || process.env.SANITY_API_READ_TOKEN;

if (!token) {
  console.error('❌ Error: SANITY_API_TOKEN missing in .env!');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
});

// =========================================================================
// ✍️ EDIT YOUR ARTICLE HERE BEFORE RUNNING: node scripts/create-new-post.mjs
// =========================================================================
const myArticle = {
  title: 'How Next.js 16 and AI Agents Are Transforming Enterprise Software',
  category: 'AI & Automation', // 'Web Architecture' | 'AI & Automation' | 'Tech Entrepreneurship'
  excerpt:
    'An in-depth analysis of how autonomous systems and edge architectures are unlocking unprecedented productivity for enterprise engineering teams.',
  coverImageUrl:
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
  estimatedReadTime: '5 min read',
  featured: false, // Set to true to highlight this article in the top hero banner
  youtubeUrl: 'https://www.youtube.com/watch?v=sal78ACtGTc', // Paste any YouTube link, or leave empty ''
  youtubeTitle: 'Autonomous AI Agents in Enterprise Systems',
  tags: ['AI Agents', 'Next.js', 'Enterprise Software', 'Automation'],

  // Write your article content below. Use "## " for H2 headings, "### " for H3, and "> " for quotes!
  paragraphs: [
    'Modern enterprise software is reaching a critical inflection point. For the past decade, cloud migration and responsive web design were the main competitive differentiators. Today, the focus has shifted toward autonomy, sub-second latency, and intelligence.',
    '## 1. The Death of Static Deterministic Workflows',
    'Traditional business workflows relied heavily on brittle rule engines and manual review steps. When an unexpected customer query or unstructured document entered the pipeline, the system failed and required manual intervention.',
    '> Technology should feel instant, invisible, and resilient under massive enterprise loads.',
    '## 2. The Role of Autonomous Reasoning Systems',
    'By deploying specialized AI agents equipped with localized context, companies can automate end-to-end operational pipelines while maintaining 99.9% accuracy and human oversight.',
    'At NetBots, we specialize in building these mission-critical systems with sub-second response times and bulletproof enterprise security.',
  ],
};
// =========================================================================

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function publishArticle() {
  try {
    const slug = slugify(myArticle.title);
    const docId = `post-${slug}`;

    console.log(`🚀 Publishing article to Sanity: "${myArticle.title}"...`);

    // Format body into PortableText
    const body = [];
    let keyIdx = 1;

    for (const p of myArticle.paragraphs) {
      if (p.startsWith('## ')) {
        body.push({
          _key: `b${keyIdx++}`,
          _type: 'block',
          style: 'h2',
          children: [{ _key: `c${keyIdx++}`, _type: 'span', text: p.replace('## ', '').trim() }],
        });
      } else if (p.startsWith('### ')) {
        body.push({
          _key: `b${keyIdx++}`,
          _type: 'block',
          style: 'h3',
          children: [{ _key: `c${keyIdx++}`, _type: 'span', text: p.replace('### ', '').trim() }],
        });
      } else if (p.startsWith('> ')) {
        body.push({
          _key: `b${keyIdx++}`,
          _type: 'block',
          style: 'blockquote',
          children: [{ _key: `c${keyIdx++}`, _type: 'span', text: p.replace('> ', '').trim() }],
        });
      } else {
        body.push({
          _key: `b${keyIdx++}`,
          _type: 'block',
          style: 'normal',
          children: [{ _key: `c${keyIdx++}`, _type: 'span', text: p.trim() }],
        });
      }
    }

    // Insert YouTube embed if URL is provided
    if (myArticle.youtubeUrl && myArticle.youtubeUrl.trim()) {
      body.splice(2, 0, {
        _key: `b-youtube-${Date.now()}`,
        _type: 'youtube',
        url: myArticle.youtubeUrl.trim(),
        title: myArticle.youtubeTitle || myArticle.title,
        caption: `Video: ${myArticle.youtubeTitle || myArticle.title}`,
      });
    }

    const postDoc = {
      _id: docId,
      _type: 'post',
      title: myArticle.title,
      slug: { _type: 'slug', current: slug },
      publishedAt: new Date().toISOString(),
      excerpt: myArticle.excerpt,
      category: myArticle.category,
      tags: myArticle.tags,
      estimatedReadTime: myArticle.estimatedReadTime,
      featured: myArticle.featured || false,
      mainImageUrl: myArticle.coverImageUrl,
      author: {
        _type: 'reference',
        _ref: 'author-saqlain-shah',
      },
      seo: {
        metaTitle: `${myArticle.title} | NetBots Engineering`,
        metaDescription: myArticle.excerpt,
        keywords: myArticle.tags,
      },
      body,
    };

    const res = await client.createOrReplace(postDoc);
    console.log(`✅ SUCCESS! Article published with ID: ${res._id}`);
    console.log(`🌐 Live URL: https://netbots.io/blog/${slug}`);
    console.log(`💻 Local URL: http://localhost:3000/blog/${slug}\n`);
  } catch (err) {
    console.error('❌ Failed to publish article:', err);
  }
}

publishArticle();
