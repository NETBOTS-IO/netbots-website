#!/usr/bin/env python3
"""
NetBots Blog Publishing Automation Script (Python)
──────────────────────────────────────────────────
Usage:
    python scripts/publish_blog_automation_example.py

Requirements:
    pip install requests python-dotenv   (or just requests — dotenv is optional)

Set BLOG_API_KEY in your .env file or export it as an environment variable.
"""

import os
import sys
import json
from pathlib import Path

# ─── Try to load .env ─────────────────────────────────────────────────────────
try:
    from dotenv import load_dotenv
    env_path = Path(__file__).parent.parent / '.env'
    if env_path.exists():
        load_dotenv(dotenv_path=env_path)
        print(f"✅ Loaded .env from {env_path}")
except ImportError:
    # dotenv not installed — manually parse .env
    env_path = Path(__file__).parent.parent / '.env'
    if env_path.exists():
        with open(env_path) as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    k, v = line.split('=', 1)
                    v = v.strip().strip('"').strip("'")
                    os.environ.setdefault(k.strip(), v)
        print(f"✅ Loaded .env manually from {env_path}")

import urllib.request
import urllib.error

# ─── Configuration ────────────────────────────────────────────────────────────
BASE_URL = 'http://localhost:3000'          # Change to https://netbots.io for production
API_KEY  = os.environ.get('BLOG_API_KEY', 'netbots_blog_publish_api_secret_2026')
ENDPOINT = f'{BASE_URL}/api/blog/publish'

# ─────────────────────────────────────────────────────────────────────────────
# ✍️  EDIT YOUR ARTICLE BELOW
# ─────────────────────────────────────────────────────────────────────────────
article = {
    # ── Required ──────────────────────────────────────────────────────────────
    'title': 'Next.js 16 Performance Optimization — 10 Techniques That Cut Load Time by 60% | NetBots',
    'excerpt': (
        'Slow websites lose 53% of mobile visitors. This guide covers 10 Next.js 16 '
        'optimizations NetBots uses on every client project — with real benchmarks from '
        'Pakistani enterprise deployments. Read time: 8 min.'
    ),
    'category': 'Web Architecture',  # 'Web Architecture' | 'AI & Automation' | 'Tech Entrepreneurship' | 'Cloud & DevOps' | 'Design & UI/UX'

    # Content: Use '## ' for H2, '### ' for H3, '> ' for blockquote,
    #          '- ' for bullet, '1. ' for numbered list
    'paragraphs': [
        'Web performance is no longer a nice-to-have — it is a hard business requirement. '
        'Google's Core Web Vitals are now direct ranking factors, and Pakistani enterprise '
        'clients are losing revenue to slow-loading competitors.',
        '## Why Next.js 16 Performance Matters',
        'Next.js 16 introduced Partial Prerendering (PPR), the Turbopack bundler as stable, '
        'and improved React Server Component streaming — all of which dramatically change '
        'how you optimize your application.',
        '> Every 100ms improvement in page load time increases conversion rates by 1% — Google/Deloitte, 2025.',
        '## Technique 1: Enable Partial Prerendering (PPR)',
        'PPR allows you to serve a static shell instantly while streaming dynamic content. '
        'Enable it per route with `export const experimental_ppr = true;`.',
        '## Technique 2: Optimize Images with next/image',
        '- Always use the next/image component — never raw <img> tags',
        '- Set priority={true} on above-the-fold images',
        '- Use sizes prop to prevent oversized image downloads on mobile',
        '## Technique 3: Use React Server Components by Default',
        'Move data-fetching logic to RSCs to eliminate unnecessary client-side JavaScript bundles. '
        'At NetBots, this alone reduced our clients\' JS bundle size by 40%.',
        '## Conclusion',
        'These 10 techniques, applied systematically, will dramatically improve your Core Web Vitals. '
        'Need help optimizing your Next.js application? Contact NetBots for a free technical audit.',
    ],

    # ── Optional ───────────────────────────────────────────────────────────────
    'tags': ['Next.js', 'Web Performance', 'Core Web Vitals', 'NetBots', 'Pakistan'],
    'coverImageUrl': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    'featured': False,
    'youtubeUrl': '',  # Optional YouTube URL to embed in article

    # ── SEO Overrides ──────────────────────────────────────────────────────────
    'seo': {
        'metaTitle': 'Next.js 16 Performance Optimization — 10 Techniques | NetBots Engineering',
        'metaDescription': (
            'Slow websites lose 53% of mobile visitors. 10 Next.js 16 optimizations with '
            'real benchmarks from enterprise deployments in Pakistan. NetBots Engineering Blog.'
        ),
        'keywords': ['next.js performance', 'core web vitals', 'next.js 16', 'netbots engineering'],
    },

    # ── E-E-A-T Fields (strongly recommended for Google SEO ranking) ───────────
    'eeat': {
        # EXPERIENCE: TL;DR and first-hand results
        'keyTakeaways': [
            'Partial Prerendering (PPR) can eliminate TTFB for static shells.',
            'RSC migration reduces client JS bundle by up to 40%.',
            'next/image with proper `sizes` prevents 60-80% oversized image downloads.',
            'ISR + on-demand revalidation gives blog-like pages near-static performance.',
            'NetBots achieved sub-800ms LCP on all 5 Pakistani enterprise client sites in 2025.',
        ],
        'experienceHighlight': (
            'Applied these 10 techniques across 5 Pakistani enterprise sites — '
            'average LCP improved from 3.8s to 0.9s (76% improvement), achieving Google "Good" scores.'
        ),

        # EXPERTISE: Technical reviewer
        'reviewedBy': {
            'name': 'Saqlain Shah',
            'role': 'Founder & CEO, NetBots',
            'bio': 'Systems architect with 5+ years optimizing enterprise Next.js applications.',
            'credentials': 'Full-Stack Engineer · Next.js Expert · Core Web Vitals Specialist',
            'linkedIn': 'https://www.linkedin.com/in/syedsaqlainabbas110',
        },

        # AUTHORITATIVENESS: External authoritative sources
        'citations': [
            {
                'title': 'Google Core Web Vitals — Web.dev Documentation',
                'url': 'https://web.dev/vitals/',
                'publisher': 'Google',
                'year': '2025',
            },
            {
                'title': 'Next.js 16 Official Documentation — Partial Prerendering',
                'url': 'https://nextjs.org/docs/app/api-reference/next-config-js/ppr',
                'publisher': 'Vercel / Next.js',
                'year': '2025',
            },
            {
                'title': 'The State of Web Performance 2025',
                'url': 'https://almanac.httparchive.org/en/2025/',
                'publisher': 'HTTP Archive / Web Almanac',
                'year': '2025',
            },
        ],

        # TRUSTWORTHINESS: FAQs
        'faqs': [
            {
                'question': 'What is Next.js Partial Prerendering (PPR)?',
                'answer': (
                    'PPR is a Next.js 16+ feature that combines static and dynamic rendering. '
                    'It serves a static shell of your page instantly (from CDN), while streaming '
                    'in dynamic content. This gives near-static performance for pages that also '
                    'have personalized or real-time data.'
                ),
            },
            {
                'question': 'How do Next.js React Server Components improve performance?',
                'answer': (
                    'React Server Components (RSC) run on the server and send only HTML to the client, '
                    'not JavaScript. This eliminates the JS bundle for those components, reducing '
                    'total page weight and speeding up Time to Interactive (TTI) significantly.'
                ),
            },
            {
                'question': 'Can NetBots optimize my existing Next.js app in Pakistan?',
                'answer': (
                    'Yes. NetBots offers a free Core Web Vitals audit for existing Next.js applications. '
                    'Based in Skardu, Gilgit-Baltistan, we have optimized enterprise apps across Pakistan. '
                    'Contact us at netbots.io/contact to get started.'
                ),
            },
        ],
    },
}
# ─────────────────────────────────────────────────────────────────────────────


