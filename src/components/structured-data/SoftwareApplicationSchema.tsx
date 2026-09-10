import React from 'react';

interface SoftwareApplicationSchemaProps {
  name: string;
  description: string;
  applicationCategory: string; // e.g., 'BusinessApplication'
  operatingSystem: string; // e.g., 'WebBrowser'
  url: string;
  imageUrl?: string;
  offers?: {
    price: string;
    priceCurrency: string;
  };
  aggregateRating?: {
    ratingValue: string;
    reviewCount: string;
  };
}

export function SoftwareApplicationSchema({
  name,
  description,
  applicationCategory,
  operatingSystem,
  url,
  imageUrl,
  offers,
  aggregateRating,
}: SoftwareApplicationSchemaProps) {
  const structuredData: any = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    applicationCategory,
    operatingSystem,
    url,
    publisher: {
      '@type': 'Organization',
      name: 'NetBots',
      url: 'https://netbots.io',
    },
  };

  if (imageUrl) {
    structuredData.image = imageUrl;
  }

  if (offers) {
    structuredData.offers = {
      '@type': 'Offer',
      price: offers.price,
      priceCurrency: offers.priceCurrency,
    };
  }

  if (aggregateRating) {
    structuredData.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: aggregateRating.ratingValue,
      reviewCount: aggregateRating.reviewCount,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
