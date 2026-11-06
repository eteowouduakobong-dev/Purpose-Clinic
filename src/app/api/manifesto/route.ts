import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") || "demo-user";

    const manifesto = await prisma.purposeManifesto.findUnique({
      where: { userId },
    });

    return NextResponse.json({ success: true, manifesto });
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
    const { userId = "demo-user", ...data } = body;

    const manifesto = await prisma.purposeManifesto.upsert({
      where: { userId },
      update: {
        headline: data.headline,
        fullStatement: data.fullStatement,
        whoIServe: data.whoIServe,
        whatITransform: data.whatITransform,
        guidingPrinciples: data.guidingPrinciples ?? [],
        dailyDeclaration: data.dailyDeclaration,
      },
      create: {
        userId,
        headline: data.headline,
        fullStatement: data.fullStatement,
        whoIServe: data.whoIServe,
        whatITransform: data.whatITransform,
        guidingPrinciples: data.guidingPrinciples ?? [],
        dailyDeclaration: data.dailyDeclaration,
      },
    });

    return NextResponse.json({ success: true, manifesto });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Local state preserved.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
