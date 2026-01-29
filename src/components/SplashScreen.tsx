import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useAudio from '@/hooks/useAudio';

interface SplashScreenProps {
  onEnter: () => void;
  isEntering?: boolean;
}

const SplashScreen = ({
  onEnter,
  isEntering = false
}: SplashScreenProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const { playClickSFX, playEnterSFX } = useAudio();

  const handleLogoClick = () => {
    playClickSFX();
  };

  const handleEnter = () => {
    setIsExiting(true);
    playEnterSFX();

    // Delay the actual transition to allow animation to play
    setTimeout(() => {
      onEnter();
    }, 1000);
  };

  const showContent = !isExiting && !isEntering;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="splash-container"
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden"
        initial={{
          opacity: isEntering ? 0 : 1,
          y: isEntering ? -50 : 0
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        exit={{
          opacity: 0,
          y: -100
        }}
        transition={{
          duration: 0.8,
          ease: [0.76, 0, 0.24, 1]
        }}
      >
        {/* Noise overlay */}
        <div className="noise-overlay" aria-hidden="true" />
        
        {/* Vignette */}
        <div className="vignette-overlay" aria-hidden="true" />

        {/* Content */}
        <AnimatePresence mode="wait">
          {showContent && (
            <motion.div
              key="splash-content"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative z-10 flex flex-col items-center"
            >
              {/* Interactive Logo - Clean with subtle scale */}
              <motion.button
                onClick={handleLogoClick}
                className="relative cursor-pointer select-none focus:outline-none group"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <motion.span
                  className="block font-black text-foreground relative"
                  style={{
                    fontSize: 'clamp(6rem, 25vw, 16rem)',
                    lineHeight: 0.85,
                    letterSpacing: '-0.05em'
                  }}
                  whileHover={{
                    textShadow: '0 0 60px rgba(255,255,255,0.4)'
                  }}
                >
                  SW.
                </motion.span>
              </motion.button>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mt-4 text-xs uppercase tracking-[0.5em] text-muted-foreground"
              >
                Creative House
              </motion.p>

              {/* Enter Button - Rounded full */}
              <motion.button
                onClick={handleEnter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="group relative mt-16"
              >
                <motion.span
                  className="relative block px-10 py-4 text-xs font-bold uppercase tracking-[0.3em] text-foreground border border-foreground/30 rounded-full transition-all duration-300"
                  whileHover={{
                    borderColor: 'rgba(255,255,255,0.8)',
                    boxShadow: '0 0 40px rgba(255,255,255,0.2), inset 0 0 30px rgba(255,255,255,0.05)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Entrer
                  
                  {/* Glow effect */}
                  <motion.span
                    className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, transparent 70%)',
                      filter: 'blur(25px)'
                    }}
                  />
                </motion.span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Exit curtain animation */}
        {isExiting && (
          <motion.div
            className="absolute inset-0 bg-background z-20"
            initial={{ scaleY: 0, originY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default SplashScreen;
