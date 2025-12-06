"use client";

import { useState } from "react";
import { Alert } from "@/components/retroui/Alert";
import { Share2, Check, Copy } from "lucide-react";
import { WrappedStats } from "../lib/neynar";

interface ShareButtonProps {
  text: string;
  stats?: WrappedStats;
  appUrl?: string;
  onClick?: () => void;
}

export function ShareButton({ 
  text, 
  stats,
  appUrl = "https://farcaster.xyz/miniapps/JAMionQNBhEJ/farcaster-wrapped-2025", 
  onClick 
}: ShareButtonProps) {
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<"success" | "info">("success");

  const handleShare = async () => {
    // Add app link to share text
    const shareText = `${text}\n\nCheck yours: ${appUrl}`;
    
    try {
      // Simple approach: open Warpcast compose with just text
      const composeUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(shareText)}`;
      
      // Open in new window/tab
      window.open(composeUrl, "_blank");
    } catch {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(shareText);
        setAlertType("success");
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      } catch {
        setAlertType("info");
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      }
    }
    
    onClick?.();
  };

  return (
    <div style={{ position: "relative" }}>
      {/* RetroUI Alert */}
      {showAlert && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1000,
            width: "90%",
            maxWidth: "400px",
          }}
        >
          <Alert status={alertType} className="shadow-[4px_4px_0px_#000000]">
            <Alert.Title className="flex items-center gap-2">
              {alertType === "success" ? <Check size={18} strokeWidth={2.5} /> : <Copy size={18} strokeWidth={2.5} />}
              {alertType === "success" ? "Copied!" : "Ready to share!"}
            </Alert.Title>
            <Alert.Description>
              Text copied to clipboard. Share it on Farcaster!
            </Alert.Description>
          </Alert>
        </div>
      )}

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleShare();
        }}
        className="neo-button"
        style={{
          background: "#FFD93D",
          color: "#000000",
          border: "3px solid #000000",
          boxShadow: "4px 4px 0px #000000",
          padding: "clamp(0.75rem, 3vw, 1rem) clamp(1.5rem, 6vw, 2.5rem)",
          fontSize: "clamp(0.9rem, 3.5vw, 1.125rem)",
          fontWeight: 900,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          minHeight: "48px",
          touchAction: "manipulation",
          WebkitTapHighlightColor: "transparent",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          fontFamily: "inherit",
          transition: "all 0.15s ease",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "translate(-2px, -2px)";
          e.currentTarget.style.boxShadow = "6px 6px 0px #000000";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "translate(0, 0)";
          e.currentTarget.style.boxShadow = "4px 4px 0px #000000";
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = "translate(2px, 2px)";
          e.currentTarget.style.boxShadow = "2px 2px 0px #000000";
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = "translate(-2px, -2px)";
          e.currentTarget.style.boxShadow = "6px 6px 0px #000000";
        }}
      >
        <Share2 size={20} strokeWidth={2.5} />
        <span>Share Wrapped</span>
      </button>
    </div>
  );
}
