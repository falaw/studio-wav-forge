import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="work-card block group text-foreground"
    >
      <div className="aspect-square bg-secondary overflow-hidden relative mb-3 rounded-xl">
        {/* Cover Image */}
        <img
          src={project.thumbnail}
          alt={`${project.title} - ${project.artist}`}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Playlist/EP Badge */}
        {isPlaylist && (
          <div className="absolute top-2.5 left-2.5 z-20">
            <span className="bg-foreground text-background text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider rounded-sm">
              EP
            </span>
          </div>
        )}
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 flex items-center justify-center">
          <div className="flex items-center gap-2.5 px-5 py-2.5 bg-background/80 backdrop-blur-md border border-foreground/20 rounded-full transition-all duration-300 group-hover:bg-foreground group-hover:border-foreground">
            <Play size={14} className="fill-foreground group-hover:fill-background transition-colors duration-300" />
            <span className="text-foreground text-xs font-semibold tracking-widest uppercase group-hover:text-background transition-colors duration-300">
              Écouter
            </span>
          </div>
        </div>
      </div>
      
      {/* Text Content */}
      <h3 className="text-base font-black uppercase tracking-tighter leading-tight">
        {project.title}
      </h3>
      <p className="text-muted-foreground text-xs mt-0.5">
        {project.artist}
      </p>
    </motion.a>
  );
};

const MixSection = () => {
  return (
    <section id="mix" className="py-32 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="section-header text-foreground mb-2">MIX&MASTER</h2>
          <p className="uppercase tracking-[0.4em] text-muted-foreground mb-12 text-3xl">
            Catalog
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8">
          {mixProjects.map((project, index) => (
            <MixCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MixSection;