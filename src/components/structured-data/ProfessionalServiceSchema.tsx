import React from 'react';

interface ProfessionalServiceSchemaProps {
  name: string;
  description: string;
  url: string;
  image?: string;
}

export function ProfessionalServiceSchema({ name, description, url, image }: ProfessionalServiceSchemaProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name,
    description,
    url,
    image: image || 'https://netbots.io/og-image.jpg',
    provider: {
      '@type': 'Organization',
      name: 'Net Bots (SMC-Private) Limited',
    },
    areaServed: 'Worldwide',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
