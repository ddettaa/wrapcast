"use client";

import { ReactNode } from "react";
import { 
  Gift, 
  Sparkles, 
  PenLine, 
  Heart, 
  MessageCircle, 
  Trophy, 
  User,
  Frown,
  Hand,
  RefreshCw,
  Send,
  Calendar,
  Hash,
  Star,
  Loader2
} from "lucide-react";

interface WrappedSlideProps {
  children: ReactNode;
  bgColor?: string;
  className?: string;
}

const bgColors = [
  "#FFD93D", // Yellow
  "#FF6B6B", // Red/Coral
  "#4D96FF", // Blue
  "#6BCB77", // Green
  "#C9B1FF", // Purple
  "#FF9F45", // Orange
  "#ffffff", // White
];

export function WrappedSlide({ children, bgColor, className = "" }: WrappedSlideProps) {
  return (
    <div
      className={`wrapped-slide ${className}`}
      style={{
        background: bgColor || "#ffffff",
        minHeight: "100dvh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(1rem, 4vw, 2rem)",
        paddingTop: "clamp(1.5rem, 6vw, 3rem)",
        paddingBottom: "clamp(4rem, 10vw, 5rem)",
        color: "#000000",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative elements - neobrutalism style */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          width: "clamp(60px, 15vw, 100px)",
          height: "clamp(60px, 15vw, 100px)",
          border: "3px solid #000000",
          background: bgColor === "#FFD93D" ? "#FF6B6B" : "#FFD93D",
          transform: "rotate(12deg)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "60px",
          left: "15px",
          width: "clamp(40px, 10vw, 70px)",
          height: "clamp(40px, 10vw, 70px)",
          border: "3px solid #000000",
          borderRadius: "50%",
          background: bgColor === "#4D96FF" ? "#6BCB77" : "#4D96FF",
          pointerEvents: "none",
        }}
      />
      
      <div 
        style={{ 
          position: "relative", 
          zIndex: 1, 
          maxWidth: "min(400px, 90vw)",
          width: "100%",
          padding: "0 clamp(0.5rem, 2vw, 1rem)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function StatNumber({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) {
  return (
    <div 
      className="neo-card"
      style={{ 
        marginBottom: "clamp(1rem, 3vw, 1.5rem)",
        background: "#ffffff",
        border: "3px solid #000000",
        boxShadow: "4px 4px 0px #000000",
        padding: "1rem",
      }}
    >
      <div
        style={{
          fontSize: "clamp(2.5rem, 12vw, 4rem)",
          fontWeight: "900",
          lineHeight: 1,
          color: "#000000",
        }}
      >
        {value.toLocaleString()}{suffix}
      </div>
      <div
        style={{
          fontSize: "clamp(0.8rem, 3vw, 1rem)",
          marginTop: "0.5rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </div>
    </div>
  );
}

export function SlideTitle({ children }: { children: ReactNode }) {
  return (
    <h1
      style={{
        fontSize: "clamp(1.25rem, 5vw, 1.75rem)",
        fontWeight: 900,
        marginBottom: "clamp(1rem, 4vw, 2rem)",
        lineHeight: 1.3,
        padding: "0 0.5rem",
        textTransform: "uppercase",
        letterSpacing: "-0.02em",
        color: "#000000",
      }}
    >
      {children}
    </h1>
  );
}

// Icon type mapping
export const iconMap = {
  "gift": Gift,
  "sparkles": Sparkles,
  "pen": PenLine,
  "heart": Heart,
  "message": MessageCircle,
  "trophy": Trophy,
  "user": User,
  "frown": Frown,
  "wave": Hand,
  "refresh": RefreshCw,
  "send": Send,
  "calendar": Calendar,
  "hash": Hash,
  "star": Star,
  "loader": Loader2,
} as const;

export type IconType = keyof typeof iconMap;

interface SlideIconProps {
  icon: IconType;
  size?: number;
  className?: string;
}

export function SlideIcon({ icon, size = 56, className = "" }: SlideIconProps) {
  const IconComponent = iconMap[icon];
  
  return (
    <div
      className={className}
      style={{
        background: "#ffffff",
        border: "3px solid #000000",
        boxShadow: "4px 4px 0px #000000",
        width: "fit-content",
        padding: "1rem",
        margin: "0 auto 1.5rem auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <IconComponent 
        size={size} 
        strokeWidth={2.5}
        style={{ color: "#000000" }}
      />
    </div>
  );
}

// Inline icon for text
interface InlineIconProps {
  icon: IconType;
  size?: number;
}

export function InlineIcon({ icon, size = 20 }: InlineIconProps) {
  const IconComponent = iconMap[icon];
  
  return (
    <IconComponent 
      size={size} 
      strokeWidth={2}
      style={{ 
        color: "#000000",
        display: "inline-block",
        verticalAlign: "middle",
        marginRight: "0.25rem",
      }}
    />
  );
}

// Loading spinner
export function LoadingSpinner({ size = 48 }: { size?: number }) {
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        margin: "0 auto",
        border: "4px solid #000000",
        borderTopColor: "transparent",
        borderRadius: "0",
        animation: "spin 0.8s linear infinite",
      }}
    />
  );
}

export { bgColors as gradients };
