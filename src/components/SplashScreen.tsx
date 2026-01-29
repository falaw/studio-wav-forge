import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useAudio from '@/hooks/useAudio';

interface SplashScreenProps {
  onEnter: () => void;
  isEntering?: boolean;
}

const SplashScreen = ({ onEnter, isEntering = false }: SplashScreenProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const [glitchKey, setGlitchKey] = useState(0);
  const { playClickSFX, playEnterSFX } = useAudio();

  const handleLogoClick = () => {
    playClickSFX();
    // Trigger glitch animation by changing key
    setGlitchKey((prev) => prev + 1);
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
        initial={{ opacity: isEntering ? 0 : 1, y: isEntering ? -50 : 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
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
              {/* Interactive Logo with Glitch Effect */}
              <motion.button
                key={`logo-${glitchKey}`}
                onClick={handleLogoClick}
                className="relative cursor-pointer select-none focus:outline-none group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={glitchKey > 0 ? { x: 0 } : false}
                animate={glitchKey > 0 ? {
                  x: [0, -8, 8, -4, 4, 0],
                  filter: [
                    'hue-rotate(0deg)',
                    'hue-rotate(90deg)',
                    'hue-rotate(-90deg)',
                    'hue-rotate(45deg)',
                    'hue-rotate(0deg)',
                  ],
                } : {}}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {/* Glitch layers */}
                <motion.span
                  className="absolute inset-0 font-black text-foreground opacity-0"
                  style={{ 
                    fontSize: 'clamp(6rem, 25vw, 16rem)',
                    lineHeight: 0.85,
                    letterSpacing: '-0.05em',
                    color: 'cyan',
                    left: '3px',
                  }}
                  animate={glitchKey > 0 ? {
                    opacity: [0, 0.8, 0, 0.5, 0],
                    x: [0, 5, -5, 3, 0],
                  } : {}}
                  transition={{ duration: 0.3 }}
                >
                  SW.
                </motion.span>
                
                <motion.span
                  className="absolute inset-0 font-black text-foreground opacity-0"
                  style={{ 
                    fontSize: 'clamp(6rem, 25vw, 16rem)',
                    lineHeight: 0.85,
                    letterSpacing: '-0.05em',
                    color: 'magenta',
                    left: '-3px',
                  }}
                  animate={glitchKey > 0 ? {
                    opacity: [0, 0.8, 0, 0.5, 0],
                    x: [0, -5, 5, -3, 0],
                  } : {}}
                  transition={{ duration: 0.3 }}
                >
                  SW.
                </motion.span>

                {/* Main logo */}
                <motion.span
                  className="block font-black text-foreground relative"
                  style={{ 
                    fontSize: 'clamp(6rem, 25vw, 16rem)',
                    lineHeight: 0.85,
                    letterSpacing: '-0.05em',
                  }}
                  whileHover={{
                    textShadow: '0 0 60px rgba(255,255,255,0.4)',
                  }}
                >
                  SW.
                </motion.span>

                {/* Scan line effect on glitch */}
                <motion.div
                  className="absolute inset-0 pointer-events-none overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={glitchKey > 0 ? {
                    opacity: [0, 1, 0],
                  } : {}}
                  transition={{ duration: 0.2 }}
                >
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-full h-[2px] bg-white/20"
                      style={{ top: `${i * 12.5}%` }}
                      animate={glitchKey > 0 ? {
                        scaleX: [0, 1, 0],
                        x: ['-100%', '0%', '100%'],
                      } : {}}
                      transition={{ duration: 0.3, delay: i * 0.02 }}
                    />
                  ))}
                </motion.div>
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

              {/* Enter Button */}
              <motion.button
                onClick={handleEnter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="group relative mt-16"
              >
                <motion.span
                  className="relative block px-8 py-4 text-xs font-bold uppercase tracking-[0.3em] text-foreground border border-foreground/30 transition-all duration-300"
                  whileHover={{
                    borderColor: 'rgba(255,255,255,0.8)',
                    boxShadow: '0 0 40px rgba(255,255,255,0.2), inset 0 0 30px rgba(255,255,255,0.05)',
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Entrer dans l'expérience
                  
                  {/* Glow effect */}
                  <motion.span
                    className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, transparent 70%)',
                      filter: 'blur(25px)',
                    }}
                  />
                </motion.span>
              </motion.button>

              {/* Hint */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.25 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="mt-12 text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
              >
                Cliquez sur le logo pour déclencher un SFX
              </motion.p>
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