def publish_blog():
    print(f'\n🚀 Publishing blog to: {ENDPOINT}')
    print(f'📝 Title: "{article["title"]}"\n')

    payload = json.dumps(article).encode('utf-8')
    headers = {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        # Alternative: 'Authorization': f'Bearer {API_KEY}',
    }

    req = urllib.request.Request(ENDPOINT, data=payload, headers=headers, method='POST')

    try:
        with urllib.request.urlopen(req) as response:
            raw = response.read().decode('utf-8')
            data = json.loads(raw)

        print('✅ SUCCESS!\n')
        info = data.get('data', {})
        print(f'📰 Title:       {article["title"]}')
        print(f'🔗 Slug:        {info.get("slug")}')
        print(f'🌐 Live URL:    {info.get("liveUrl")}')
        print(f'💻 Local URL:   {info.get("localUrl")}')
        print(f'📅 Published:   {info.get("publishedAt")}')

        eeat = info.get('eeatFields', {})
        print('\n📊 E-E-A-T Fields Written:')
        print(f'   Key Takeaways:        {"✅" if eeat.get("keyTakeaways") else "—"}')
        print(f'   Experience Highlight: {"✅" if eeat.get("experienceHighlight") else "—"}')
        print(f'   Reviewed By:          {"✅" if eeat.get("reviewedBy") else "—"}')
        print(f'   Citations:            {"✅ (" + str(eeat.get("citations")) + ")" if eeat.get("citations") else "—"}')
        print(f'   FAQs:                 {"✅ (" + str(eeat.get("faqs")) + ")" if eeat.get("faqs") else "—"}')

        print('\n✨ Cache revalidated — blog list and slug page are live immediately.')
        print('\n📋 Next Steps (after deploying to production):')
        print('   1. Visit https://netbots.io/sitemap.xml — confirm slug appears')
        print('   2. Go to Google Search Console → URL Inspection → Request Indexing')
        print('   3. Share on LinkedIn and Instagram to accelerate crawling\n')

    except urllib.error.HTTPError as e:
        body = e.read().decode('utf-8')
        print(f'❌ Failed (HTTP {e.code}): {body}')
        sys.exit(1)
    except urllib.error.URLError as e:
        print(f'❌ Network error — is the dev server running?\n   {e.reason}')
        print('\n   Make sure: npm run dev (local) OR server is deployed (production)')
        sys.exit(1)


if __name__ == '__main__':
    publish_blog()
