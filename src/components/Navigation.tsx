import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { navigationLinks } from '@/data/projects';
import useAudio from '@/hooks/useAudio';
import VolumeControl from '@/components/VolumeControl';

interface NavigationProps {
  onLogoClick?: () => void;
}

const Navigation = ({ onLogoClick }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { playExitSFX } = useAudio();

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onLogoClick) {
      playExitSFX();
      onLogoClick();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="fixed top-0 w-full z-40 p-6 flex justify-between items-center blend-difference"
    >
      <motion.button
        onClick={handleLogoClick}
        className="font-black text-xl tracking-tighter uppercase text-foreground cursor-pointer bg-transparent border-none focus:outline-none"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        SW.
      </motion.button>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8 text-sm uppercase tracking-widest text-foreground">
        {/* Volume Control - avant le premier lien */}
        <VolumeControl />
        
        {navigationLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="nav-link hover:text-primary"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Mobile Navigation */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="md:hidden">
          <button className="text-2xl text-foreground p-2">
            <Menu size={24} />
          </button>
        </SheetTrigger>
        <SheetContent 
          side="right" 
          className="w-full bg-background border-none flex flex-col"
        >
          <div className="flex flex-col items-center justify-center flex-1 space-y-10">
            <AnimatePresence>
              {navigationLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-black uppercase tracking-widest text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </AnimatePresence>
          </div>
          
          {/* Mobile Volume Control */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="pb-12 px-8"
          >
            <div className="flex flex-col items-center gap-4">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Volume</span>
              <VolumeControl isMobile />
            </div>
          </motion.div>
        </SheetContent>
      </Sheet>
    </motion.nav>
  );
};

export default Navigation;
