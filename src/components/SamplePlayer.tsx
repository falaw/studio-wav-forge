import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';

interface Sample {
  id: string;
  name: string;
  url: string;
}

interface SamplePlayerProps {
  samples: Sample[];
  onPlayStateChange?: (isPlaying: boolean) => void;
}

const SamplePlayer = ({ samples, onPlayStateChange }: SamplePlayerProps) => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [progress, setProgress] = useState<Record<string, number>>({});
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});
  const animationFrameRefs = useRef<Record<string, number>>({});

  useEffect(() => {
    // Cleanup audio on unmount
    return () => {
      Object.values(audioRefs.current).forEach(audio => {
        audio.pause();
        audio.src = '';
      });
      Object.values(animationFrameRefs.current).forEach(cancelAnimationFrame);
    };
  }, []);

  const updateProgress = (sampleId: string) => {
    const audio = audioRefs.current[sampleId];
    if (audio && !audio.paused) {
      const progressPercent = (audio.currentTime / audio.duration) * 100;
      setProgress(prev => ({ ...prev, [sampleId]: progressPercent }));
      animationFrameRefs.current[sampleId] = requestAnimationFrame(() => updateProgress(sampleId));
    }
  };

  const togglePlay = (sample: Sample) => {
    // Stop currently playing sample
    if (currentlyPlaying && currentlyPlaying !== sample.id) {
      const currentAudio = audioRefs.current[currentlyPlaying];
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        cancelAnimationFrame(animationFrameRefs.current[currentlyPlaying]);
        setProgress(prev => ({ ...prev, [currentlyPlaying]: 0 }));
      }
    }

    // Get or create audio element
    if (!audioRefs.current[sample.id]) {
      const audio = new Audio(sample.url);
      audio.addEventListener('ended', () => {
        setCurrentlyPlaying(null);
        setProgress(prev => ({ ...prev, [sample.id]: 0 }));
        onPlayStateChange?.(false);
      });
      audioRefs.current[sample.id] = audio;
    }

    const audio = audioRefs.current[sample.id];

    if (currentlyPlaying === sample.id) {
      // Pause current
      audio.pause();
      cancelAnimationFrame(animationFrameRefs.current[sample.id]);
      setCurrentlyPlaying(null);
      onPlayStateChange?.(false);
    } else {
      // Play new
      audio.play();
      setCurrentlyPlaying(sample.id);
      onPlayStateChange?.(true);
      updateProgress(sample.id);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>, sample: Sample) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = (clickX / rect.width) * 100;
    
    if (audioRefs.current[sample.id]) {
      const audio = audioRefs.current[sample.id];
      audio.currentTime = (newProgress / 100) * audio.duration;
      setProgress(prev => ({ ...prev, [sample.id]: newProgress }));
    }
  };

  return (
    <div className="space-y-3">
      {samples.map((sample, index) => {
        const isPlaying = currentlyPlaying === sample.id;
        const sampleProgress = progress[sample.id] || 0;

        return (
          <motion.div
            key={sample.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center gap-4 bg-foreground/5 border border-foreground/10 p-4 rounded-xl hover:bg-foreground/10 transition-colors"
          >
            {/* Play/Pause Button */}
            <button
              onClick={() => togglePlay(sample)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                isPlaying 
                  ? 'bg-foreground text-background' 
                  : 'bg-foreground/10 text-foreground hover:bg-foreground/20'
              }`}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
            </button>

            {/* Sample Info */}
            <div className="flex-1 min-w-0">
              <span className="text-sm font-medium text-foreground truncate block">
                {sample.name}
              </span>
              
              {/* Progress Bar */}
              <div 
                className="mt-2 h-1 bg-foreground/10 rounded-full cursor-pointer overflow-hidden"
                onClick={(e) => handleProgressClick(e, sample)}
              >
                <motion.div
                  className="h-full bg-foreground rounded-full"
                  style={{ width: `${sampleProgress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default SamplePlayer;
