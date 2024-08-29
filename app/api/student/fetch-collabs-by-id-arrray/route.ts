import { NextResponse } from "next/server";

import { db } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      adminKey,
      studentIds,
    }: {
      adminKey: string;
      studentIds: number[];
    } = body;

    if (adminKey !== process.env.NEXT_PUBLIC_NEXT_PUBLIC_ADMIN_KEY) {
      return NextResponse.json({
        error: "Unauthorized",
        isCreated: false,
        status: 401,
      });
    }

    const collabStudents = await db.student.findMany({
      where: {
        id: {
          in: studentIds,
        },
      },
    });

    return NextResponse.json({
      collabStudents: collabStudents,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: error, isCreated: false, status: 500 });
  }
}
