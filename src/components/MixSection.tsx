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
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="work-card block group text-foreground"
    >
      <div className="aspect-square bg-secondary overflow-hidden relative mb-4">
        {/* Cover Image */}
        <img
          src={project.thumbnail}
          alt={`${project.title} - ${project.artist}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        
        {/* Playlist/EP Badge */}
        {isPlaylist && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-foreground text-background text-xs font-bold px-2 py-1 uppercase tracking-wider">
              EP
            </span>
          </div>
        )}
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
          <div className="flex items-center gap-2 border border-foreground px-5 py-2.5 bg-background/20 backdrop-blur-sm">
            <Play size={16} className="fill-foreground" />
            <span className="text-foreground text-sm font-medium tracking-wider">
              ÉCOUTER
            </span>
          </div>
        </div>
      </div>
      
      {/* Text Content */}
      <h3 className="text-lg font-black uppercase tracking-tighter leading-tight">
        {project.title}
      </h3>
      <p className="text-muted-foreground text-sm mt-1">
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
          {mixProjects.map((project, index) => (
            <MixCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MixSection;