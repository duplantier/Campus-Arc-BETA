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

    if (adminKey !== process.env.ADMIN_KEY) {
      return NextResponse.json({
        error: "Unauthorized",
        isCreated: false,
        status: 401,
      });
    }

    const studentsRegistrationStakes = await db.registrationStake.findMany({
      where: {
        studentId: studentId,
      },
    });

    return NextResponse.json({
      studentsRegistrationStakes: studentsRegistrationStakes,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: error, isCreated: false, status: 500 });
  }
}
