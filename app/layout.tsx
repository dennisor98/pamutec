import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ThemeRegistry from '@/components/layout/ThemeRegistry';
import FloatingButtons from '@/components/layout/FloatingButtons';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pamutec Solar - Solar Water Heaters & Solar Panels in Kenya',
  description: 'Pamutec Solar is the leading provider of solar water heaters, solar panels, and solar energy solutions in Kenya. Quality products at competitive prices.',
  keywords: 'solar panels, solar water heater, solar, SevenSS Solar, SevenSSStars Solar, solar energy, solar installation, Kenya solar, solar water heating, thermal solar',
  authors: [{ name: 'Pamutec Solar' }],
  creator: 'Pamutec Solar',
  publisher: 'Pamutec Solar',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://pamutecsolar.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pamutecsolar.com',
    title: 'Pamutec Solar - Solar Water Heaters & Solar Panels in Kenya',
    description: 'Pamutec Solar is the leading provider of solar water heaters, solar panels, and solar energy solutions in Kenya. Quality products at competitive prices.',
    siteName: 'Pamutec Solar',
    images: [
      {
        url: '/images/ss1.jpeg',
        width: 1200,
        height: 630,
        alt: 'Pamutec Solar - Solar Water Heaters',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pamutec Solar - Solar Water Heaters & Solar Panels in Kenya',
    description: 'Pamutec Solar is the leading provider of solar water heaters, solar panels, and solar energy solutions in Kenya. Quality products at competitive prices.',
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
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
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
