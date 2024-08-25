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
      arcDesignerId,
      adminKey,
    }: {
      id?: number;
      reqType?: string;
      adminKey: string;
      category?: string;
      level?: string;
      title?: string;
      imageSrc?: string;
      description?: string;
      lessons?: string;
      time?: string;
      projects?: string;
      arcDesignerId?: number;
      studentsRegistered?: Student[];
    } = body;

    if (adminKey !== process.env.NEXT_PUBLIC_ADMIN_KEY) {
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

      if (isArcModuleExist !== null) {
        return NextResponse.json({
          error: "Arc Module already exists",
          isCreated: false,
          status: 400,
        });
      } else {
        const isArcDesignerExists = await db.arcDesigner.findUnique({
          where: {
            id: arcDesignerId,
          },
        });

        if (isArcDesignerExists === null) {
          return NextResponse.json({
            error: "Arc Designer does not exist",
            isCreated: false,
            status: 400,
          });
        }

        const createdArcModule = await db.arcModule.create({
          data: {
            id: id || 0,
            title: title || "",
            imageSrc: imageSrc || "",
            description: description || "",
            lessons: lessons || "",
            time: time || "",
            projects: projects || "",
            category: category || "",
            level: level || "",
            arcDesigner: {
              connect: {
                id: arcDesignerId || 0,
              },
            } as any,
          },
        });

        return NextResponse.json({
          createdArcModule: createdArcModule,
          isCreated: true,
          status: 201,
        });
      }
    } else if (reqType === "read") {
      const arcModuleInfo = await db.arcModule.findUnique({
        where: { id: id },
        include: {
          studentsRegistered: true,
          arcDesigner: true,
        },
      });
      return NextResponse.json({
        arcModuleInfo: arcModuleInfo,
        isRead: true,
        status: 200,
      });
    } else if (reqType === "fetchAll") {
      const allArcModules = await db.arcModule.findMany({
        include: {
          studentsRegistered: true,
          arcDesigner: true,
        },
      });

      return NextResponse.json({
        allArcModules: allArcModules,
        isRead: true,
        status: 200,
      });
    }
  } catch (error) {
    return NextResponse.json({ error: error, status: 500 });
  }
}
