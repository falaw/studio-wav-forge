import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, ShoppingCart, Download } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Pack } from '@/data/projects';
import AudioPlayer from './AudioPlayer';
import useBackgroundMusic from '@/hooks/useBackgroundMusic';

interface PackDetailModalProps {
  pack: Pack | null;
  isOpen: boolean;
  onClose: () => void;
}

const PackDetailModal = ({ pack, isOpen, onClose }: PackDetailModalProps) => {
  const { fadeOut, fadeIn, isPlaying } = useBackgroundMusic();

  // Fade out background music when modal opens, fade in when it closes
  useEffect(() => {
    if (isOpen) {
      fadeOut();
    } else {
      // Only fade in if music was playing before
      fadeIn();
    }
  }, [isOpen, fadeOut, fadeIn]);

  if (!pack) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-full h-[90vh] bg-background border-studio-border p-0 overflow-hidden">
        <VisuallyHidden>
          <DialogTitle>{pack.title}</DialogTitle>
        </VisuallyHidden>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full h-full overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="fixed top-8 left-8 z-50 text-xs uppercase tracking-widest font-bold flex items-center gap-2 hover:opacity-50 transition-opacity text-foreground"
          >
            <X size={16} /> Retour
          </button>

          <div className="max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Pack Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="aspect-square bg-secondary border border-foreground/10 flex items-center justify-center text-8xl rounded-3xl overflow-hidden"
            >
              {pack.coverImage ? (
                <img 
                  src={pack.coverImage} 
                  alt={pack.title} 
                  className="w-full h-full object-cover"
                />
              ) : (
                pack.icon
              )}
            </motion.div>

            {/* Pack Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col justify-center"
            >
              <span className="text-xs uppercase tracking-studio text-muted-foreground mb-4">
                SOUND DESIGN PACK
              </span>
              
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 text-foreground uppercase">
                {pack.title}
              </h1>
              
              <p className="text-muted-foreground text-lg mb-12 leading-relaxed">
                {pack.description}
              </p>

              {/* Audio Player */}
              <AudioPlayer title={`${pack.title} - Preview`} />

              {/* Action Buttons */}
              <div className="flex items-center gap-6">
                {pack.isFree && pack.downloadUrl ? (
                  <a 
                    href={pack.downloadUrl}
                    download
                    className="flex-1 bg-foreground text-background py-5 font-black uppercase tracking-tighter hover:bg-foreground/90 transition-colors flex items-center justify-center gap-3 rounded-xl"
                  >
                    <Download size={20} />
                    Télécharger Maintenant
                  </a>
                ) : (
                  <button className="flex-1 bg-foreground text-background py-5 font-black uppercase tracking-tighter hover:bg-foreground/90 transition-colors flex items-center justify-center gap-3 rounded-xl">
                    <ShoppingCart size={20} />
                    Acheter — {pack.price}
                  </button>
                )}
                
                <button className="w-16 h-16 border border-foreground/20 flex items-center justify-center hover:bg-foreground/5 transition-colors text-foreground rounded-xl">
                  <Plus size={24} />
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default PackDetailModal;
