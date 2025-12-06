import { NextRequest, NextResponse } from "next/server";
import { NeynarClient } from "@/app/lib/neynar";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const fid = searchParams.get("fid");
  const year = searchParams.get("year") || "2025";

  if (!fid) {
    return NextResponse.json({ error: "FID is required" }, { status: 400 });
  }

  const apiKey = process.env.NEYNAR_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Neynar API key not configured" },
      { status: 500 }
    );
  }

  try {
    const client = new NeynarClient(apiKey);
    const stats = await client.getWrappedStats(parseInt(fid), parseInt(year));
    
    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching wrapped stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch wrapped stats" },
      { status: 500 }
    );
  }
}
