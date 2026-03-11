import dynamic from 'next/dynamic';
import HeroSection from '@/components/HeroSection';
import GrainOverlay from '@/components/GrainOverlay';

const WorkSection = dynamic(() => import('@/components/WorkSection'), { ssr: false });
const GallerySection = dynamic(() => import('@/components/GallerySection'), { ssr: false });
const AboutSection = dynamic(() => import('@/components/AboutSection'), { ssr: false });
const ContactSection = dynamic(() => import('@/components/ContactSection'), { ssr: false });
const FloatingNav = dynamic(() => import('@/components/FloatingNav'), { ssr: false });

export default function Home() {
  return (
    <main>
      <GrainOverlay />
      <HeroSection />
      <WorkSection />
      <GallerySection />
      <AboutSection />
      <ContactSection />
      <FloatingNav />
    </main>
  );
}
