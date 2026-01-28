import NoiseOverlay from '@/components/NoiseOverlay';
import VignetteOverlay from '@/components/VignetteOverlay';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import SoundDesignSection from '@/components/SoundDesignSection';
import MixSection from '@/components/MixSection';
import PacksSection from '@/components/PacksSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <>
      {/* Texture Overlays */}
      <NoiseOverlay />
      <VignetteOverlay />

      {/* Main Content */}
      <div id="main-content">
        <Navigation />
        <HeroSection />
        <SoundDesignSection />
        <MixSection />
        <PacksSection />
        <Footer />
      </div>
    </>
  );
};

export default Index;
