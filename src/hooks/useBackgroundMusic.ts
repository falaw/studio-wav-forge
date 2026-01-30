import { useCallback, useRef, useEffect, useState } from 'react';

// Configuration
export const BACKGROUND_MUSIC_PATH = '/sounds/musicsw1.mp3';
export const FADE_DURATION_MS = 1000;
const DEFAULT_VOLUME = 0.3;

// Singleton pour persister l'audio entre les rendus
let audioInstance: HTMLAudioElement | null = null;
let globalVolume = DEFAULT_VOLUME;
let isMutedGlobal = false;

export const useBackgroundMusic = () => {
  const [volume, setVolumeState] = useState(globalVolume);
  const [isMuted, setIsMutedState] = useState(isMutedGlobal);
  const [isPlaying, setIsPlaying] = useState(false);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialiser l'audio une seule fois
  useEffect(() => {
    if (!audioInstance) {
      audioInstance = new Audio(BACKGROUND_MUSIC_PATH);
      audioInstance.loop = true;
      audioInstance.volume = isMutedGlobal ? 0 : globalVolume;
      audioInstance.preload = 'auto';
    }

    // Synchroniser l'état de lecture
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    
    audioInstance.addEventListener('play', handlePlay);
    audioInstance.addEventListener('pause', handlePause);

    return () => {
      audioInstance?.removeEventListener('play', handlePlay);
      audioInstance?.removeEventListener('pause', handlePause);
    };
  }, []);

  // Nettoyer le fade interval
  const clearFadeInterval = useCallback(() => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
  }, []);

  // Fade-in progressif
  const fadeIn = useCallback((targetVolume?: number) => {
    if (!audioInstance) return;
    
    clearFadeInterval();
    
    const target = targetVolume ?? globalVolume;
    const startVolume = 0;
    const steps = 50;
    const stepDuration = FADE_DURATION_MS / steps;
    const volumeStep = target / steps;
    
    audioInstance.volume = startVolume;
    
    if (audioInstance.paused) {
      audioInstance.play().catch(console.warn);
    }
    
    let currentStep = 0;
    fadeIntervalRef.current = setInterval(() => {
      currentStep++;
      const newVolume = Math.min(startVolume + volumeStep * currentStep, target);
      audioInstance!.volume = isMutedGlobal ? 0 : newVolume;
      
      if (currentStep >= steps) {
        clearFadeInterval();
      }
    }, stepDuration);
  }, [clearFadeInterval]);

  // Fade-out progressif
  const fadeOut = useCallback((callback?: () => void) => {
    if (!audioInstance) {
      callback?.();
      return;
    }
    
    clearFadeInterval();
    
    const startVolume = audioInstance.volume;
    const steps = 50;
    const stepDuration = FADE_DURATION_MS / steps;
    const volumeStep = startVolume / steps;
    
    let currentStep = 0;
    fadeIntervalRef.current = setInterval(() => {
      currentStep++;
      const newVolume = Math.max(startVolume - volumeStep * currentStep, 0);
      audioInstance!.volume = newVolume;
      
      if (currentStep >= steps) {
        clearFadeInterval();
        audioInstance?.pause();
        audioInstance!.currentTime = 0;
        callback?.();
      }
    }, stepDuration);
  }, [clearFadeInterval]);

  // Démarrer la musique (avec fade-in)
  const startMusic = useCallback(() => {
    if (!audioInstance) return;
    
    if (isMutedGlobal) {
      audioInstance.volume = 0;
      audioInstance.play().catch(console.warn);
    } else {
      fadeIn(globalVolume);
    }
  }, [fadeIn]);

  // Arrêter la musique (avec fade-out)
  const stopMusic = useCallback((immediate = false) => {
    if (!audioInstance) return;
    
    if (immediate) {
      audioInstance.pause();
      audioInstance.currentTime = 0;
    } else {
      fadeOut();
    }
  }, [fadeOut]);

  // Régler le volume
  const setVolume = useCallback((newVolume: number) => {
    globalVolume = Math.max(0, Math.min(1, newVolume));
    setVolumeState(globalVolume);
    
    if (audioInstance && !isMutedGlobal) {
      audioInstance.volume = globalVolume;
    }
  }, []);

  // Basculer le mute
  const toggleMute = useCallback(() => {
    isMutedGlobal = !isMutedGlobal;
    setIsMutedState(isMutedGlobal);
    
    if (audioInstance) {
      audioInstance.volume = isMutedGlobal ? 0 : globalVolume;
    }
  }, []);

  // Définir le mute
  const setMuted = useCallback((muted: boolean) => {
    isMutedGlobal = muted;
    setIsMutedState(muted);
    
    if (audioInstance) {
      audioInstance.volume = muted ? 0 : globalVolume;
    }
  }, []);

  return {
    volume,
    isMuted,
    isPlaying,
    setVolume,
    toggleMute,
    setMuted,
    startMusic,
    stopMusic,
    fadeIn,
    fadeOut,
  };
};

export default useBackgroundMusic;
