import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") || "demo-user";

    const profile = await prisma.purposeProfile.findUnique({
      where: { userId },
      include: {
        user: true,
      },
    });

    return NextResponse.json({ success: true, profile });
  } catch (error) {
    // If database connection is not active yet (e.g. env vars not set), return friendly mock response
    return NextResponse.json({
      success: false,
      message: "Database offline or connecting. Operating in local mode.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId = "demo-user", currentStage, clarityScore, purposeStatement } = body;

    const profile = await prisma.purposeProfile.upsert({
      where: { userId },
      update: {
        currentStage: currentStage ?? 1,
        currentClarity: clarityScore ?? 3,
        purposeStatement,
      },
      create: {
        userId,
        currentStage: currentStage ?? 1,
        currentClarity: clarityScore ?? 3,
        purposeStatement,
      },
    });

    return NextResponse.json({ success: true, profile });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Saved to local state. Connect Supabase/Prisma for cloud sync.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
