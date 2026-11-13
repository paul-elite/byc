import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'Contact',
    description: 'Contact Babatunde Yunus & Co. in Abuja or Kwara State about audit, tax, accounting and company secretarial work.',
};

export default function ContactPage() {
    return (
        <main>
            <Navigation />
            <Contact asPage />
            <Footer showCta={false} />
        </main>
    );
}
