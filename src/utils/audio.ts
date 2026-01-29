// Web Audio API based SFX system
// Placeholder sounds using synthesized audio - replace with real .wav files later

const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

// Generate a click/UI SFX sound using Web Audio API
const generateClickSFX = (frequency: number, duration: number, type: OscillatorType = 'sine') => {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(frequency * 0.5, audioContext.currentTime + duration);
  oscillator.type = type;
  
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
};

// SFX configurations for random click sounds
const clickSFXConfigs = [
  { frequency: 800, duration: 0.1, type: 'sine' as OscillatorType },
  { frequency: 1200, duration: 0.08, type: 'triangle' as OscillatorType },
  { frequency: 600, duration: 0.12, type: 'square' as OscillatorType },
  { frequency: 1000, duration: 0.15, type: 'sine' as OscillatorType },
  { frequency: 900, duration: 0.1, type: 'triangle' as OscillatorType },
];

// Play a random click SFX
export const playRandomSFX = () => {
  // Resume audio context if suspended (required for some browsers)
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  
  const config = clickSFXConfigs[Math.floor(Math.random() * clickSFXConfigs.length)];
  generateClickSFX(config.frequency, config.duration, config.type);
};

// Generate a deep whoosh/transition sound
export const playTransitionSFX = () => {
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  
  const duration = 1.5;
  
  // Low frequency drone
  const oscillator1 = audioContext.createOscillator();
  const gainNode1 = audioContext.createGain();
  oscillator1.connect(gainNode1);
  gainNode1.connect(audioContext.destination);
  
  oscillator1.frequency.setValueAtTime(80, audioContext.currentTime);
  oscillator1.frequency.exponentialRampToValueAtTime(40, audioContext.currentTime + duration);
  oscillator1.type = 'sine';
  
  gainNode1.gain.setValueAtTime(0.4, audioContext.currentTime);
  gainNode1.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
  
  // Higher frequency sweep for "whoosh" effect
  const oscillator2 = audioContext.createOscillator();
  const gainNode2 = audioContext.createGain();
  oscillator2.connect(gainNode2);
  gainNode2.connect(audioContext.destination);
  
  oscillator2.frequency.setValueAtTime(400, audioContext.currentTime);
  oscillator2.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + duration);
  oscillator2.type = 'sawtooth';
  
  gainNode2.gain.setValueAtTime(0.15, audioContext.currentTime);
  gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
  
  // Noise-like texture
  const oscillator3 = audioContext.createOscillator();
  const gainNode3 = audioContext.createGain();
  oscillator3.connect(gainNode3);
  gainNode3.connect(audioContext.destination);
  
  oscillator3.frequency.setValueAtTime(200, audioContext.currentTime);
  oscillator3.frequency.linearRampToValueAtTime(50, audioContext.currentTime + duration);
  oscillator3.type = 'triangle';
  
  gainNode3.gain.setValueAtTime(0.2, audioContext.currentTime);
  gainNode3.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
  
  oscillator1.start(audioContext.currentTime);
  oscillator1.stop(audioContext.currentTime + duration);
  oscillator2.start(audioContext.currentTime);
  oscillator2.stop(audioContext.currentTime + duration);
  oscillator3.start(audioContext.currentTime);
  oscillator3.stop(audioContext.currentTime + duration);
};

// Future: Replace with actual audio file loading
// export const loadAudioFile = async (url: string): Promise<AudioBuffer> => {
//   const response = await fetch(url);
//   const arrayBuffer = await response.arrayBuffer();
//   return await audioContext.decodeAudioData(arrayBuffer);
// };
