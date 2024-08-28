import { NextResponse } from "next/server";

import { db } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      adminKey,
      arcModuleId,
      studentId,
      stakeHash,
      stakeAmount,
      stakeStatus,
    }: {
      adminKey: string;
      arcModuleId: number;
      studentId: number;
      stakeHash: string;
      stakeAmount: number;
      stakeStatus: string;
    } = body;

    if (adminKey !== process.env.NEXT_PUBLIC_ADMIN_KEY) {
      return NextResponse.json({
        error: "Unauthorized",
        isCreated: false,
        status: 401,
      });
    }

    // Check if the student is already registered
    const isAlreadyRegistered = await db.usersArcModules.findFirst({
      where: {
        userId: studentId,
        arcModuleId: arcModuleId,
      },
    });

    if (isAlreadyRegistered) {
      return NextResponse.json({
        error: "Student is already registered",
        isCreated: false,
        status: 400,
      });
    }

    //*START Create usersArcModule object
    const createdUsersArcModuleObject = await db.usersArcModules.create({
      data: {
        userId: studentId,
        arcModuleId: arcModuleId,
        isRegistered: true,
        completedLessonsIds: [],
        isCollaborate: false,
      },
    });
    //*END Create usersArcModule object

    //*START Update student data
    const student = await db.student.findUnique({
      where: {
        id: studentId,
      },
    });

    if (!student) {
      return NextResponse.json({
        error: "Student not found",
        isCreated: false,
        status: 404,
      });
    }

    const updatedUserObject = await db.student.update({
      where: {
        id: studentId,
      },
      data: {
        registeredArcModulesIds: [
          ...student.registeredArcModulesIds,
          arcModuleId,
        ],
      },
    });
    //*END Update student data

    //*START Update the Arc Module object
    const arcModule = await db.arcModule.findUnique({
      where: {
        id: arcModuleId,
      },
    });

    if (!arcModule) {
      return NextResponse.json({
        error: "ArcModule not found",
        isCreated: false,
        status: 404,
      });
    }

    const updatedArcModuleObject = await db.arcModule.update({
      where: {
        id: arcModuleId,
      },
      data: {
        studentsRegisteredIds: [...arcModule.studentsRegisteredIds, studentId],
      },
    });
    //*END Update the Arc Module object

    //*START Create the RegistrationStake object
    const createdRegistrationStakeObject = await db.registrationStake.create({
      data: {
        hash: stakeHash,
        amount: stakeAmount,
        studentId: studentId,
        status: stakeStatus,
        collabStudentsIds: [],
        registeredArcModuleId: arcModuleId,
      },
    });

    return NextResponse.json({
      createdUsersArcModuleObject: createdUsersArcModuleObject,
      updatedUserObject: updatedUserObject,
      updatedArcModuleObject: updatedArcModuleObject,
      createdRegistrationStakeObject: createdRegistrationStakeObject,
      isRegistered: true,
      status: 201,
    });
  } catch (error) {
    return NextResponse.json({ error: error, isCreated: false, status: 500 });
  }
}
