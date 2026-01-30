import { useCallback, useRef, useEffect, useState } from 'react';

// Configuration des fichiers audio officiels
// Les fichiers sont placés dans /public/sounds/
export const SOUND_FILES = [
  '/sounds/01SoundSW.wav',
  '/sounds/02SoundSW.wav',
  '/sounds/03SoundSW.wav',
  '/sounds/04la_c_est_que_ma_bouche.wav',
  '/sounds/05SoundSW.wav',
  '/sounds/06SoundSW.wav',
  '/sounds/07aller_rentre.wav',
  '/sounds/08SoundSW.wav',
  '/sounds/09ça_t_amuse.wav',
  '/sounds/10viens_voir_mon_travail_jsp.wav',
  '/sounds/11t_es_encore_la.wav',
  '/sounds/12bon_aller_on_se_le_refait.wav',
];

export const useSequentialAudio = () => {
  const [currentSoundIndex, setCurrentSoundIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const audioRefs = useRef<HTMLAudioElement[]>([]);
  const isPlayingRef = useRef(false);

  // Pré-chargement des fichiers audio
  useEffect(() => {
    const preloadAudio = async () => {
      const audioElements: HTMLAudioElement[] = [];
      
      for (const soundPath of SOUND_FILES) {
        const audio = new Audio(soundPath);
        audio.preload = 'auto';
        audio.volume = 0.5;
        
        // Attendre le chargement
        await new Promise<void>((resolve) => {
          audio.addEventListener('canplaythrough', () => resolve(), { once: true });
          audio.addEventListener('error', () => {
            console.warn(`Impossible de charger: ${soundPath}`);
            resolve();
          }, { once: true });
          
          // Timeout de sécurité
          setTimeout(resolve, 2000);
        });
        
        audioElements.push(audio);
      }
      
      audioRefs.current = audioElements;
      setIsReady(true);
    };

    preloadAudio();

    // Cleanup
    return () => {
      audioRefs.current.forEach(audio => {
        audio.pause();
        audio.src = '';
      });
    };
  }, []);

  // Jouer le son suivant dans la séquence
  const playNextSound = useCallback(() => {
    if (!isReady || audioRefs.current.length === 0 || isPlayingRef.current) {
      return false;
    }

    const audio = audioRefs.current[currentSoundIndex];
    
    if (audio) {
      isPlayingRef.current = true;
      
      // Réinitialiser au début si déjà joué
      audio.currentTime = 0;
      
      audio.play()
        .then(() => {
          // Avancer à l'index suivant (boucle)
          setCurrentSoundIndex((prev) => (prev + 1) % SOUND_FILES.length);
        })
        .catch((error) => {
          console.warn('Erreur de lecture audio:', error);
        })
        .finally(() => {
          isPlayingRef.current = false;
        });
      
      return true;
    }
    
    return false;
  }, [isReady, currentSoundIndex]);

  // Réinitialiser la séquence
  const resetSequence = useCallback(() => {
    setCurrentSoundIndex(0);
  }, []);

  return {
    playNextSound,
    resetSequence,
    currentSoundIndex,
    totalSounds: SOUND_FILES.length,
    isReady,
  };
};

export default useSequentialAudio;
