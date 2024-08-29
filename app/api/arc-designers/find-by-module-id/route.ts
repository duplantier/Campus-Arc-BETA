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

    if (adminKey !== process.env.ADMIN_KEY) {
      return NextResponse.json({
        error: "Unauthorized",
        isCreated: false,
        status: 401,
      });
    }

    const arcDesignersOfTheArcModule = await db.arcDesigner.findMany({
      where: {
        arcModulesIds: {
          hasSome: [arcModuleId],
        },
      },
    });

    return NextResponse.json({
      arcDesignersOfTheArcModule: arcDesignersOfTheArcModule,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: error, isCreated: false, status: 500 });
  }
}
