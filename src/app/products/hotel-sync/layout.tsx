import { Metadata } from 'next';
import { JsonLd } from '@/components/structured-data/JsonLd';

export const metadata: Metadata = {
  title: 'HotelSync | Best Hotel Management System & PMS Software Pakistan',
  description: 'HotelSync is Pakistan\'s ultimate offline-first hotel PMS and POS software. Manage front desk, restaurant POS billing, accounting, and staff roster without relying on internet connectivity. Perfect for hotels in Skardu, Hunza, and nationwide.',
  keywords: [
    'hotel management system pakistan',
    'best hotel software pakistan',
    'hotel PMS software offline',
    'offline hotel software',
    'hotel billing software POS',
    'hotel sync desktop software',
    'hotel channel manager pakistan',
    'hospitality management software Hunza',
    'hotel operations software Skardu',
    'FBR POS hotel software',
    'offline desktop hotel software',
    'Agoda Booking.com reservation sync hotel',
    'hotel accounting ledger cashbook app',
    'guest house check-in software',
    'banquet hall booking software pakistan',
    'commission-free hotel booking system',
    'Bookme reservation sync hotel software',
    'NetBots hotel software PMS'
  ],
  openGraph: {
    title: 'HotelSync | The Ultimate Hotel Management System & PMS',
    description: 'Run your hotel operations, F&B POS, payroll, and accounting offline. Designed for ultimate stability in remote tourism hubs like Skardu and Hunza.',
    url: 'https://netbots.io/products/hotel-sync',
    type: 'website',
  }
};

export default function HotelSyncLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': 'HotelSync PMS',
    'operatingSystem': 'Windows Desktop / LAN',
    'applicationCategory': 'BusinessApplication',
    'description': 'Offline-first Hotel Property Management System with front desk check-in, restaurant POS, payroll, and multi-terminal LAN database sync.',
    'offers': {
      '@type': 'Offer',
      'price': '4500',
      'priceCurrency': 'PKR'
    }
  };

  return (
    <>
      <JsonLd data={softwareSchema} />
      {children}
    </>
  );
}
