import type { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

// Per-route metadata. Previously every route ('use client' pages can't
// export metadata, so they all silently inherited the homepage title/
// description from the root layout) -- meaning /about, /contact, /products,
// /catalog and /prices were indistinguishable to search engines. Splitting
// each route into a thin server page + client component fixes this across
// the site.
export const metadata: Metadata = {
  title: 'About Us | Seven SS Stars Solar',
  description:
    "Learn about Seven SS Stars Solar, Kenya's solar water heater and solar panel manufacturer with over 13 years of experience, KEBS and EPRA approved.",
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Us | Seven SS Stars Solar',
    description:
      "Learn about Seven SS Stars Solar, Kenya's solar water heater and solar panel manufacturer with over 13 years of experience.",
    url: 'https://sevenssstarskenya.co.ke/about',
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
