import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Hotel Sync | NetBots',
  description: 'Privacy policy for Hotel Sync by NetBots — explaining how guest and hotel data is collected, used, and protected.',
  alternates: { canonical: 'https://netbots.io/products/hotel-sync/privacy' },
  robots: { index: true, follow: true },
};

export default function HotelSyncPrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
