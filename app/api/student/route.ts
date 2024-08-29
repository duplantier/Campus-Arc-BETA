import { NextResponse } from "next/server";

import { db } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      reqType,
      eduUsername,
      email,
      ethAddress,
      OCaccessToken,
      adminKey,
      registeredArcModulesIds,
      registrationStakesIds,
    }: {
      reqType: string;
      adminKey: string;
      eduUsername?: string;
      ethAddress?: string;
      OCaccessToken?: string;
      email?: string;
      registeredArcModulesIds?: string[];
      registrationStakesIds?: string[];
    } = body;

    if (adminKey !== process.env.ADMIN_KEY) {
      return NextResponse.json({
        error: "Unauthorized",
        isCreated: false,
        status: 401,
      });
    }

    if (reqType === "create") {
      const isStudentAlreadyExist = await db.student.findFirst({
        where: { eduUsername: eduUsername },
      });

      if (isStudentAlreadyExist) {
        return NextResponse.json({
          error: "Student already exists",
          isCreated: false,
          studentId: isStudentAlreadyExist.id,
          status: 409, // Conflict
        });
      } else {
        const createdStudent = await db.student.create({
          data: {
            eduUsername: eduUsername || "",
            email: email,
            ethAddress: ethAddress,
            OCaccessToken: OCaccessToken,
            registeredArcModulesIds: [],
            registrationStakesIds: [],
          },
        });
        return NextResponse.json({
          createdStudent: createdStudent,
          isCreated: true,
          studentId: createdStudent.id,
          status: 201,
        });
      }
    }
  } catch (error) {
    return NextResponse.json({ error: error, isCreated: false, status: 500 });
  }
}
