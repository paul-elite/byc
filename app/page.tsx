import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import TaxReform from '@/components/TaxReform';
import About from '@/components/About';
import CaseStudies from '@/components/CaseStudies';
import HomeBento from '@/components/bento/HomeBento';
import PortfolioPreview from '@/components/PortfolioPreview';
import BlogSection from '@/components/BlogSection';
import Faq from '@/components/Faq';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <Services />
      <TaxReform />
      <HomeBento />
      <About />
      <CaseStudies />
      <PortfolioPreview />
      <BlogSection />
      <Faq />
      <Contact />
      <Footer showCta={false} />
    </main>
  );
}
