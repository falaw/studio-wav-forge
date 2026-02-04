import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { soundDesignProjects, Project } from '@/data/projects';
interface WorkCardProps {
  project: Project;
  index: number;
}
const WorkCard = ({
  project,
  index
}: WorkCardProps) => {
  // Détermine l'URL à utiliser (YouTube ou externe)
  const linkUrl = project.youtubeUrl || project.externalUrl || '#';
  
  return (
    <motion.a 
      href={linkUrl} 
      target="_blank" 
      rel="noopener noreferrer" 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="work-card block group"
    >
      <div className="aspect-video bg-secondary overflow-hidden relative mb-4 rounded-xl">
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex items-center gap-2.5 px-5 py-2.5 bg-background/80 backdrop-blur-md border border-foreground/20 rounded-full transition-all duration-300 group-hover:bg-foreground group-hover:border-foreground">
            <ExternalLink size={14} className="text-foreground group-hover:text-background transition-colors duration-300" />
            <span className="text-foreground text-xs font-semibold tracking-widest uppercase group-hover:text-background transition-colors duration-300">
              Regarder
            </span>
          </div>
        </div>
        {project.thumbnail ? (
          <img 
            src={project.thumbnail} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" 
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center text-4xl transition-transform duration-500 ease-out group-hover:scale-105">
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
  return <section id="work" className="py-32 px-6 md:px-12 bg-studio-bg-alt">
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
          <h2 className="section-header text-foreground px-0 mx-0 mb-2 py-0">SOUND DESIGN</h2>
          <p className="uppercase tracking-[0.4em] text-muted-foreground mb-12 text-3xl mx-0 my-0 px-0 py-0">Catalog</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {soundDesignProjects.map((project, index) => <WorkCard key={project.id} project={project} index={index} />)}
        </div>
      </div>
    </section>;
};
export default SoundDesignSection;