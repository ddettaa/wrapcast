"use client";

import { WrappedStats } from "../lib/neynar";
import { 
  PenLine, 
  Heart, 
  RefreshCw, 
  MessageCircle, 
  Calendar, 
  Hash, 
  Trophy,
  Star
} from "lucide-react";

interface RecapCardProps {
  stats: WrappedStats;
}

export function RecapCard({ stats }: RecapCardProps) {
  return (
    <div
      className="neo-card"
      style={{
        background: "#ffffff",
        border: "3px solid #000000",
        boxShadow: "6px 6px 0px #000000",
        padding: "clamp(1rem, 3vw, 1.5rem)",
        width: "100%",
        maxWidth: "min(360px, 90vw)",
        margin: "0 auto",
      }}
    >
      {/* User Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "clamp(0.5rem, 2vw, 1rem)",
          marginBottom: "clamp(1rem, 3vw, 1.5rem)",
          paddingBottom: "clamp(0.75rem, 2vw, 1rem)",
          borderBottom: "3px solid #000000",
        }}
      >
        {stats.user.pfp_url && (
          <img
            src={stats.user.pfp_url}
            alt={stats.user.username}
            style={{
              width: "clamp(50px, 15vw, 70px)",
              height: "clamp(50px, 15vw, 70px)",
              border: "3px solid #000000",
              flexShrink: 0,
            }}
          />
        )}
        <div style={{ textAlign: "left", minWidth: 0 }}>
          <div 
            style={{ 
              fontWeight: 900, 
              fontSize: "clamp(1rem, 4vw, 1.25rem)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              textTransform: "uppercase",
            }}
          >
            {stats.user.display_name || stats.user.username}
          </div>
          <div 
            style={{ 
              fontSize: "clamp(0.75rem, 3vw, 0.9rem)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            @{stats.user.username}
          </div>
        </div>
      </div>

      {/* Year Badge */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "clamp(0.75rem, 2vw, 1.25rem)",
        }}
      >
        <span 
          className="neo-badge"
          style={{
            background: "#FFD93D",
            border: "2px solid #000000",
            padding: "0.25rem 0.75rem",
            fontWeight: 700,
            fontSize: "clamp(0.7rem, 2.5vw, 0.85rem)",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
          }}
        >
          <Calendar size={14} strokeWidth={2.5} />
          WRAPPED 2025
        </span>
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "clamp(0.5rem, 2vw, 0.75rem)",
          marginBottom: "clamp(1rem, 3vw, 1.5rem)",
        }}
      >
        <StatBox icon={<PenLine size={20} strokeWidth={2.5} />} value={stats.totalCasts} label="Casts" bgColor="#FF6B6B" />
        <StatBox icon={<Heart size={20} strokeWidth={2.5} />} value={stats.totalLikes} label="Likes" bgColor="#FFD93D" />
        <StatBox icon={<RefreshCw size={20} strokeWidth={2.5} />} value={stats.totalRecasts} label="Recasts" bgColor="#4D96FF" />
        <StatBox icon={<MessageCircle size={20} strokeWidth={2.5} />} value={stats.totalReplies} label="Replies" bgColor="#6BCB77" />
      </div>

      {/* Highlights */}
      <div
        style={{
          background: "#f5f5f5",
          border: "2px solid #000000",
          padding: "clamp(0.75rem, 2vw, 1rem)",
          marginBottom: "clamp(0.75rem, 2vw, 1rem)",
        }}
      >
        <div style={{ 
          fontSize: "clamp(0.7rem, 2.5vw, 0.85rem)", 
          fontWeight: 700, 
          marginBottom: "0.5rem", 
          textTransform: "uppercase",
          display: "flex",
          alignItems: "center",
          gap: "0.35rem",
        }}>
          <Trophy size={14} strokeWidth={2.5} />
          Top Stats
        </div>
        <div style={{ fontSize: "clamp(0.8rem, 3vw, 0.95rem)", lineHeight: 1.8 }}>
          {stats.mostActiveDay && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <Calendar size={14} strokeWidth={2} />
              Most active: <strong>{stats.mostActiveDay}s</strong>
            </div>
          )}
          {stats.topChannel && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <Hash size={14} strokeWidth={2} />
              Favorite: <strong>/{stats.topChannel}</strong>
            </div>
          )}
        </div>
      </div>

      {/* Personality Badge */}
      <div
        style={{
          background: "#C9B1FF",
          border: "2px solid #000000",
          boxShadow: "3px 3px 0px #000000",
          padding: "clamp(0.75rem, 2vw, 1rem)",
          textAlign: "center",
        }}
      >
        <div style={{ 
          fontSize: "clamp(0.65rem, 2vw, 0.8rem)", 
          fontWeight: 700, 
          marginBottom: "0.25rem", 
          textTransform: "uppercase",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.35rem",
        }}>
          <Star size={14} strokeWidth={2.5} />
          Your Personality
        </div>
        <div style={{ fontSize: "clamp(1rem, 4vw, 1.25rem)", fontWeight: 900 }}>
          {stats.personalityType}
        </div>
      </div>

      {/* Top Cast Preview */}
      {stats.topCast && (
        <div
          style={{
            marginTop: "clamp(0.75rem, 2vw, 1rem)",
            background: "#ffffff",
            border: "2px solid #000000",
            padding: "clamp(0.75rem, 2vw, 1rem)",
          }}
        >
          <div style={{ 
            fontSize: "clamp(0.65rem, 2vw, 0.8rem)", 
            fontWeight: 700, 
            marginBottom: "0.5rem", 
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
          }}>
            <Trophy size={14} strokeWidth={2.5} />
            Best Cast
          </div>
          <div 
            style={{ 
              fontSize: "clamp(0.75rem, 2.5vw, 0.9rem)", 
              lineHeight: 1.5,
              wordBreak: "break-word",
            }}
          >
            {stats.topCast.text.slice(0, 80)}
            {stats.topCast.text.length > 80 ? "..." : ""}
          </div>
          <div style={{ 
            fontSize: "clamp(0.65rem, 2vw, 0.8rem)", 
            marginTop: "0.5rem", 
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
          }}>
            <span style={{ display: "flex", alignItems: "center", gap: "0.2rem" }}>
              <Heart size={12} strokeWidth={2} /> {stats.topCast.reactions.likes_count}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.2rem" }}>
              <RefreshCw size={12} strokeWidth={2} /> {stats.topCast.reactions.recasts_count}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.2rem" }}>
              <MessageCircle size={12} strokeWidth={2} /> {stats.topCast.replies.count}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function StatBox({ icon, value, label, bgColor }: { icon: React.ReactNode; value: number; label: string; bgColor: string }) {
  return (
    <div
      style={{
        background: bgColor,
        border: "2px solid #000000",
        boxShadow: "3px 3px 0px #000000",
        padding: "clamp(0.5rem, 2vw, 0.75rem)",
        textAlign: "center",
      }}
    >
      <div style={{ marginBottom: "0.25rem", display: "flex", justifyContent: "center" }}>{icon}</div>
      <div style={{ fontSize: "clamp(1.25rem, 5vw, 1.75rem)", fontWeight: 900 }}>
        {value.toLocaleString()}
      </div>
      <div style={{ fontSize: "clamp(0.6rem, 2vw, 0.75rem)", fontWeight: 700, textTransform: "uppercase" }}>{label}</div>
    </div>
  );
}
