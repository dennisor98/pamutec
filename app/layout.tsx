import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ThemeRegistry from '@/components/layout/ThemeRegistry';
import FloatingButtons from '@/components/layout/FloatingButtons';
import company from '@/lib/data/company.json';

const SITE_URL = 'https://sevenssstarskenya.co.ke';

const GA_MEASUREMENT_ID = 'G-E03PZPGCDC';

export const metadata: Metadata = {
  // Shortened to under 60 characters (was 66) so it stops truncating in
  // Google's SERP snippet -- audit item "Meta title is 66 characters".
  title: 'Seven SS Stars Solar | Solar Water Heaters Kenya',
  description:
    'Seven SS Stars Solar is a leading provider of solar water heaters, solar panels, and solar energy solutions in Kenya. Quality products at competitive prices.',
  keywords:
    'solar panels,sevenss,sevenss stars,sevenss stars solar, solar water heater, solar, SevenSS Solar, SevenSSStars Solar, solar energy, solar installation, Kenya solar, solar water heating, thermal solar',
  authors: [{ name: 'Seven SS Stars Solar' }],
  creator: 'Seven SS Stars Solar',
  // Fixed typo ("SolPrivacyTermsar") from the previous publisher value.
  publisher: 'Seven SS Stars Solar',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(SITE_URL),
  // P1 #6 -- URL canonicalization: an explicit canonical tag on every page
  // (root here, overridden per-route in each page's own metadata export)
  // backs up the www->non-www redirect in next.config.js.
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    title: 'Seven SS Stars Solar | Solar Water Heaters Kenya',
    description:
      'Seven SS Stars Solar is a leading provider of solar water heaters, solar panels, and solar energy solutions in Kenya. Quality products at competitive prices.',
    siteName: 'Seven SS Stars Solar',
    images: [
      {
        url: '/images/ss1.jpeg',
        width: 1200,
        height: 630,
        alt: 'Seven SS Stars Solar - Solar Water Heaters',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Seven SS Stars Solar | Solar Water Heaters Kenya',
    description:
      'Seven SS Stars Solar is a leading provider of solar water heaters, solar panels, and solar energy solutions in Kenya. Quality products at competitive prices.',
    images: ['/images/ss1.jpeg'],
    // Was '@pamutecsolarkenya' -- the old brand handle (audit P0 #3,
    // fragmented brand identity). Replace with the real, current Twitter/X
    // handle for "Seven SS Stars Solar" once one exists; removed the stale
    // reference in the meantime rather than keep publishing a mismatch.
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'xYONje5Dqc_GPg2Cu16ZUHL5mL9dmlCmcX7KUCvwaz4',
  },
};

// P1 #7 -- Structured data (Schema.org / JSON-LD). This is the single
// highest-leverage fix for the AI Visibility score: without it, search
// engines and AI assistants (ChatGPT, Gemini, Perplexity) have to infer
// what the business is, sells, and where it's located from prose alone.
//
// IMPORTANT: address/geo below are placeholders pulled from company.json.
// See the "_ADDRESS_NEEDS_VERIFICATION" note in that file -- the audit found
// the site text and the embedded Google Maps link point to two different
// addresses. Confirm the real address before this schema goes live, since
// publishing a wrong NAP (Name/Address/Phone) in structured data actively
// hurts local SEO rather than helping it.
function OrganizationJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: company.name,
    legalName: company.legalName,
    url: company.url,
    image: `${SITE_URL}/images/ss1.jpeg`,
    logo: `${SITE_URL}/images/logo.png`,
    description: company.description,
    telephone: company.phones?.[0],
    email: company.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address?.streetAddress,
      addressLocality: company.address?.addressLocality,
      addressCountry: company.address?.addressCountry,
    },
    areaServed: 'KE',
    sameAs: company.sameAs,
  };

  return (
    <Script
      id="organization-jsonld"
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <OrganizationJsonLd />

        {/* P0 #2 -- Google Analytics 4 / Tag Manager.
            afterInteractive keeps this off the critical render path so it
            doesn't add to render-blocking resources (audit item 1.3). */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}

        <ThemeRegistry>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <FloatingButtons />
        </ThemeRegistry>
      </body>
    </html>
  );
}
