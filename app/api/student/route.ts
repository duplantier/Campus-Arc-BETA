import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

import { db } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      reqType,
      userObj,
      adminKey,
    }: {
      reqType: string;
      userObj: Student;
      adminKey: string;
    } = body;

    if (adminKey !== process.env.ADMIN_KEY) {
      return NextResponse.json({
        error: "Unauthorized",
        isCreated: false,
        status: 401,
      });
    }

    if (reqType === "create") {
      const isStudentAlreadyExist = await db.student.findUnique({
        where: { id: userObj.id },
      });
      if (isStudentAlreadyExist) {
        return NextResponse.json({
          error: "Student already exists",
          isCreated: false,
          status: 400,
        });
      } else {
        const createdStudent = await db.student.create({
          data: {
            eduUsername: userObj.eduUsername || "",
            email: userObj.email || "",
            ethAddress: userObj.ethAddress || "",
            OCaccessToken: userObj.OCaccessToken || "",
            OCIdtoken: userObj.OCIdtoken || "",
          },
        });
        return NextResponse.json({
          createdStudent: createdStudent,
          isCreated: true,
          status: 201,
        });
      }
    } else if (reqType === "update") {
      const updatedStudent = await db.student.update({
        where: { id: userObj.id }, // user id is required for updating
        data: {
          eduUsername: userObj.eduUsername || "",
          email: userObj.email || "",
          ethAddress: userObj.ethAddress || "",
          OCaccessToken: userObj.OCaccessToken || "",
          OCIdtoken: userObj.OCIdtoken || "",
          registeredArcModules: {
            connect: userObj.registeredArcModules?.map((module) => ({
              id: module.id,
            })),
          },
          registrationStakes: {
            connect: userObj.registrationStakes?.map((stake) => ({
              id: stake.id,
            })),
          },
        },
      });
      return NextResponse.json({
        updatedStudent: updatedStudent,
        isUpdated: true,
        status: 200,
      });
    } else if (reqType === "delete") {
      const deletedStudent = await db.student.delete({
        where: { id: userObj.id },
      });
      return NextResponse.json({
        deletedStudent: deletedStudent,
        isDeleted: true,
        status: 200,
      });
    } else if (reqType === "read") {
      const studentInfo = await db.student.findUnique({
        where: { id: userObj.id },
        include: {
          registeredArcModules: true,
          registrationStakes: true,
        },
      });
      return NextResponse.json({
        studentInfo: studentInfo,
        isRead: true,
        status: 200,
      });
    }
  } catch (error) {
    return NextResponse.json({ error: "Error", isCreated: false, status: 500 });
  }
}
