import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { navigationLinks } from '@/data/projects';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="fixed top-0 w-full z-40 p-6 flex justify-between items-center blend-difference"
    >
      <a href="#" className="font-black text-xl tracking-tighter uppercase text-foreground">
        SW.
      </a>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-8 text-sm uppercase tracking-widest text-foreground">
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
          className="w-full bg-background border-none"
        >
          <div className="flex flex-col items-center justify-center h-full space-y-10">
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
        </SheetContent>
      </Sheet>
    </motion.nav>
  );
};

export default Navigation;
