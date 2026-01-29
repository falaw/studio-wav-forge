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
  const [isEnteringSplash, setIsEnteringSplash] = useState(false);

  // Handle browser back button - don't show splash again on refresh
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisitedSplash');
    if (hasVisited) {
      setShowSplash(false);
    }
  }, []);

  const handleEnterSite = () => {
    sessionStorage.setItem('hasVisitedSplash', 'true');
    setShowSplash(false);
    setIsEnteringSplash(false);
  };

  const handleReturnToSplash = () => {
    setIsEnteringSplash(true);
    // Small delay for exit animation
    setTimeout(() => {
      setShowSplash(true);
      setIsEnteringSplash(false);
      // Scroll to top when returning
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 400);
  };

  return (
    <>
      {/* Splash Screen */}
      <AnimatePresence mode="wait">
        {showSplash && (
          <SplashScreen 
            onEnter={handleEnterSite} 
            isEntering={isEnteringSplash}
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {!showSplash && !isEnteringSplash && (
          <motion.div
            key="main-site"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Texture Overlays */}
            <NoiseOverlay />
            <VignetteOverlay />

            {/* Main Content */}
            <div id="main-content">
              <Navigation onLogoClick={handleReturnToSplash} />
              <HeroSection />
              <SoundDesignSection />
              <MixSection />
              <PacksSection />
              <Footer />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exit transition overlay */}
      <AnimatePresence>
        {isEnteringSplash && (
          <motion.div
            className="fixed inset-0 z-50 bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Index;
