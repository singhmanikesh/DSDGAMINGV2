import { Navbar } from '../components/navbar';
import { Hero } from '../components/hero';
import { Offers } from '../components/offers';
import { AboutUs } from '../components/about-us';
import { Pricing } from '../components/pricing';
import { ContactSection } from '../components/contact-section';
import { MapSection } from '../components/map-section';
import { Footer } from '../components/footer';
import { FloatingBar } from '../components/floating-bar';
import { ElsaChatbot } from '../components/elsa-chatbot';

export function HomePage() {
  return (
    <div className="min-h-screen bg-[#0B0B0F] overflow-x-hidden">
      <Navbar />
      <Hero />
      <Offers />
      <AboutUs />
      <Pricing />
      <ContactSection />
      <MapSection />
      <Footer />
      <FloatingBar />
      <ElsaChatbot />
    </div>
  );
}