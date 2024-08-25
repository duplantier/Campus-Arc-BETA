import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

import { db } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      reqType,
      id,
      category,
      level,
      title,
      imageSrc,
      description,
      lessons,
      time,
      projects,
      studentId,
      adminKey,
    }: ArcModuleAPIEndpoint = body;

    if (adminKey !== process.env.ADMIN_KEY) {
      return NextResponse.json({
        error: "Unauthorized",
        isCreated: false,
        status: 401,
      });
    }
    if (reqType === "create") {
      const isArcModuleExist = await db.arcModule.findUnique({
        where: {
          id: id,
        },
      });

      if (isArcModuleExist) {
        return NextResponse.json({
          error: "Arc Module already exists",
          isCreated: false,
          status: 400,
        });
      } else {
        
        const createdArcModule = await db.arcModule.create({
          data: {
            id: id || "",
            title: title || "",
            imageSrc: imageSrc || "",
            description: description || "",
            lessons: lessons || "",
            time: time || "",
            projects: projects || "",
            category: category || "",
            level: level || "",
            student: {
              connect: {
                id: studentId,
              },
            },
          },
        });

        return NextResponse.json({
          createdArcModule: createdArcModule,
          isCreated: true,
          status: 201,
        });
      }
    } /* else if (reqType === "update") {
      const updatedStudent = await db.student.update({
        where: { id: arcModuleObj.id }, // user id is required for updating
        data: {
          eduUsername: arcModuleObj.eduUsername || "",
          email: arcModuleObj.email || "",
          ethAddress: arcModuleObj.ethAddress || "",
          OCaccessToken: arcModuleObj.OCaccessToken || "",
          OCIdtoken: arcModuleObj.OCIdtoken || "",
          arcModules: {
            connect: arcModuleObj.arcModules?.map((module) => ({
              id: module.id,
            })),
          },
          registrationStakes: {
            connect: arcModuleObj.registrationStakes?.map((stake) => ({
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
        where: { id: arcModuleObj.id },
      });
      return NextResponse.json({
        deletedStudent: deletedStudent,
        isDeleted: true,
        status: 200,
      });
    } else if (reqType === "read") {
      const studentInfo = await db.student.findUnique({
        where: { id: arcModuleObj.id },
        include: {
          arcModules: true,
          registrationStakes: true,
        },
      });
      return NextResponse.json({
        studentInfo: studentInfo,
        isRead: true,
        status: 200,
      });
    } */
  } catch (error) {
    return NextResponse.json({ error: error, status: 500 });
  }
}
