import HeroSection from '@/components/HeroSection';
import WorkSection from '@/components/WorkSection';
import GallerySection from '@/components/GallerySection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import FloatingNav from '@/components/FloatingNav';
import GrainOverlay from '@/components/GrainOverlay';

export default function Home() {
  return (
    <main>
      <GrainOverlay />
      <HeroSection />
      <WorkSection />
      <GallerySection />
      <AboutSection />
      <ContactSection />
      <Footer />
      <FloatingNav />
    </main>
  );
}
