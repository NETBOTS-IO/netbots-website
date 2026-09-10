import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: 'https://netbots.io/refund' },
};

export default function RefundLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
