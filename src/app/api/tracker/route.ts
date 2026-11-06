import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") || "demo-user";

    const checkIns = await prisma.dailyCheckIn.findMany({
      where: { userId },
      orderBy: { date: "desc" },
      take: 30,
    });

    return NextResponse.json({ success: true, checkIns });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Database in offline mode",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId = "demo-user", ...entry } = body;

    const checkIn = await prisma.dailyCheckIn.upsert({
      where: {
        userId_date: {
          userId,
          date: entry.date,
        },
      },
      update: {
        morningIntention: entry.morningIntention,
        eveningReflection: entry.eveningReflection,
        alignmentScore: entry.alignmentScore ?? 5,
        energyLevel: entry.energyLevel ?? 5,
        clarityScore: entry.clarityScore ?? 5,
        gratitude: entry.gratitude,
        mood: entry.mood,
      },
      create: {
        userId,
        date: entry.date,
        morningIntention: entry.morningIntention,
        eveningReflection: entry.eveningReflection,
        alignmentScore: entry.alignmentScore ?? 5,
        energyLevel: entry.energyLevel ?? 5,
        clarityScore: entry.clarityScore ?? 5,
        gratitude: entry.gratitude,
        mood: entry.mood,
      },
    });

    return NextResponse.json({ success: true, checkIn });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Local state preserved.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
