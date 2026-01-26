import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';

export default function ContactPage() {
    return (
        <main>
            <Navigation />

            {/* Hero Section */}
            <section className="pt-32 pb-12 bg-gradient-to-br from-primary-600 to-primary-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        Contact Us
                    </h1>
                    <p className="text-xl text-primary-100 max-w-3xl mx-auto">
                        We're here to help transform your business. Reach out today.
                    </p>
                </div>
            </section>

            <Contact />
            <Footer />
        </main>
    );
}
