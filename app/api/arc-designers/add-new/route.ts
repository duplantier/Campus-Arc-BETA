import { NextResponse } from "next/server";

import { db } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      adminKey,
      fullName,
      description,
      designation,
      imageSrc,
      twitter,
      linkedin,
      arcModulesIds,
    }: {
      adminKey: string;
      description: string;
      fullName: string;
      designation: string;
      imageSrc: string;
      twitter: string;
      linkedin: string;
      arcModulesIds: number[];
    } = body;

    if (adminKey !== process.env.ADMIN_KEY) {
      return NextResponse.json({
        error: "Unauthorized",
        isCreated: false,
        status: 401,
      });
    }

    const createdArcDesigner = await db.arcDesigner.create({
      data: {
        fullName: fullName,
        description: description,
        designation: designation,
        imageSrc: imageSrc,
        twitter: twitter,
        linkedin: linkedin,
        arcModulesIds: arcModulesIds,
      },
    });

    return NextResponse.json({
      createdArcDesigner: createdArcDesigner,
      isCreated: true,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: error, isCreated: false, status: 500 });
  }
}
