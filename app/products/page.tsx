import type { Metadata } from 'next';
import Script from 'next/script';
import ProductsPageClient from './ProductsPageClient';
import products from '@/lib/data/products.json';

const SITE_URL = 'https://sevenssstarskenya.co.ke';

export const metadata: Metadata = {
  title: 'Our Products | Seven SS Stars Solar',
  description:
    'Browse solar water heaters, solar panels, gel and lithium batteries, and solar lighting from Seven SS Stars Solar, Kenya.',
  alternates: { canonical: '/products' },
  openGraph: {
    title: 'Our Products | Seven SS Stars Solar',
    description:
      'Browse solar water heaters, solar panels, gel and lithium batteries, and solar lighting from Seven SS Stars Solar, Kenya.',
    url: `${SITE_URL}/products`,
  },
};

// P1 #7 -- structured data for the product category list, so search
// engines and AI assistants can enumerate what the business sells without
// scraping prose. (Full Product schema with price/availability belongs on
// individual product pages once those exist -- see audit item 2.5,
// "Limited Product Content".)
function ProductListJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: products.featured.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: p.name,
        description: p.description,
        image: `${SITE_URL}${p.image}`,
      },
    })),
  };
  return (
    <Script
      id="products-jsonld"
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function ProductsPage() {
  return (
    <>
      <ProductListJsonLd />
      <ProductsPageClient />
    </>
  );
}
