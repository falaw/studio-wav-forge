import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Plus } from 'lucide-react';

interface AudioPlayerProps {
  title: string;
}

const AudioPlayer = ({ title }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('00:00');
  const duration = '01:30';
  const progressBarRef = useRef<HTMLDivElement>(null);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // Simulate progress for demo
    if (!isPlaying) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            return 0;
          }
          const newProgress = prev + 1;
          const seconds = Math.floor((newProgress / 100) * 90);
          const mins = Math.floor(seconds / 60);
          const secs = seconds % 60;
          setCurrentTime(`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
          return newProgress;
        });
      }, 100);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newProgress = (clickX / rect.width) * 100;
      setProgress(Math.max(0, Math.min(100, newProgress)));
      const seconds = Math.floor((newProgress / 100) * 90);
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      setCurrentTime(`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
    }
  };

  return (
    <div className="bg-foreground/5 p-8 border border-foreground/10 mb-12">
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs uppercase font-bold text-foreground">Aperçu Audio</span>
        <span className="text-xs font-mono text-muted-foreground">
          {currentTime} / {duration}
        </span>
      </div>

      {/* Waveform visualization (static mockup) */}
      <div className="flex items-center gap-0.5 h-12 mb-6">
        {Array.from({ length: 60 }).map((_, i) => {
          const height = Math.random() * 80 + 20;
          const isPast = (i / 60) * 100 < progress;
          return (
            <motion.div
              key={i}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: i * 0.01, duration: 0.3 }}
              className={`w-1 rounded-full transition-colors duration-200 ${
                isPast ? 'bg-foreground' : 'bg-foreground/20'
              }`}
              style={{ height: `${height}%` }}
            />
          );
        })}
      </div>

      {/* Progress bar */}
      <div
        ref={progressBarRef}
        className="player-bar mb-6"
        onClick={handleProgressClick}
      >
        <motion.div
          className="player-progress"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          className="w-14 h-14 rounded-full bg-foreground text-background flex items-center justify-center hover:bg-foreground/90 transition-colors"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
        </button>
        <span className="text-sm text-muted-foreground">{title}</span>
      </div>
    </div>
  );
};

export default AudioPlayer;
