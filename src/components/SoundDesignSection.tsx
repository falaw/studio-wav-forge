import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { soundDesignProjects, Project } from '@/data/projects';

interface WorkCardProps {
  project: Project;
  index: number;
}

const WorkCard = ({ project, index }: WorkCardProps) => {
  return (
    <motion.a
      href={project.youtubeUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="work-card block group"
    >
      <div className="aspect-video bg-secondary overflow-hidden relative mb-4">
        <div className="absolute inset-0 video-overlay z-10 flex items-end p-6">
          <span className="text-foreground text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">
            Regarder le clip <ExternalLink size={14} />
          </span>
        </div>
        {project.thumbnail ? (
          <img 
            src={project.thumbnail} 
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-700">
            🎬
          </div>
        )}
      </div>
      <h3 className="text-xl font-bold italic text-foreground">{project.title}</h3>
      <p className="text-muted-foreground text-sm mt-1 uppercase tracking-tighter">
        Réal : {project.director}
      </p>
    </motion.a>
  );
};

const SoundDesignSection = () => {
  return (
    <section id="work" className="py-32 px-6 md:px-12 bg-studio-bg-alt">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="section-header text-foreground">Sound Design</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {soundDesignProjects.map((project, index) => (
            <WorkCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SoundDesignSection;
