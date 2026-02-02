import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { sfxPacks, Pack } from '@/data/projects';
import PackDetailModal from './PackDetailModal';

interface PackCardProps {
  pack: Pack;
  index: number;
  onClick: () => void;
}

const PackCard = ({
  pack,
  index,
  onClick
}: PackCardProps) => {
  const isLocked = pack.locked;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true, margin: '-50px' }} 
      transition={{ duration: 0.6, delay: index * 0.1 }} 
      onClick={isLocked ? undefined : onClick} 
      className={`pack-card rounded-3xl overflow-hidden relative ${
        isLocked ? 'cursor-not-allowed' : 'cursor-pointer group'
      }`}
    >
      {/* Locked Overlay */}
      {isLocked && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/50" />
          
          {/* Lock icon with glow */}
          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full border border-foreground/30 flex items-center justify-center bg-black/40 shadow-[0_0_20px_rgba(255,255,255,0.15)]">
              <Lock className="w-7 h-7 text-foreground" />
            </div>
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-foreground/80">
              BIENTÔT
            </span>
          </div>
        </div>
      )}

      {/* Image Container */}
      <div className={`aspect-square bg-background flex items-center justify-center relative overflow-hidden rounded-t-3xl ${
        isLocked ? 'blur-sm' : ''
      }`}>
        <span className={`pack-badge ${isLocked ? 'opacity-50' : ''}`}>{pack.badge}</span>
        {pack.coverImage ? (
          <img 
            src={pack.coverImage} 
            alt={pack.title} 
            className={`w-full h-full object-cover transition-transform duration-500 ${
              !isLocked ? 'group-hover:scale-110' : ''
            }`}
          />
        ) : (
          <div className={`text-6xl transition-transform duration-500 text-foreground ${
            !isLocked ? 'group-hover:scale-110' : ''
          }`}>
            {pack.icon}
          </div>
        )}
      </div>

      {/* Info */}
      <div className={`p-6 border-t border-foreground/5 bg-studio-card rounded-b-3xl ${
        isLocked ? 'blur-sm' : ''
      }`}>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-black uppercase text-foreground tracking-tighter">
            {pack.title}
          </h3>
          <span className={`text-xs font-bold tracking-widest uppercase ${pack.isFree ? 'text-green-500' : 'text-muted-foreground'}`}>
            {pack.isFree ? 'GRATUIT' : pack.price}
          </span>
        </div>
        <p className="text-xs text-muted-foreground uppercase tracking-widest">
          {pack.sampleCount}
        </p>
      </div>
    </motion.div>
  );
};
const PacksSection = () => {
  const [selectedPack, setSelectedPack] = useState<Pack | null>(null);
  return <>
      <section id="packs" className="py-32 px-6 md:px-12 bg-background border-t border-foreground/5">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="text-center">
            <h2 className="section-header text-foreground mb-2">SFX Packs</h2>
            <p className="uppercase tracking-[0.4em] text-muted-foreground mb-12 py-0 text-3xl">Catalog</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sfxPacks.map((pack, index) => <PackCard key={pack.id} pack={pack} index={index} onClick={() => setSelectedPack(pack)} />)}
          </div>
        </div>
      </section>

      <PackDetailModal pack={selectedPack} isOpen={!!selectedPack} onClose={() => setSelectedPack(null)} />
    </>;
};
export default PacksSection;