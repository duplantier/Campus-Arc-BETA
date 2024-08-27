import { NextResponse } from "next/server";

import { db } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      adminKey,
      studentId,
    }: {
      adminKey: string;
      studentId: number;
    } = body;

    if (adminKey !== process.env.NEXT_PUBLIC_ADMIN_KEY) {
      return NextResponse.json({
        error: "Unauthorized",
        isCreated: false,
        status: 401,
      });
    }

    const studentsArcModules = await db.usersArcModules.findMany({
      where: {
        userId: studentId,
      },
    });

    const arcModuleIds = studentsArcModules.map(
      (arcModule) => arcModule.arcModuleId
    );

    const arcModulesArray = await db.arcModule.findMany({
      where: {
        id: {
          in: arcModuleIds,
        },
      },
    });

    return NextResponse.json({
      registeredArcModulesInfo: arcModulesArray,
      studentsArcModules: studentsArcModules,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: error, isCreated: false, status: 500 });
  }
}
