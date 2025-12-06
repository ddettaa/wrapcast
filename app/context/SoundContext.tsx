"use client";

import { createContext, useContext, useState, useRef, useEffect, ReactNode } from "react";

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playSound: () => void;
}

const SoundContext = createContext<SoundContextType | null>(null);

export function SoundProvider({ children }: { children: ReactNode }) {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element on client side
    audioRef.current = new Audio("/springs! - Magnetic Pluggnb NCS - Copyright Free Music [TubeRipper.cc].m4a");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
    setIsMuted(!isMuted);
  };

  const playSound = () => {
    if (audioRef.current && !isMuted) {
      audioRef.current.play().catch(() => {});
    }
  };

  return (
    <SoundContext.Provider value={{ isMuted, toggleMute, playSound }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSound must be used within SoundProvider");
  }
  return context;
}
