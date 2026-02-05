import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ChevronDown } from 'lucide-react';
import { mixProjects, MixProject } from '@/data/projects';

interface MixCardProps {
  project: MixProject;
  index: number;
}

const MixCard = ({ project, index }: MixCardProps) => {
  const isPlaylist = project.type === 'playlist' || project.type === 'album';

  return (
    <motion.a
      href={project.youtubeUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="work-card block group text-foreground"
    >
      <div className="aspect-square bg-secondary overflow-hidden relative mb-3 rounded-xl">
        <img
          src={project.thumbnail}
          alt={`${project.title} - ${project.artist}`}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
        
        {isPlaylist && (
          <div className="absolute top-2.5 left-2.5 z-20">
            <span className="bg-foreground text-background text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider rounded-sm">
              EP
            </span>
          </div>
        )}
        
        <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 flex items-center justify-center">
          <div className="flex items-center gap-2.5 px-5 py-2.5 bg-background/80 backdrop-blur-md border border-foreground/20 rounded-full transition-all duration-300 group-hover:bg-foreground group-hover:border-foreground">
            <Play size={14} className="fill-foreground group-hover:fill-background transition-colors duration-300" />
            <span className="text-foreground text-xs font-semibold tracking-widest uppercase group-hover:text-background transition-colors duration-300">
              Écouter
            </span>
          </div>
        </div>
      </div>
      
      <h3 className="text-base font-black uppercase tracking-tighter leading-tight">
        {project.title}
      </h3>
      <p className="text-muted-foreground text-xs mt-0.5">
        {project.artist}
      </p>
    </motion.a>
  );
};

/** Group projects by year extracted from date field */
const groupByYear = (projects: MixProject[]): Record<string, MixProject[]> => {
  const groups: Record<string, MixProject[]> = {};
  for (const p of projects) {
    const year = p.date.slice(0, 4);
    if (!groups[year]) groups[year] = [];
    groups[year].push(p);
  }
  return groups;
};

const MixSection = () => {
  const grouped = groupByYear(mixProjects);
  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));
  const [openYear, setOpenYear] = useState<string>(years[0] ?? '');

  const toggle = (year: string) => {
    setOpenYear(prev => (prev === year ? '' : year));
  };

  return (
    <section id="mix" className="py-32 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-header text-foreground mb-2">MIX&MASTER</h2>
          <p className="uppercase tracking-[0.4em] text-muted-foreground text-3xl">
            Catalog
          </p>
        </motion.div>

        <div className="space-y-4">
          {years.map((year) => {
            const isOpen = openYear === year;
            return (
              <motion.div
                key={year}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {/* Accordion trigger */}
                <button
                  onClick={() => toggle(year)}
                  className="w-full flex items-center justify-between py-5 border-b border-foreground/10 group/acc cursor-pointer"
                >
                  <span className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-foreground">
                    {year}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground text-sm tracking-widest uppercase hidden sm:inline">
                      {grouped[year].length} {grouped[year].length > 1 ? 'projets' : 'projet'}
                    </span>
                    <ChevronDown
                      size={22}
                      className={`text-muted-foreground transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </div>
                </button>

                {/* Accordion content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key={`content-${year}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8 pt-8 pb-4">
                        {grouped[year].map((project, index) => (
                          <MixCard key={project.id} project={project} index={index} />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MixSection;
