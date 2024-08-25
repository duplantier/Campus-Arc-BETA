import { NextResponse } from "next/server";

import { db } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      adminKey,
    }: {
      adminKey: string;
    } = body;

    if (adminKey !== process.env.NEXT_PUBLIC_ADMIN_KEY) {
      return NextResponse.json({
        error: "Unauthorized",
        isCreated: false,
        status: 401,
      });
    }
    const allArcModules = await db.arcModule.findMany({
      include: {
        studentsRegistered: true, // Include related Student records
      },
    });
    return NextResponse.json({
      allArcModules: allArcModules,
      isRead: true,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: error, status: 500 });
  }
}
