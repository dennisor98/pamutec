import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ThemeRegistry from '@/components/layout/ThemeRegistry';
import FloatingButtons from '@/components/layout/FloatingButtons';

export const metadata: Metadata = {
  title: 'Seven SS Stars Solar - Solar Water Heaters & Solar Panels in Kenya',
  description: 'Seven SS Stars Solar is the leading provider of solar water heaters, solar panels, and solar energy solutions in Kenya. Quality products at competitive prices.',
  keywords: 'solar panels,sevenss,sevenss stars,sevenss stars solar, solar water heater, solar, SevenSS Solar, SevenSSStars Solar, solar energy, solar installation, Kenya solar, solar water heating, thermal solar',
  authors: [{ name: 'Seven SS Stars Solar' }],
  creator: 'Seven SS Stars Solar',
  publisher: 'Seven SS Stars Solar',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://sevenssstarskenya.co.ke'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sevenssstarskenya.co.ke',
    title: 'Seven SS Stars Solar - Solar Water Heaters & Solar Panels in Kenya',
    description: 'Seven SS Stars Solar is the leading provider of solar water heaters, solar panels, and solar energy solutions in Kenya. Quality products at competitive prices.',
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
    title: 'Seven SS Stars Solar - Solar Water Heaters & Solar Panels in Kenya',
    description: 'Seven SS Stars Solar is the leading provider of solar water heaters, solar panels, and solar energy solutions in Kenya. Quality products at competitive prices.',
    images: ['/images/ss1.jpeg'],
    creator: '@pamutecsolarkenya',
  },
  instagram: {
    card: 'summary_large_image',
    title: 'Seven SS Stars Solar - Solar Water Heaters & Solar Panels in Kenya',
    description: 'Seven SS Stars Solar is the leading provider of solar water heaters, solar panels, and solar energy solutions in Kenya. Quality products at competitive prices.',
    images: ['/images/ss1.jpeg'],
    creator: '@pamutecsolarkenya',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
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
