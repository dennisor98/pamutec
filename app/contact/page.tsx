import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact Us | Seven SS Stars Solar',
  description:
    'Get in touch with Seven SS Stars Solar by phone, WhatsApp, or email for solar water heater and solar panel quotes across Kenya.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Us | Seven SS Stars Solar',
    description:
      'Get in touch with Seven SS Stars Solar by phone, WhatsApp, or email for solar water heater and solar panel quotes across Kenya.',
    url: 'https://sevenssstarskenya.co.ke/contact',
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
