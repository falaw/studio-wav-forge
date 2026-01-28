import { motion } from 'framer-motion';
import { mixProjects, MixProject } from '@/data/projects';
interface MixCardProps {
  project: MixProject;
  index: number;
}
const MixCard = ({
  project,
  index
}: MixCardProps) => {
  const getIcon = () => {
    switch (project.type) {
      case 'playlist':
      case 'album':
        return '💽';
      default:
        return '🎵';
    }
  };
  const getButtonLabel = () => {
    switch (project.type) {
      case 'playlist':
        return 'PLAYLIST';
      case 'album':
        return 'ALBUM';
      default:
        return 'ÉCOUTER';
    }
  };
  return <motion.a href={project.youtubeUrl} target="_blank" rel="noopener noreferrer" initial={{
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
  }} className="work-card block group text-foreground">
      <div className="aspect-square bg-secondary overflow-hidden relative mb-4">
        <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
          <span className="text-foreground text-sm border border-foreground px-4 py-2 font-medium">
            {getButtonLabel()}
          </span>
        </div>
        <div className="w-full h-full bg-muted flex items-center justify-center text-4xl group-hover:scale-105 transition-transform duration-700">
          {getIcon()}
        </div>
      </div>
      <h3 className="text-lg font-black uppercase tracking-tighter">{project.title}</h3>
    </motion.a>;
};
const MixSection = () => {
  return <section id="mix" className="py-32 px-6 md:px-12 bg-background">
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
          <h2 className="section-header text-foreground mb-2">MIX&MASTER</h2>
          <p className="uppercase tracking-[0.4em] text-muted-foreground mb-12 text-3xl">Catalog</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
          {mixProjects.map((project, index) => <MixCard key={project.id} project={project} index={index} />)}
        </div>
      </div>
    </section>;
};
export default MixSection;