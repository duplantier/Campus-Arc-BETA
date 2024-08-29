import { NextResponse } from "next/server";

import { db } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      adminKey,
      arcModuleId,
    }: {
      adminKey: string;
      arcModuleId: number;
    } = body;

    if (adminKey !== process.env.NEXT_PUBLIC_ADMIN_KEY) {
      return NextResponse.json({
        error: "Unauthorized",
        isCreated: false,
        status: 401,
      });
    }

    const foundArcModuleInfo = await db.arcModule.findUnique({
      where: {
        id: arcModuleId,
      },
    });

    return NextResponse.json({
      foundArcModuleInfo: foundArcModuleInfo,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: error, isCreated: false, status: 500 });
  }
}
