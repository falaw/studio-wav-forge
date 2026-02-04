import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Volume1 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import useBackgroundMusic from '@/hooks/useBackgroundMusic';

interface VolumeControlProps {
  isMobile?: boolean;
}

const VolumeControl = ({ isMobile = false }: VolumeControlProps) => {
  const { volume, isMuted, setVolume, toggleMute } = useBackgroundMusic();
  const [isHovered, setIsHovered] = useState(false);

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) {
      return <VolumeX size={isMobile ? 24 : 16} />;
    }
    if (volume < 0.5) {
      return <Volume1 size={isMobile ? 24 : 16} />;
    }
    return <Volume2 size={isMobile ? 24 : 16} />;
  };

  const handleVolumeChange = (values: number[]) => {
    setVolume(values[0]);
  };

  // Mobile version - always visible slider
  if (isMobile) {
    return (
      <div className="flex items-center gap-4 w-full max-w-xs">
        <motion.button
          onClick={toggleMute}
          className="text-foreground hover:text-primary transition-colors p-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isMuted ? "Activer le son" : "Couper le son"}
        >
          {getVolumeIcon()}
        </motion.button>
        
        <Slider
          value={[isMuted ? 0 : volume]}
          min={0}
          max={1}
          step={0.01}
          onValueChange={handleVolumeChange}
          className="flex-1 cursor-pointer touch-pan-y"
        />
      </div>
    );
  }

  // Desktop version - hover to show slider
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
