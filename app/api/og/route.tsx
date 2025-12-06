import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  const username = searchParams.get("username") || "User";
  const displayName = searchParams.get("displayName") || username;
  const pfp = searchParams.get("pfp") || "";
  const casts = searchParams.get("casts") || "0";
  const likes = searchParams.get("likes") || "0";
  const recasts = searchParams.get("recasts") || "0";
  const replies = searchParams.get("replies") || "0";
  const personality = searchParams.get("personality") || "Farcaster Fan";
  const topChannel = searchParams.get("topChannel") || "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #8468FA 0%, #6B4CE6 100%)",
          padding: "40px",
        }}
      >
        {/* Title */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <span style={{ fontSize: "32px", marginRight: "12px" }}>🎁</span>
          <span
            style={{
              fontSize: "28px",
              fontWeight: 900,
              color: "#FFD93D",
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            Farcaster Wrapped 2025
          </span>
        </div>

        {/* Card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            background: "#ffffff",
            border: "4px solid #000000",
            boxShadow: "8px 8px 0px #000000",
            padding: "32px",
            width: "500px",
          }}
        >
          {/* User Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "24px",
              paddingBottom: "20px",
              borderBottom: "4px solid #000000",
            }}
          >
            {pfp ? (
              <img
                src={pfp}
                width={70}
                height={70}
                style={{
                  border: "3px solid #000000",
                  marginRight: "16px",
                }}
              />
            ) : (
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  background: "#FFD93D",
                  border: "3px solid #000000",
                  marginRight: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "32px",
                }}
              >
                👤
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: "24px",
                  fontWeight: 900,
                  textTransform: "uppercase",
                }}
              >
                {displayName}
              </span>
              <span style={{ fontSize: "16px", color: "#666666" }}>
                @{username}
              </span>
            </div>
          </div>

          {/* Stats Grid */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              marginBottom: "20px",
            }}
          >
            {/* Casts */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                background: "#FF6B6B",
                border: "2px solid #000000",
                boxShadow: "3px 3px 0px #000000",
                padding: "12px",
                width: "110px",
              }}
            >
              <span style={{ fontSize: "24px", fontWeight: 900 }}>{casts}</span>
              <span style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase" }}>CASTS</span>
            </div>
            
            {/* Likes */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                background: "#FFD93D",
                border: "2px solid #000000",
                boxShadow: "3px 3px 0px #000000",
                padding: "12px",
                width: "110px",
              }}
            >
              <span style={{ fontSize: "24px", fontWeight: 900 }}>{likes}</span>
              <span style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase" }}>LIKES</span>
            </div>
            
            {/* Recasts */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                background: "#4D96FF",
                border: "2px solid #000000",
                boxShadow: "3px 3px 0px #000000",
                padding: "12px",
                width: "110px",
              }}
            >
              <span style={{ fontSize: "24px", fontWeight: 900 }}>{recasts}</span>
              <span style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase" }}>RECASTS</span>
            </div>
            
            {/* Replies */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                background: "#6BCB77",
                border: "2px solid #000000",
                boxShadow: "3px 3px 0px #000000",
                padding: "12px",
                width: "110px",
              }}
            >
              <span style={{ fontSize: "24px", fontWeight: 900 }}>{replies}</span>
              <span style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase" }}>REPLIES</span>
            </div>
          </div>

          {/* Personality */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              background: "#C9B1FF",
              border: "3px solid #000000",
              boxShadow: "4px 4px 0px #000000",
              padding: "16px",
            }}
          >
            <span
              style={{
                fontSize: "12px",
                fontWeight: 700,
                textTransform: "uppercase",
                marginBottom: "4px",
              }}
            >
              ⭐ Your Personality
            </span>
            <span style={{ fontSize: "22px", fontWeight: 900 }}>
              {personality}
            </span>
          </div>

          {/* Top Channel */}
          {topChannel && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "16px",
                background: "#FFD93D",
                border: "2px solid #000000",
                padding: "8px 16px",
                fontSize: "14px",
                fontWeight: 700,
              }}
            >
              # Favorite: /{topChannel}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: "24px",
            fontSize: "14px",
            color: "#ffffff",
            fontWeight: 600,
          }}
        >
          Check yours at farcaster.xyz/miniapps
        </div>
      </div>
    ),
    {
      width: 600,
      height: 600,
    }
  );
}
