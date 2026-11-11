import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { wedding } from '@/config/wedding';

export function playSoundEffect(src: string, volume = 0.8) {
  if (typeof window === "undefined" || typeof Audio === "undefined") return;
  try {
    const a = new Audio(src);
    a.volume = volume;
    const p = a.play();
    if (p && typeof p.catch === "function") {
      p.catch(() => {});
    }
  } catch {
    // Audio fallback
  }
}

export function playTapSound() {
  playSoundEffect("/tap_sound.wav", 0.9);
}

export function playSparkleSound() {
  playSoundEffect("/sparkle_sound.wav", 0.85);
}

interface AudioContextType {
  playing: boolean;
  toggle: () => void;
  startMusic: () => void;
  playTapSound: () => void;
  playSparkleSound: () => void;
}

const AudioContext = createContext<AudioContextType>({
  playing: false,
  toggle: () => {},
  startMusic: () => {},
  playTapSound,
  playSparkleSound,
});

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof Audio === 'undefined') return;

    const audio = new Audio(wedding.assets.weddingMusic);
    audio.loop = true;
    audio.volume = 0.7;
    audioRef.current = audio;

    const handlePlay = () => setPlaying(true);
    const handlePause = () => setPlaying(false);
    const handleEnded = () => {
      audio.currentTime = 0;
      const p = audio.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const startMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      const p = audio.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {
          // Autoplay policy fallback
        });
      }
    } catch {
      // Audio play error fallback
    }
  };

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (audio.paused) {
        const p = audio.play();
        if (p && typeof p.catch === "function") {
          p.catch(() => {});
        }
      } else {
        audio.pause();
      }
    } catch {
      // Fallback
    }
  };

  return (
    <AudioContext.Provider value={{ playing, toggle, startMusic, playTapSound, playSparkleSound }}>
      {children}
    </AudioContext.Provider>
  );
}

export const useWeddingAudio = () => useContext(AudioContext);
