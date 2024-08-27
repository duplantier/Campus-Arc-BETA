import { NextResponse } from "next/server";

import { db } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      adminKey,
      category,
      level,
      title,
      imageSrc,
      description,
      lessonsIds,
      lessonNumber,
      time,
      projects,
      whatYouWillLearn,
      studentsRegisteredIds,
      arcDesignersIds,
    }: {
      adminKey: string;
      category: string;
      level: string;
      title: string;
      imageSrc: string;
      description: string;
      lessonsIds: number[];
      lessonNumber: number;
      time: string;
      projects: string;
      whatYouWillLearn: string[];
      studentsRegisteredIds: number[];
      arcDesignersIds: number[];
    } = body;

    if (adminKey !== process.env.NEXT_PUBLIC_ADMIN_KEY) {
      return NextResponse.json({
        error: "Unauthorized",
        isCreated: false,
        status: 401,
      });
    }

    const createdArcModule = await db.arcModule.create({
      data: {
        category: category,
        level: level,
        title: title,
        imageSrc: imageSrc,
        description: description,
        lessonsIds: lessonsIds,
        lessonNumber: lessonNumber,
        time: time,
        projects: projects,
        whatYouWillLearn: whatYouWillLearn,
        studentsRegisteredIds: studentsRegisteredIds,
        arcDesignersId: arcDesignersIds || [],
      },
    });

    return NextResponse.json({
      createdArcModule: createdArcModule,
      isCreated: true,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: error, isCreated: false, status: 500 });
  }
}
