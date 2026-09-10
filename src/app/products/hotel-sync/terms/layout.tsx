import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — Hotel Sync | NetBots',
  description: 'Terms of service for Hotel Sync by NetBots — the property management and booking system for hotels in Pakistan and Gilgit-Baltistan.',
  alternates: { canonical: 'https://netbots.io/products/hotel-sync/terms' },
  robots: { index: true, follow: true },
};

export default function HotelSyncTermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
