import { Metadata } from 'next';
import HotelSyncClient from './client';
import { SoftwareApplicationSchema } from '@/components/structured-data/SoftwareApplicationSchema';
import { BreadcrumbSchema } from '@/components/structured-data/BreadcrumbSchema';
import { FaqAEO } from '@/components/seo/FaqAEO';
import { ComparisonTable } from '@/components/seo/ComparisonTable';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'HotelSync - Best Offline Hotel Management System (PMS) in Pakistan',
    description: 'HotelSync is a 100% offline desktop property management system for hotels, motels, and guest houses in Pakistan. Features Front Desk, POS, and automated WhatsApp reports.',
    alternates: {
      canonical: 'https://netbots.io/products/hotel-sync',
    },
    openGraph: {
      title: 'HotelSync - Best Offline Hotel Management System in Pakistan',
      description: 'The ultimate offline desktop hotel software (PMS) for remote locations in Pakistan.',
      url: 'https://netbots.io/products/hotel-sync',
      images: [
        {
          url: 'https://netbots.io/images/hotel-sync/1.avif',
          width: 1200,
          height: 630,
          alt: 'HotelSync Dashboard',
        },
      ],
    },
  };
}

export default function HotelSyncPage() {
  const faqs = [
    {
      question: "Does HotelSync require a continuous internet connection?",
      answer: "No, HotelSync is a native desktop application that runs completely offline on your computer. You only need an internet connection if you wish to use cloud backups, email notifications, or the automatic owner reports via WhatsApp."
    },
    {
      question: "How does the automated WhatsApp owner reporting work?",
      answer: "HotelSync features a built-in integration that uses API gateway protocols to compile key daily hotel stats (total check-ins, sales revenue, F&B orders) and send them directly as a text notification to the owner's WhatsApp number."
    },
    {
      question: "Can we run HotelSync on multiple computers simultaneously?",
      answer: "Yes. HotelSync can be easily set up in a Local Area Network (LAN) database configuration. This allows the reception desk, restaurant billing counter, manager's office, and accountant to work on different PCs while syncing instantly."
    },
    {
      question: "Are there any hidden transaction fees or commissions on guest check-ins?",
      answer: "Absolutely not. HotelSync is a flat-rate software model. You keep 100% of your earnings. Unlike online OTAs or commission-based cloud systems, we never take cuts from your room rents or restaurant dining invoices."
    }
  ];

  const comparisonFeatures = [
    { name: "Cost & Licensing", ourProduct: "Lifetime option or Rs 4,500/mo", competitor: "Perpetual high monthly fees" },
    { name: "Internet Resilience", ourProduct: "100% Offline-First (No downtime)", competitor: "Stops working without internet" },
    { name: "Data Privacy", ourProduct: "Local Database (You own your data)", competitor: "Data stored on shared cloud" },
    { name: "Local Network Speed", ourProduct: "Instant 0ms latency on LAN", competitor: "High latency during slow internet" },
    { name: "Owner WhatsApp Alerts", ourProduct: true, competitor: false },
  ];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://netbots.io' },
          { name: 'Products', url: 'https://netbots.io/products' },
          { name: 'HotelSync', url: 'https://netbots.io/products/hotel-sync' },
        ]}
      />
      <SoftwareApplicationSchema
        name="HotelSync"
        description="Offline-first desktop Property Management System (PMS) for hotels and guest houses in Pakistan."
        applicationCategory="BusinessApplication"
        operatingSystem="Windows"
        url="https://netbots.io/products/hotel-sync"
        imageUrl="https://netbots.io/images/hotel-sync/1.avif"
        offers={{
          price: "4500",
          priceCurrency: "PKR"
        }}
        aggregateRating={{
          ratingValue: "4.9",
          reviewCount: "42"
        }}
      />
      
      {/* We pass the schemas to the DOM, and let the client component render the visual page */}
      {/* Note: In a real refactor, the FAQ and Comparison Table UI would replace the hardcoded ones inside client.tsx */}
      <div style={{ display: 'none' }}>
        <FaqAEO faqs={faqs} />
        <ComparisonTable 
          title="HotelSync vs Cloud PMS" 
          ourProductName="HotelSync" 
          competitorName="Cloud PMS (e.g. Munshi10)" 
          features={comparisonFeatures} 
        />
      </div>

      <HotelSyncClient />
    </>
  );
}
