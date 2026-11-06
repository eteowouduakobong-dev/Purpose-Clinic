import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") || "demo-user";

    const values = await prisma.coreValue.findMany({
      where: { userId },
      orderBy: { rank: "asc" },
    });

    return NextResponse.json({ success: true, values });
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
    const { userId = "demo-user", values = [] } = body;

    // Delete existing values for this user then re-insert
    await prisma.coreValue.deleteMany({
      where: { userId },
    });

    const created = await Promise.all(
      values.map((v: { name: string; rank: number; definition?: string; actionExample?: string }) =>
        prisma.coreValue.create({
          data: {
            userId,
            valueName: v.name,
            rank: v.rank,
            personalDefinition: v.definition,
            actionExample: v.actionExample,
          },
        })
      )
    );

    return NextResponse.json({ success: true, values: created });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Local state preserved.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
