import { Metadata } from 'next';
import { JsonLd } from '@/components/structured-data/JsonLd';
import { getProfessionalServiceSchema } from '@/lib/schema/schema-helpers';

export const metadata: Metadata = {
  title: 'Web Development, AI Automation & Digital Marketing Services | NetBots Pakistan',
  description: 'From custom web platforms built on Next.js to AI automation workflows and precision digital marketing — NetBots delivers end-to-end technology services for businesses in Pakistan and globally. Get a free audit.',
  keywords: ['full-stack web development agency', 'digital marketing agency Skardu', 'AI-powered software solutions', 'web development Gilgit-Baltistan'],
  alternates: { canonical: 'https://netbots.io/services' },
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
