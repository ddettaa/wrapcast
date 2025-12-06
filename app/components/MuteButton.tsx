"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useSound } from "../context/SoundContext";

export function MuteButton() {
  const { isMuted, toggleMute } = useSound();

  return (
    <button
      onClick={toggleMute}
      aria-label={isMuted ? "Unmute" : "Mute"}
      style={{
        position: "fixed",
        top: "1rem",
        right: "1rem",
        background: "#ffffff",
        border: "3px solid #000000",
        boxShadow: "3px 3px 0px #000000",
        width: "44px",
        height: "44px",
        cursor: "pointer",
        color: "#000000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 200,
        transition: "all 0.15s ease",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "translate(-2px, -2px)";
        e.currentTarget.style.boxShadow = "5px 5px 0px #000000";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "translate(0, 0)";
        e.currentTarget.style.boxShadow = "3px 3px 0px #000000";
      }}
    >
      {isMuted ? (
        <VolumeX size={22} strokeWidth={2.5} />
      ) : (
        <Volume2 size={22} strokeWidth={2.5} />
      )}
    </button>
  );
}
