import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

import { db } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      reqType,
      userObj,
    }: {
      reqType: string;
      userObj: Student;
    } = body;

    if (reqType === "create") {
      const student = await db.student.create({
        data: {
          eduUsername: userObj.eduUsername || "",
          email: userObj.email || "",
          ethAddress: userObj.ethAddress || "",
          OCaccessToken: userObj.OCaccessToken || "",
          OCIdtoken: userObj.OCIdtoken || "",
        },
      });
      return NextResponse.json({ student, isCreated: true, status: 201 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Error", isCreated: false, status: 500 });
  }
}
