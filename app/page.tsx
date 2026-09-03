import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import CaseStudies from '@/components/CaseStudies';
import BlogSection from '@/components/BlogSection';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <Services />
      <About />
      <CaseStudies />
      <BlogSection />
      <Contact />
      <Footer />
    </main>
  );
}
