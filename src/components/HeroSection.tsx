import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
const HeroSection = () => {
  return <header className="min-h-screen flex flex-col justify-center items-center text-center relative px-[26px]">
      <motion.div initial={{
      opacity: 0,
      y: 30
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 1,
      ease: 'easeOut'
    }} className="relative z-10">
        <motion.p initial={{
        opacity: 0
      }} animate={{
        opacity: 0.6
      }} transition={{
        delay: 0.3,
        duration: 0.8
      }} className="presenter-tag">
          Falaw présente
        </motion.p>
        
        <motion.span initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }} transition={{
        delay: 0.5,
        duration: 0.8
      }} className="studio-title text-foreground block">
          STUDIOWAV
        </motion.span>
        
        <motion.h1 initial={{
        opacity: 0
      }} animate={{
        opacity: 0.9
      }} transition={{
        delay: 0.7,
        duration: 0.8
      }} className="creative-house uppercase tracking-tighter text-foreground px-0 mx-0 my-[29px]">
          CREATIVE HOUSE
        </motion.h1>
      </motion.div>

      <motion.a href="#work" initial={{
      opacity: 0
    }} animate={{
      opacity: 0.3
    }} transition={{
      delay: 1.2,
      duration: 0.8
    }} className="absolute bottom-10 text-foreground animate-bounce-subtle">
        <ChevronDown size={32} />
      </motion.a>
    </header>;
};
export default HeroSection;