import { Metadata } from 'next';
import { JsonLd } from '@/components/structured-data/JsonLd';

export const metadata: Metadata = {
  title: 'Engineering Blog, Web Architecture & AI Insights | NetBots',
  description:
    'In-depth technical guides, enterprise Next.js architecture benchmarks, autonomous AI workflows, and software agency playbooks written by the NetBots engineering team.',
  keywords: [
    'NetBots Blog',
    'Enterprise web development articles',
    'Next.js performance guides',
    'AI automation tutorials',
    'Software agency engineering Pakistan',
    'Saqlain Shah blog',
    'Skardu tech blog',
  ],
  alternates: {
    canonical: 'https://netbots.io/blog',
  },
  openGraph: {
    title: 'NetBots Engineering & AI Architecture Blog',
    description:
      'Field-tested playbooks on building high-performance web systems, autonomous AI agents, and scaling tech companies.',
    url: 'https://netbots.io/blog',
    siteName: 'NetBots',
    images: [
      {
        url: 'https://netbots.io/images/netbots-logo-original.avif',
        width: 1200,
        height: 630,
        alt: 'NetBots Engineering Blog',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NetBots Engineering & AI Architecture Blog',
    description:
      'Field-tested playbooks on building high-performance web systems, autonomous AI agents, and scaling tech companies.',
    images: ['https://netbots.io/images/netbots-logo-original.avif'],
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'NetBots Engineering Blog & Insights',
    description:
      'Articles on enterprise web architecture, applied artificial intelligence, and startup systems engineering.',
    url: 'https://netbots.io/blog',
    publisher: {
      '@type': 'Organization',
      name: 'NetBots (SMC-Private) Limited',
      url: 'https://netbots.io',
      logo: 'https://netbots.io/images/netbots-logo-original.avif',
    },
  };

  return (
    <>
      <JsonLd data={collectionSchema} />
      {children}
    </>
  );
}
