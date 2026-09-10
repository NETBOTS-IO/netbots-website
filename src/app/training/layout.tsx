import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: 'https://netbots.io/training' },
};

export default function TrainingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
