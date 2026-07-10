import { Metadata } from 'next';
import { JsonLd } from '@/components/structured-data/JsonLd';
import { getLocalBusinessSchema } from '@/lib/schema/schema-helpers';

export const metadata: Metadata = {
  title: 'Contact Net Bots | AI & Web Development Skardu',
  description: 'Get in touch with Net Bots in Skardu for custom software development, SEO, and AI solutions.',
  keywords: ['contact Net Bots', 'web development Gilgit-Baltistan', 'SEO and digital marketing services'],
};

export default function ContactLayout({
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
