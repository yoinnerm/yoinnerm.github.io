/**
 * Utility for mechanical keyboard click audio effects
 */

let audioCtx: AudioContext | null = null;
let soundEnabled = true;

// Initialize sound preference
if (typeof window !== 'undefined') {
  const saved = localStorage.getItem('alicar_sound_enabled');
  if (saved !== null) {
    soundEnabled = saved === 'true';
  }
}

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

export function toggleSound(): boolean {
  soundEnabled = !soundEnabled;
  if (typeof window !== 'undefined') {
    localStorage.setItem('alicar_sound_enabled', String(soundEnabled));
  }
  if (soundEnabled) {
    playMechanicalClick();
  }
  return soundEnabled;
}

/**
 * Plays a realistic mechanical keyboard click (Cherry MX Blue/Brown style)
 * Uses high-performance Web Audio API with audio file fallback
 */
export function playMechanicalClick(type: 'click' | 'pop' = 'click') {
  if (!soundEnabled || typeof window === 'undefined') return;

  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;

    if (type === 'click') {
      // 1. Sharp switch actuation click (high frequency burst)
      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();

      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(3400, now);
      osc1.frequency.exponentialRampToValueAtTime(1800, now + 0.012);

      gain1.gain.setValueAtTime(0.28, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.018);

      osc1.connect(gain1);
      gain1.connect(audioCtx.destination);
      osc1.start(now);
      osc1.stop(now + 0.02);

      // 2. Switch bottom-out mechanical thud
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(320, now + 0.003);
      osc2.frequency.exponentialRampToValueAtTime(140, now + 0.035);

      gain2.gain.setValueAtTime(0.22, now + 0.003);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);
      osc2.start(now + 0.003);
      osc2.stop(now + 0.045);
    } else {
      // Gentle bubble/pop click
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(750, now);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.04);

      gain.gain.setValueAtTime(0.24, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    }
  } catch {
    // If Web Audio fails, try HTMLAudioElement fallback
    try {
      const audio = new Audio(type === 'pop' ? './sounds/pop.wav' : './sounds/click.wav');
      audio.volume = 0.3;
      audio.play().catch(() => {});
    } catch {
      // Audio not supported
    }
  }
}
