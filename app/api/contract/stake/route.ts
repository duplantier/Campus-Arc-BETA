import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      adminKey,
      amount,
    }: {
      adminKey: string;
      amount: number;
    } = body;

    // Validate the admin key
    if (adminKey !== process.env.ADMIN_KEY) {
      return NextResponse.json({
        error: "Invalid Admin Key / Unauthorized",
        status: 401,
      });
    }
  } catch (error) {
    // Return detailed error message
    console.error("Staking failed:", error);
    return NextResponse.json({
      error: `Staking failed: ${error}`,
    });
  }
}
