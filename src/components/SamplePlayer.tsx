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

  return (
    <div className="space-y-3">
      {samples.map((sample, index) => {
        const isPlaying = currentlyPlaying === sample.id;

        return (
          <motion.button
            key={sample.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => togglePlay(sample)}
            className={`
              w-full flex items-center justify-between gap-4 
              px-6 py-4 
              rounded-full
              transition-all duration-300 ease-out
              ${isPlaying 
                ? `
                  bg-[#1a1a1a]
                  shadow-[inset_3px_3px_6px_rgba(0,0,0,0.8),inset_-2px_-2px_4px_rgba(60,60,60,0.15)]
                ` 
                : `
                  bg-[#1c1c1c]
                  shadow-[6px_6px_12px_rgba(0,0,0,0.8),-4px_-4px_10px_rgba(60,60,60,0.08)]
                  hover:shadow-[8px_8px_16px_rgba(0,0,0,0.9),-5px_-5px_12px_rgba(70,70,70,0.1)]
                  hover:bg-[#1e1e1e]
                `
              }
            `}
            style={{
              boxShadow: isPlaying 
                ? 'inset 3px 3px 6px rgba(0,0,0,0.8), inset -2px -2px 4px rgba(60,60,60,0.15), 0 0 20px rgba(251,146,60,0.3), 0 0 40px rgba(251,146,60,0.15)'
                : undefined
            }}
          >
            {/* Sample Name - Left */}
            <span className={`
              text-sm font-medium truncate text-left flex-1
              transition-colors duration-300
              ${isPlaying ? 'text-orange-400' : 'text-foreground/80'}
            `}>
              {sample.name}
            </span>

            {/* Play/Pause Icon - Right */}
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center shrink-0
              transition-all duration-300
              ${isPlaying 
                ? `
                  bg-gradient-to-br from-orange-500 to-amber-600
                  shadow-[0_0_15px_rgba(251,146,60,0.5),0_0_30px_rgba(251,146,60,0.25)]
                ` 
                : `
                  bg-[#252525]
                  shadow-[3px_3px_6px_rgba(0,0,0,0.7),-2px_-2px_4px_rgba(60,60,60,0.1)]
                `
              }
            `}>
              {isPlaying ? (
                <Pause size={16} className="text-white" />
              ) : (
                <Play size={16} className="text-foreground/70 ml-0.5" />
              )}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};

export default SamplePlayer;
