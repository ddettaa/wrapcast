const NEYNAR_API_URL = "https://api.neynar.com/v2";

interface NeynarUser {
  fid: number;
  username: string;
  display_name: string;
  pfp_url: string;
  follower_count: number;
  following_count: number;
}

interface Cast {
  hash: string;
  text: string;
  timestamp: string;
  reactions: {
    likes_count: number;
    recasts_count: number;
  };
  replies: {
    count: number;
  };
  channel?: {
    id: string;
    name: string;
  };
}

interface WrappedStats {
  user: NeynarUser;
  totalCasts: number;
  totalLikes: number;
  totalRecasts: number;
  totalReplies: number;
  topCast: Cast | null;
  topChannel: string | null;
  mostActiveDay: string | null;
  personalityType: string;
  period: {
    start: string;
    end: string;
  };
}

class NeynarClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async fetch<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
    const url = new URL(`${NEYNAR_API_URL}${endpoint}`);
    Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));

    const response = await fetch(url.toString(), {
      headers: {
        accept: "application/json",
        api_key: this.apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`Neynar API error: ${response.status} ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  }

  async getUserByFid(fid: number): Promise<NeynarUser> {
    const data = await this.fetch<{ users: NeynarUser[] }>("/farcaster/user/bulk", {
      fids: fid.toString(),
    });
    return data.users[0];
  }

  async getUserCasts(fid: number, limit: number = 150): Promise<Cast[]> {
    const data = await this.fetch<{ casts: Cast[] }>("/farcaster/feed/user/casts", {
      fid: fid.toString(),
      limit: limit.toString(),
      include_replies: "false",
    });
    return data.casts || [];
  }

  async getWrappedStats(fid: number, year: number = 2025): Promise<WrappedStats> {
    const [user, casts] = await Promise.all([
      this.getUserByFid(fid),
      this.getUserCasts(fid, 150),
    ]);

    // Set period to the specified year (default 2025)
    const periodStart = new Date(year, 0, 1); // January 1st of the year
    const periodEnd = new Date(); // Today
    
    // Filter casts within the year
    const periodCasts = casts.filter((cast) => {
      const castDate = new Date(cast.timestamp);
      return castDate >= periodStart && castDate <= periodEnd;
    });

    // Calculate stats
    let totalLikes = 0;
    let totalRecasts = 0;
    let totalReplies = 0;
    let topCast: Cast | null = null;
    let maxEngagement = 0;
    const channelCounts: Record<string, number> = {};
    const dayCounts: Record<string, number> = {};

    periodCasts.forEach((cast) => {
      const likes = cast.reactions?.likes_count || 0;
      const recasts = cast.reactions?.recasts_count || 0;
      const replies = cast.replies?.count || 0;

      totalLikes += likes;
      totalRecasts += recasts;
      totalReplies += replies;

      const engagement = likes + recasts * 2 + replies * 1.5;
      if (engagement > maxEngagement) {
        maxEngagement = engagement;
        topCast = cast;
      }

      // Track channel activity
      if (cast.channel?.id) {
        channelCounts[cast.channel.id] = (channelCounts[cast.channel.id] || 0) + 1;
      }

      // Track most active day
      const day = new Date(cast.timestamp).toLocaleDateString("en-US", { weekday: "long" });
      dayCounts[day] = (dayCounts[day] || 0) + 1;
    });

    // Find top channel
    const topChannel = Object.entries(channelCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || null;

    // Find most active day
    const mostActiveDay = Object.entries(dayCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || null;

    // Determine personality type
    const personalityType = this.getPersonalityType(periodCasts.length, totalLikes, totalReplies);

    return {
      user,
      totalCasts: periodCasts.length,
      totalLikes,
      totalRecasts,
      totalReplies,
      topCast,
      topChannel,
      mostActiveDay,
      personalityType,
      period: {
        start: periodStart.toISOString().split("T")[0],
        end: new Date().toISOString().split("T")[0],
      },
    };
  }

  private getPersonalityType(casts: number, likes: number, replies: number): string {
    const avgLikesPerCast = casts > 0 ? likes / casts : 0;
    const avgRepliesPerCast = casts > 0 ? replies / casts : 0;

    if (casts >= 100 && avgLikesPerCast > 10) {
      return "🌟 The Influencer";
    } else if (casts >= 50 && avgRepliesPerCast > 5) {
      return "💬 The Conversationalist";
    } else if (casts >= 30) {
      return "📝 The Consistent Creator";
    } else if (avgLikesPerCast > 20) {
      return "💎 Quality Over Quantity";
    } else if (casts >= 10) {
      return "🌱 The Rising Star";
    } else {
      return "👀 The Thoughtful Observer";
    }
  }
}

export { NeynarClient, type WrappedStats, type Cast, type NeynarUser };
