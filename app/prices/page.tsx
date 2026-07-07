import type { Metadata } from 'next';
import PricesPageClient from './PricesPageClient';

export const metadata: Metadata = {
  title: 'Pricing | Seven SS Stars Solar',
  description:
    'Competitive prices for solar water heaters, solar panels, and solar energy solutions from Seven SS Stars Solar, Kenya.',
  alternates: { canonical: '/prices' },
  openGraph: {
    title: 'Pricing | Seven SS Stars Solar',
    description:
      'Competitive prices for solar water heaters, solar panels, and solar energy solutions from Seven SS Stars Solar, Kenya.',
    url: 'https://sevenssstarskenya.co.ke/prices',
  },
};

export default function PricesPage() {
  return <PricesPageClient />;
}
