import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message } = body;

    // קריאת usernameId מה-cookies
    const userId = cookies().get("usernameId")?.value;

    if (!message || !userId) {
      return NextResponse.json(
        { error: "Message and usernameId are required" },
        { status: 400 }
      );
    }

    // תגובת בוט לדוגמה
    const botResponse = `Hi, user ${userId}. You said: "${message}"`;

    return NextResponse.json({ response: botResponse });
  } catch (error) {
    console.error("Error in API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
