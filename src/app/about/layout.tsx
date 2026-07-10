import { Metadata } from 'next';
import { JsonLd } from '@/components/structured-data/JsonLd';
import { getLocalBusinessSchema } from '@/lib/schema/schema-helpers';

export const metadata: Metadata = {
  title: 'About NetBots | Leading Software & AI Agency in Pakistan',
  description: 'Learn about TheNetBots, a premier custom software and AI automation agency based in Skardu, Gilgit-Baltistan. We engineer enterprise-grade digital platforms.',
  keywords: ['IT company Skardu Pakistan', 'custom software development company', 'NetBots Gilgit-Baltistan', 'AI automation agency Pakistan'],
  alternates: { canonical: 'https://netbots.io/about' },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaData = getLocalBusinessSchema();

  return (
    <>
      <JsonLd data={schemaData} />
      {children}
    </>
  );
}
