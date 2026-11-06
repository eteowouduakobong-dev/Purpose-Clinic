import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") || "demo-user";

    const audit = await prisma.lifeAudit.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, audit });
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
    const { userId = "demo-user", ...auditData } = body;

    const audit = await prisma.lifeAudit.create({
      data: {
        userId,
        careerScore: auditData.careerScore ?? 5,
        healthScore: auditData.healthScore ?? 5,
        relationshipScore: auditData.relationshipScore ?? 5,
        growthScore: auditData.growthScore ?? 5,
        creativityScore: auditData.creativityScore ?? 5,
        financeScore: auditData.financeScore ?? 5,
        environmentScore: auditData.environmentScore ?? 5,
        spiritualScore: auditData.spiritualScore ?? 5,
        topFriction: auditData.topFriction,
        energyLeaks: auditData.energyLeaks,
        topPriority: auditData.topPriority,
        auditNotes: auditData.auditNotes,
      },
    });

    return NextResponse.json({ success: true, audit });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Local state preserved.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
