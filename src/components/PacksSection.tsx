import { useState } from 'react';
import { motion } from 'framer-motion';
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
  return <motion.div initial={{
    opacity: 0,
    y: 30
  }} whileInView={{
    opacity: 1,
    y: 0
  }} viewport={{
    once: true,
    margin: '-50px'
  }} transition={{
    duration: 0.6,
    delay: index * 0.1
  }} onClick={onClick} className="pack-card cursor-pointer group">
      {/* Image Container */}
      <div className="aspect-square bg-background flex items-center justify-center relative">
        <span className="pack-badge">{pack.badge}</span>
        <div className="text-6xl group-hover:scale-110 transition-transform duration-500 text-foreground">
          {pack.icon}
        </div>
      </div>

      {/* Info */}
      <div className="p-6 border-t border-foreground/5 bg-studio-card">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-black uppercase text-foreground tracking-tighter">
            {pack.title}
          </h3>
          <span className={`text-xs font-bold tracking-widest uppercase ${pack.isFree ? 'text-green-500' : 'text-muted-foreground'}`}>
            {pack.isFree ? 'FREE' : pack.price}
          </span>
        </div>
        <p className="text-xs text-muted-foreground uppercase tracking-widest">
          {pack.sampleCount}
        </p>
      </div>
    </motion.div>;
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