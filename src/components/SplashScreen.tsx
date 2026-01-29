import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playRandomSFX, playTransitionSFX } from '@/utils/audio';

interface SplashScreenProps {
  onEnter: () => void;
}

const SplashScreen = ({ onEnter }: SplashScreenProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleLogoClick = () => {
    playRandomSFX();
    setClickCount((prev) => prev + 1);
  };

  const handleEnter = () => {
    setIsExiting(true);
    playTransitionSFX();
    
    // Delay the actual transition to allow animation to play
    setTimeout(() => {
      onEnter();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Noise overlay for splash */}
          <div className="noise-overlay" aria-hidden="true" />
          
          {/* Vignette */}
          <div className="vignette-overlay" aria-hidden="true" />

          {/* Logo Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Interactive Logo */}
            <motion.button
              onClick={handleLogoClick}
              className="relative cursor-pointer select-none focus:outline-none"
              whileHover={{ 
                scale: 1.05,
                filter: 'blur(0px)',
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                filter: clickCount > 0 ? ['blur(2px)', 'blur(0px)'] : 'blur(0px)',
              }}
              transition={{ duration: 0.15 }}
            >
              <motion.span
                className="block font-black text-foreground"
                style={{ 
                  fontSize: 'clamp(6rem, 25vw, 16rem)',
                  lineHeight: 0.85,
                  letterSpacing: '-0.05em',
                }}
                whileHover={{
                  textShadow: '0 0 40px rgba(255,255,255,0.3)',
                }}
              >
                SW.
              </motion.span>
              
              {/* Distortion overlay on hover */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.1 }}
                style={{
                  background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
                  backgroundSize: '200% 200%',
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              />
            </motion.button>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-4 text-xs uppercase tracking-[0.5em] text-muted-foreground"
            >
              Creative House
            </motion.p>
          </motion.div>

          {/* Enter Button */}
          <motion.button
            onClick={handleEnter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="group relative mt-16 z-10"
          >
            <motion.span
              className="relative block px-8 py-4 text-xs font-bold uppercase tracking-[0.3em] text-foreground border border-foreground/30 transition-all duration-300"
              whileHover={{
                borderColor: 'rgba(255,255,255,0.8)',
                boxShadow: '0 0 30px rgba(255,255,255,0.15), inset 0 0 20px rgba(255,255,255,0.05)',
              }}
              whileTap={{ scale: 0.98 }}
            >
              Entrer dans l'expérience
              
              {/* Glow effect */}
              <motion.span
                className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
                  filter: 'blur(20px)',
                }}
              />
            </motion.span>
          </motion.button>

          {/* Hint text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute bottom-8 text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
          >
            Cliquez sur le logo pour déclencher un SFX
          </motion.p>
        </motion.div>
      ) : (
        // Exit animation - curtain reveal effect
        <motion.div
          className="fixed inset-0 z-50 bg-background"
          initial={{ y: 0 }}
          animate={{ y: '-100%' }}
          transition={{ 
            duration: 1.2, 
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          <div className="noise-overlay" aria-hidden="true" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
