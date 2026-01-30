import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Volume1 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import useBackgroundMusic from '@/hooks/useBackgroundMusic';

const VolumeControl = () => {
  const { volume, isMuted, setVolume, toggleMute } = useBackgroundMusic();
  const [isHovered, setIsHovered] = useState(false);

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) {
      return <VolumeX size={16} />;
    }
    if (volume < 0.5) {
      return <Volume1 size={16} />;
    }
    return <Volume2 size={16} />;
  };

  const handleVolumeChange = (values: number[]) => {
    setVolume(values[0]);
  };

  return (
    <div 
      className="relative flex items-center gap-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Volume Slider - apparaît au hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 80 }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <Slider
              value={[isMuted ? 0 : volume]}
              min={0}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
              className="w-20 cursor-pointer"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Icône de volume - clic pour muter */}
      <motion.button
        onClick={toggleMute}
        className="text-foreground hover:text-primary transition-colors p-1"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isMuted ? "Activer le son" : "Couper le son"}
      >
        {getVolumeIcon()}
      </motion.button>
    </div>
  );
};

export default VolumeControl;
