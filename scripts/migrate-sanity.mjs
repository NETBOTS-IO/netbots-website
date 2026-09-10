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

console.log('🚀 Connecting to Sanity CMS...');
console.log('Project ID:', projectId);
console.log('Dataset:', dataset);
console.log('Token exists:', Boolean(token));

if (!token) {
  console.error('❌ Error: SANITY_API_TOKEN is missing in .env!');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
});

async function runMigration() {
  try {
    console.log('📦 1. Creating/Updating Author (Saqlain Shah)...');
    const authorDoc = {
      _id: 'author-saqlain-shah',
      _type: 'author',
      name: 'Saqlain Shah',
      role: 'Founder & CEO, NetBots',
      avatarUrl: '/images/profileImage-ceo.avif',
      bio: 'Systems architect and CEO at NetBots, engineering enterprise platforms, sub-second web applications, and autonomous AI systems.',
      linkedIn: 'https://www.linkedin.com/in/syedsaqlainabbas110',
    };
    await client.createOrReplace(authorDoc);
    console.log('✅ Author created: author-saqlain-shah');

    console.log('📦 2. Migrating Benchmark Blog Posts to Sanity...');

    const posts = [
      {
        _id: 'post-nextjs-enterprise-architecture',
        _type: 'post',
        title: 'Architecting Enterprise Next.js Applications with Sub-Second Load Times',
        slug: { _type: 'slug', current: 'architecting-enterprise-nextjs-applications' },
        publishedAt: '2026-03-01T10:00:00Z',
        excerpt:
          'A deep dive into Server Components, streaming SSR, edge caching, and bundle optimization strategies engineered for enterprise scale.',
        mainImageUrl:
          'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
        category: 'Web Architecture',
        tags: ['Next.js', 'React', 'Performance', 'Web Architecture', 'SEO'],
        estimatedReadTime: '6 min read',
        featured: true,
        author: {
          _type: 'reference',
          _ref: 'author-saqlain-shah',
        },
        seo: {
          metaTitle: 'Architecting Enterprise Next.js Applications | NetBots Engineering',
          metaDescription:
            'Discover how NetBots engineers sub-second load times and 100/100 Core Web Vitals using Next.js App Router, SSR streaming, and modern edge architectures.',
          keywords: [
            'Next.js enterprise architecture',
            'sub-second load time Next.js',
            'Next.js SSR streaming',
            'NetBots web development',
          ],
        },
        body: [
          {
            _key: 'b1',
            _type: 'block',
            style: 'normal',
            children: [
              {
                _key: 'c1',
                _type: 'span',
                text: 'In the modern web landscape, every 100 milliseconds of latency directly degrades user conversion rates and algorithmic search rankings. At NetBots, our core philosophy is simple: technology should feel instant, invisible, and resilient under massive enterprise loads.',
              },
            ],
          },
          {
            _key: 'b2',
            _type: 'block',
            style: 'h2',
            children: [
              {
                _key: 'c2',
                _type: 'span',
                text: '1. Why Traditional Client-Side SPAs Fail Modern SEO',
              },
            ],
          },
          {
            _key: 'b3',
            _type: 'block',
            style: 'normal',
            children: [
              {
                _key: 'c3',
                _type: 'span',
                text: 'For over a decade, client-side rendering (CSR) dominated front-end architectures. While convenient for developers, shipping multi-megabyte JavaScript bundles forced search engine web crawlers to queue rendering resources, leading to stale indexing, poor Largest Contentful Paint (LCP), and erratic Cumulative Layout Shift (CLS).',
              },
            ],
          },
          {
            _key: 'b4',
            _type: 'block',
            style: 'blockquote',
            children: [
              {
                _key: 'c4',
                _type: 'span',
                text: 'Server-Side Rendering is not just an SEO tactic—it is the bedrock of fast, accessible, and globally competitive web engineering.',
              },
            ],
          },
          {
            _key: 'b5',
            _type: 'youtube',
            url: 'https://www.youtube.com/watch?v=wm5gMKuwSYk',
            title: 'Next.js App Router & Server Components In-Depth Architecture',
            caption: 'Watch: How Next.js Server Components fundamentally transform web performance and crawlability.',
          },
          {
            _key: 'b6',
            _type: 'block',
            style: 'h2',
            children: [
              {
                _key: 'c6',
                _type: 'span',
                text: '2. The Triad of Sub-Second Performance',
              },
            ],
          },
          {
            _key: 'b7',
            _type: 'block',
            style: 'normal',
            children: [
              {
                _key: 'c7',
                _type: 'span',
                text: 'To achieve sustained sub-second render times, our team implements three non-negotiable architectural layers on every client platform: Zero-bundle React Server Components, Incremental Static Regeneration (ISR), and automated next-gen media formats (AVIF/WebP).',
              },
            ],
          },
        ],
      },
      {
        _id: 'post-ai-agents-vs-automations',
        _type: 'post',
        title: 'AI Agents vs Traditional Automations: What Actually Drives Enterprise ROI in 2026?',
        slug: { _type: 'slug', current: 'ai-agents-vs-traditional-automations-roi' },
        publishedAt: '2026-02-24T14:30:00Z',
        excerpt:
          'Understanding the difference between deterministic rule-based workflows and autonomous reasoning agents when solving real business bottlenecks.',
        mainImageUrl:
          'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        category: 'AI & Automation',
        tags: ['Artificial Intelligence', 'AI Agents', 'Automation', 'Enterprise ROI', 'LLMs'],
        estimatedReadTime: '5 min read',
        featured: false,
        author: {
          _type: 'reference',
          _ref: 'author-saqlain-shah',
        },
        seo: {
          metaTitle: 'AI Agents vs Traditional Automation: Real Enterprise ROI | NetBots',
          metaDescription:
            'Discover why autonomous AI agents outperform rigid deterministic scripts in complex customer workflows, lead qualification, and enterprise operations.',
          keywords: [
            'AI agents for business',
            'AI automation vs RPA',
            'enterprise AI implementation',
            'autonomous AI systems',
          ],
        },
        body: [
          {
            _key: 'b1',
            _type: 'block',
            style: 'normal',
            children: [
              {
                _key: 'c1',
                _type: 'span',
                text: 'For years, business automation meant setting up static Zapier triggers and rigid if-then scripts. While useful for simple data syncs, these systems break the moment input data deviates from expected templates. In 2026, autonomous AI agents represent an exponential leap forward.',
              },
            ],
          },
          {
            _key: 'b2',
            _type: 'block',
            style: 'h2',
            children: [
              {
                _key: 'c2',
                _type: 'span',
                text: '1. Deterministic Scripts vs. Cognitive Agents',
              },
            ],
          },
          {
            _key: 'b3',
            _type: 'block',
            style: 'normal',
            children: [
              {
                _key: 'c3',
                _type: 'span',
                text: 'A traditional script follows fixed code pathways: "If a user submits Form A, email Department B." An autonomous agent, on the other hand, understands intent, evaluates ambiguity, verifies business context, and selects tools dynamically to solve complex operational challenges.',
              },
            ],
          },
          {
            _key: 'b4',
            _type: 'youtube',
            url: 'https://www.youtube.com/watch?v=sal78ACtGTc',
            title: 'Building Autonomous AI Agents for Real-World Workflows',
            caption: 'Video: How autonomous agentic workflows handle unstructured enterprise data.',
          },
        ],
      },
      {
        _id: 'post-solo-dev-to-agency-founder',
        _type: 'post',
        title: 'From Solo Developer to Software Agency: The 0 to 1 Playbook',
        slug: { _type: 'slug', current: 'solo-developer-to-software-agency-playbook' },
        publishedAt: '2026-02-15T09:00:00Z',
        excerpt:
          'How engineers transition from low-ticket freelance contracts into running high-margin, scalable technology agencies.',
        mainImageUrl:
          'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
        category: 'Tech Entrepreneurship',
        tags: ['Entrepreneurship', 'Agency Building', 'Agency Growth', 'Software Engineering', 'Business'],
        estimatedReadTime: '7 min read',
        featured: false,
        author: {
          _type: 'reference',
          _ref: 'author-saqlain-shah',
        },
        seo: {
          metaTitle: 'From Solo Developer to Software Agency Playbook | Saqlain Shah',
          metaDescription:
            'A battle-tested blueprint by Saqlain Shah on escaping the freelance trap, systemizing delivery, and scaling an engineering agency to 6 figures.',
          keywords: [
            'developer to agency founder',
            'how to start a software agency',
            'freelancer to agency',
            'Saqlain Shah agency playbook',
          ],
        },
        body: [
          {
            _key: 'b1',
            _type: 'block',
            style: 'normal',
            children: [
              {
                _key: 'c1',
                _type: 'span',
                text: 'Most freelance developers stay trapped on the hourly billing treadmill. They trade 60 hours a week for clients who nickel-and-dime every invoice. Escaping this trap requires shifting your identity from a reactive task-doer to an outcome-driven technology partner.',
              },
            ],
          },
          {
            _key: 'b2',
            _type: 'block',
            style: 'h2',
            children: [
              {
                _key: 'c2',
                _type: 'span',
                text: '1. The Pricing Paradigm Shift: Price Outcomes, Not Hours',
              },
            ],
          },
          {
            _key: 'b3',
            _type: 'block',
            style: 'normal',
            children: [
              {
                _key: 'c3',
                _type: 'span',
                text: 'Clients do not care how many lines of code you write or how many hours you spend debugging. They care about business outcomes: increasing revenue, automating manual bottlenecks, and securing market share.',
              },
            ],
          },
          {
            _key: 'b4',
            _type: 'youtube',
            url: 'https://www.youtube.com/watch?v=F3z_7h0lFkY',
            title: 'The Founder Mindset: Scaling a Tech Agency from Scratch',
            caption: 'Watch: Key business and operational frameworks for technical founders.',
          },
        ],
      },
    ];

    for (const post of posts) {
      console.log(`📤 Pushing post: "${post.title}"...`);
      await client.createOrReplace(post);
      console.log(`✅ Synced: ${post._id}`);
    }

    console.log('\n🎉 ALL ARTICLES AND SCHEMAS SUCCESSFULLY MIGRATED TO SANITY!');
  } catch (err) {
    console.error('❌ Migration failed:', err);
  }
}

runMigration();
