import { Metadata } from 'next';
import { getBreadcrumbSchema } from '@/lib/schema/schema-helpers';
import { JsonLd } from '@/components/structured-data/JsonLd';

export const revalidate = 3600; // ISR revalidation every hour

export const metadata: Metadata = {
  title: 'Portfolio & Case Studies | Net Bots',
  description: 'Explore the high-performance enterprise platforms and agentic AI systems we’ve engineered for clients worldwide.',
  keywords: ['custom software development company', 'web development Gilgit-Baltistan', 'Net Bots portfolio'],
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaData = getBreadcrumbSchema([
    { name: 'Home', url: 'https://netbots.io' },
    { name: 'Portfolio', url: 'https://netbots.io/portfolio' }
  ]);

  return (
    <>
      <JsonLd data={schemaData} />
      {children}
    </>
  );
}
