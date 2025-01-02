// import { cookies } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const { message } = body;

//     // קריאת usernameId מה-cookies
//     const userId = cookies().get("usernameId")?.value;

//     if (!message || !userId) {
//       return NextResponse.json(
//         { error: "Message and usernameId are required" },
//         { status: 400 }
//       );
//     }

//     // תגובת בוט לדוגמה
//     const botResponse = `Hi, user ${userId}. You said: "${message}"`;

//     return NextResponse.json({ response: botResponse });
//   } catch (error) {
//     console.error("Error in API:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

import MessageChat from '@/app/lib/models/chatmessage';
import connectDb from "@/app/lib/db/connectDb";
import { NextRequest, NextResponse } from "next/server";

// טיפול בבקשת POST: שמירת הודעה חדשה
export async function POST(req: NextRequest) {
    try {
        const { username, text ,} = await req.json();
        await connectDb();
        const newMessage = new ChatMessage({ username, text, timestamp: new Date() });
        await newMessage.save();

        return NextResponse.json({ message: "Message saved successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error saving message:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}



export async function PUT(req: NextRequest) {
    try {
        const { messageId, newText } = await req.json();
        await connectDb();
        const result = await ChatMessage.updateOne({ _id: messageId }, { $set: { text: newText } });

        if (result.matchedCount === 0) {
            return NextResponse.json({ message: "Message not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Message updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error updating message:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
