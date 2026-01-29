import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NoiseOverlay from '@/components/NoiseOverlay';
import VignetteOverlay from '@/components/VignetteOverlay';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import SoundDesignSection from '@/components/SoundDesignSection';
import MixSection from '@/components/MixSection';
import PacksSection from '@/components/PacksSection';
import Footer from '@/components/Footer';
import SplashScreen from '@/components/SplashScreen';

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

  // Handle browser back button - don't show splash again
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisitedSplash');
    if (hasVisited) {
      setShowSplash(false);
    }
  }, []);

  const handleEnterSite = () => {
    sessionStorage.setItem('hasVisitedSplash', 'true');
    setShowSplash(false);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && (
          <SplashScreen onEnter={handleEnterSite} />
        )}
      </AnimatePresence>

      {/* Main Content - always rendered but hidden during splash */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showSplash ? 0 : 1 }}
        transition={{ duration: 0.5, delay: showSplash ? 0 : 0.8 }}
      >
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
      </motion.div>
    </>
  );
};

export default Index;
