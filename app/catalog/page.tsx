import type { Metadata } from 'next';
import Script from 'next/script';
import CatalogPageClient from './CatalogPageClient';
import catalog from '@/lib/data/catalog.json';

const SITE_URL = 'https://sevenssstarskenya.co.ke';

export const metadata: Metadata = {
  title: 'Product Catalog | Seven SS Stars Solar',
  description:
    'Full catalog of solar water heaters, solar panels, batteries, and solar lighting products from Seven SS Stars Solar, Kenya.',
  alternates: { canonical: '/catalog' },
  openGraph: {
    title: 'Product Catalog | Seven SS Stars Solar',
    description:
      'Full catalog of solar water heaters, solar panels, batteries, and solar lighting products from Seven SS Stars Solar, Kenya.',
    url: `${SITE_URL}/catalog`,
  },
};

// P1 #7 -- structured data for the full catalog (20 SKUs across 3
// categories) so search engines / AI assistants can enumerate real
// inventory instead of inferring it from card layouts.
function CatalogJsonLd() {
  const allProducts = catalog.categories.flatMap((cat) => cat.products);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: allProducts.map((p: any, i: number) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: p.name,
        image: `${SITE_URL}${p.image}`,
        ...(p.description ? { description: p.description } : {}),
        ...(p.price
          ? {
              offers: {
                '@type': 'Offer',
                priceCurrency: p.currency || 'KES',
                price: p.price,
                availability: 'https://schema.org/InStock',
              },
            }
          : {}),
      },
    })),
  };
  return (
    <Script
      id="catalog-jsonld"
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function CatalogPage() {
  return (
    <>
      <CatalogJsonLd />
      <CatalogPageClient />
    </>
  );
}
