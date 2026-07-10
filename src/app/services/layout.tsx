import { Metadata } from 'next';
import { JsonLd } from '@/components/structured-data/JsonLd';
import { getProfessionalServiceSchema } from '@/lib/schema/schema-helpers';

export const metadata: Metadata = {
  title: 'Web Development Services in Skardu, Gilgit-Baltistan',
  description: 'Net Bots builds fast, secure, SEO-optimized web platforms for businesses in Skardu and beyond, including full-stack development, AI integration, and digital marketing under one roof.',
  keywords: ['full-stack web development agency', 'digital marketing agency Skardu', 'AI-powered software solutions', 'web development Gilgit-Baltistan'],
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaData = getProfessionalServiceSchema(
    'Enterprise Web Development',
    'Custom software development, scalable web platforms, and MERN stack engineering.',
    'https://netbots.io/services'
  );

  return (
    <>
      <JsonLd data={schemaData} />
      {children}
    </>
  );
}
