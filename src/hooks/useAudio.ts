import { useCallback, useRef } from 'react';

// Web Audio API context - shared instance
let audioContext: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
};

// SFX configurations
const clickSFXConfigs = [
  { frequency: 800, duration: 0.1, type: 'sine' as OscillatorType },
  { frequency: 1200, duration: 0.08, type: 'triangle' as OscillatorType },
  { frequency: 600, duration: 0.12, type: 'square' as OscillatorType },
  { frequency: 1000, duration: 0.15, type: 'sine' as OscillatorType },
  { frequency: 900, duration: 0.1, type: 'triangle' as OscillatorType },
];

export const useAudio = () => {
  const isInitialized = useRef(false);

  const ensureContext = useCallback(() => {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    return ctx;
  }, []);

  // Generate a synthesized sound
  const generateTone = useCallback((
    frequency: number,
    duration: number,
    type: OscillatorType = 'sine',
    volume: number = 0.3
  ) => {
    const ctx = ensureContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(frequency * 0.5, ctx.currentTime + duration);
    oscillator.type = type;

    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  }, [ensureContext]);

  // Play random click SFX
  const playClickSFX = useCallback(() => {
    const config = clickSFXConfigs[Math.floor(Math.random() * clickSFXConfigs.length)];
    generateTone(config.frequency, config.duration, config.type);
  }, [generateTone]);

  // Play enter/transition SFX (whoosh)
  const playEnterSFX = useCallback(() => {
    const ctx = ensureContext();
    const duration = 1.5;

    // Low frequency drone
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.frequency.setValueAtTime(80, ctx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + duration);
    osc1.type = 'sine';
    gain1.gain.setValueAtTime(0.4, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    // Higher sweep
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.frequency.setValueAtTime(400, ctx.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + duration);
    osc2.type = 'sawtooth';
    gain2.gain.setValueAtTime(0.15, ctx.currentTime);
    gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    osc1.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + duration);
    osc2.start(ctx.currentTime);
    osc2.stop(ctx.currentTime + duration);
  }, [ensureContext]);

  // Play exit/close SFX (reverse whoosh)
  const playExitSFX = useCallback(() => {
    const ctx = ensureContext();
    const duration = 0.8;

    // Rising tone
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.frequency.setValueAtTime(100, ctx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + duration);
    osc1.type = 'sine';
    gain1.gain.setValueAtTime(0.3, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    // High ping
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.frequency.setValueAtTime(600, ctx.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + duration * 0.5);
    osc2.type = 'triangle';
    gain2.gain.setValueAtTime(0.2, ctx.currentTime);
    gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration * 0.5);

    osc1.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + duration);
    osc2.start(ctx.currentTime);
    osc2.stop(ctx.currentTime + duration * 0.5);
  }, [ensureContext]);

  return {
    playClickSFX,
    playEnterSFX,
    playExitSFX,
    generateTone,
  };
};

export default useAudio;
