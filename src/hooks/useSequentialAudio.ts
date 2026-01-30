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

// Son de transition (révélation du site)
export const TRANSITION_SFX = '/sounds/transiSWSD2.wav';

// === TIMING CONFIGURATION (ajustable) ===
// Durée totale du son de transition en ms
export const TRANSITION_AUDIO_DURATION_MS = 3500;
// Délai avant de révéler le site (pour synchroniser avec "Studiowav")
export const SITE_REVEAL_DELAY_MS = 1800;
// Durée de l'animation de zoom du logo
export const LOGO_ZOOM_DURATION_MS = 2000;
// Durée du fade-out du logo après le zoom
export const LOGO_FADE_DURATION_MS = 800;

export const useSequentialAudio = () => {
  const [currentSoundIndex, setCurrentSoundIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const audioRefs = useRef<HTMLAudioElement[]>([]);
  const transitionAudioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef(false);

  // Pré-chargement des fichiers audio
  useEffect(() => {
    const preloadAudio = async () => {
      const audioElements: HTMLAudioElement[] = [];
      
      // Pré-charger le son de transition
      const transitionAudio = new Audio(TRANSITION_SFX);
      transitionAudio.preload = 'auto';
      transitionAudio.volume = 0.7; // Volume dominant
      transitionAudioRef.current = transitionAudio;
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

  // Jouer le son de transition (coupe les autres sons)
  const playTransitionSound = useCallback(() => {
    // Couper tous les sons séquentiels en cours
    audioRefs.current.forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
    
    // Jouer le son de transition
    if (transitionAudioRef.current) {
      transitionAudioRef.current.currentTime = 0;
      transitionAudioRef.current.play().catch(console.warn);
    }
  }, []);

  // Réinitialiser la séquence
  const resetSequence = useCallback(() => {
    setCurrentSoundIndex(0);
  }, []);

  return {
    playNextSound,
    playTransitionSound,
    resetSequence,
    currentSoundIndex,
    totalSounds: SOUND_FILES.length,
    isReady,
  };
};

export default useSequentialAudio;
