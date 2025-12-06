"use client";

import { useEffect, useState, useCallback } from "react";
import { sdk } from "@farcaster/miniapp-sdk";
import { SlideCarousel } from "./components/SlideCarousel";
import {
  WrappedSlide,
  StatNumber,
  SlideTitle,
  SlideIcon,
  InlineIcon,
  LoadingSpinner,
  gradients,
} from "./components/WrappedSlide";
import { ShareButton } from "./components/ShareButton";
import { RecapCard } from "./components/RecapCard";
import { WrappedStats } from "./lib/neynar";
import { useSound } from "./context/SoundContext";

type AppState = "loading" | "intro" | "wrapped" | "error";

export default function Home() {
  const [state, setState] = useState<AppState>("loading");
  const [stats, setStats] = useState<WrappedStats | null>(null);
  const [error, setError] = useState<string>("");
  const [fid, setFid] = useState<number | null>(null);
  const [manualFid, setManualFid] = useState<string>("");

  const fetchWrapped = useCallback(async (userFid: number) => {
    setState("loading");
    try {
      const response = await fetch(`/api/wrapped?fid=${userFid}&year=2025`);
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to fetch stats");
      }
      
      const data = await response.json();
      setStats(data);
      setState("wrapped");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setState("error");
    }
  }, []);

  useEffect(() => {
    const initSdk = async () => {
      try {
        await sdk.actions.ready();
        const context = await sdk.context;
        
        if (context?.user?.fid) {
          const userFid = context.user.fid;
          setFid(userFid);
          fetchWrapped(userFid);
        } else {
          setState("intro");
        }
      } catch {
        setState("intro");
      }
    };

    initSdk();
  }, [fetchWrapped]);

  const { playSound } = useSound();

  const handleStart = () => {
    const targetFid = fid || parseInt(manualFid);
    if (targetFid) {
      playSound(); // Start background music
      fetchWrapped(targetFid);
    }
  };

  const generateShareText = () => {
    if (!stats) return "";
    return `My Farcaster Wrapped 2025!

${stats.totalCasts} casts
${stats.totalLikes} likes received
${stats.totalRecasts} recasts
${stats.personalityType}

Check your Wrapped!`;
  };

  // Loading state
  if (state === "loading") {
    return (
      <WrappedSlide bgColor="#FFD93D">
        <SlideIcon icon="sparkles" size={56} />
        <SlideTitle>Loading your Wrapped...</SlideTitle>
        <LoadingSpinner size={48} />
      </WrappedSlide>
    );
  }

  // Error state
  if (state === "error") {
    return (
      <WrappedSlide bgColor="#FF6B6B">
        <SlideIcon icon="frown" size={56} />
        <SlideTitle>Oops! Something went wrong</SlideTitle>
        <div
          style={{
            background: "#ffffff",
            border: "3px solid #000000",
            boxShadow: "4px 4px 0px #000000",
            padding: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          {error}
        </div>
        <button
          onClick={() => setState("intro")}
          className="neo-button"
          style={{
            background: "#ffffff",
            border: "3px solid #000000",
            boxShadow: "4px 4px 0px #000000",
            padding: "1rem 2rem",
            fontWeight: 900,
            cursor: "pointer",
            textTransform: "uppercase",
          }}
        >
          Try Again
        </button>
      </WrappedSlide>
    );
  }

  // Intro state
  if (state === "intro") {
    return (
      <WrappedSlide bgColor="#ffffff">
        <SlideIcon icon="gift" size={56} />
        <SlideTitle>Your Farcaster Wrapped 2025</SlideTitle>
        <p 
          style={{ 
            marginBottom: "2rem", 
            fontSize: "1.1rem",
            fontWeight: 500,
          }}
        >
          Discover your Farcaster highlights from 2025!
        </p>
        
        {!fid && (
          <div style={{ marginBottom: "1.5rem" }}>
            <input
              type="number"
              placeholder="Enter your FID"
              value={manualFid}
              onChange={(e) => setManualFid(e.target.value)}
              className="neo-input"
              style={{
                background: "#ffffff",
                border: "3px solid #000000",
                padding: "0.75rem 1rem",
                fontSize: "1rem",
                textAlign: "center",
                width: "200px",
                fontWeight: 700,
              }}
            />
            <p style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>
              Find your FID at warpcast.com/~/settings
            </p>
          </div>
        )}
        
        <button
          onClick={handleStart}
          disabled={!fid && !manualFid}
          className="neo-button"
          style={{
            background: "#FFD93D",
            border: "3px solid #000000",
            boxShadow: "4px 4px 0px #000000",
            padding: "1rem 2.5rem",
            fontSize: "1.125rem",
            fontWeight: 900,
            cursor: fid || manualFid ? "pointer" : "not-allowed",
            opacity: fid || manualFid ? 1 : 0.5,
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            margin: "0 auto",
          }}
        >
          <InlineIcon icon="sparkles" size={20} />
          Reveal My Wrapped
        </button>
      </WrappedSlide>
    );
  }

  // Wrapped slides
  if (state === "wrapped" && stats) {
    return (
      <SlideCarousel>
        {/* Slide 1: Welcome */}
        <WrappedSlide bgColor="#FFD93D">
          <SlideIcon icon="wave" size={56} />
          <SlideTitle>Hey {stats.user.display_name || stats.user.username}!</SlideTitle>
          <p style={{ fontSize: "1.25rem", fontWeight: 500 }}>
            Let&apos;s look at your 2025 Farcaster journey!
          </p>
        </WrappedSlide>

        {/* Slide 2: Total Casts */}
        <WrappedSlide bgColor="#FF6B6B">
          <SlideIcon icon="pen" size={56} />
          <SlideTitle>You shared your thoughts</SlideTitle>
          <StatNumber value={stats.totalCasts} label="casts in 2025" />
        </WrappedSlide>

        {/* Slide 3: Reactions */}
        <WrappedSlide bgColor="#4D96FF">
          <SlideIcon icon="heart" size={56} />
          <SlideTitle>People loved your content!</SlideTitle>
          <StatNumber value={stats.totalLikes} label="likes received" />
          <StatNumber value={stats.totalRecasts} label="recasts" />
        </WrappedSlide>

        {/* Slide 4: Engagement */}
        <WrappedSlide bgColor="#6BCB77">
          <SlideIcon icon="message" size={56} />
          <SlideTitle>Conversations sparked</SlideTitle>
          <StatNumber value={stats.totalReplies} label="replies to your casts" />
          {stats.mostActiveDay && (
            <div
              style={{
                background: "#ffffff",
                border: "3px solid #000000",
                boxShadow: "4px 4px 0px #000000",
                padding: "0.75rem 1rem",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
              }}
            >
              <InlineIcon icon="calendar" size={18} />
              Most active on <strong>{stats.mostActiveDay}s</strong>
            </div>
          )}
        </WrappedSlide>

        {/* Slide 5: Top Cast */}
        {stats.topCast && (
          <WrappedSlide bgColor="#FF9F45">
            <SlideIcon icon="trophy" size={56} />
            <SlideTitle>Your Top Cast</SlideTitle>
            <div
              style={{
                background: "#ffffff",
                border: "3px solid #000000",
                boxShadow: "4px 4px 0px #000000",
                padding: "1.25rem",
                marginBottom: "1rem",
                textAlign: "left",
                maxWidth: "100%",
              }}
            >
              <p style={{ fontSize: "0.95rem", lineHeight: 1.5, wordBreak: "break-word" }}>
                {stats.topCast.text.slice(0, 150)}
                {stats.topCast.text.length > 150 ? "..." : ""}
              </p>
            </div>
            <div
              style={{
                background: "#ffffff",
                border: "2px solid #000000",
                padding: "0.5rem 1rem",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                <InlineIcon icon="heart" size={16} /> {stats.topCast.reactions.likes_count}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                <InlineIcon icon="refresh" size={16} /> {stats.topCast.reactions.recasts_count}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                <InlineIcon icon="message" size={16} /> {stats.topCast.replies.count}
              </span>
            </div>
          </WrappedSlide>
        )}

        {/* Slide 6: Personality */}
        <WrappedSlide bgColor="#C9B1FF">
          <SlideIcon icon="star" size={56} />
          <SlideTitle>Your Farcaster Personality</SlideTitle>
          <div
            style={{
              background: "#ffffff",
              border: "3px solid #000000",
              boxShadow: "4px 4px 0px #000000",
              padding: "1rem",
              fontSize: "1.5rem",
              fontWeight: 900,
              marginBottom: "1rem",
            }}
          >
            {stats.personalityType}
          </div>
          {stats.topChannel && (
            <div
              style={{
                background: "#FFD93D",
                border: "2px solid #000000",
                padding: "0.5rem 1rem",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
              }}
            >
              <InlineIcon icon="hash" size={18} />
              Favorite channel: <strong>/{stats.topChannel}</strong>
            </div>
          )}
        </WrappedSlide>

        {/* Slide 7: Full Recap */}
        <WrappedSlide bgColor="#ffffff">
          <div style={{ paddingBottom: "5rem" }}>
            <SlideIcon icon="gift" size={56} />
            <SlideTitle>Your Complete Recap</SlideTitle>
            <RecapCard stats={stats} />
            <div style={{ marginTop: "1.5rem", marginBottom: "2rem" }}>
              <ShareButton text={generateShareText()} stats={stats} />
            </div>
          </div>
        </WrappedSlide>
      </SlideCarousel>
    );
  }

  return null;
}
