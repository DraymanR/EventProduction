import MessageChat from '@/app/lib/models/chatmessage';
import connectDb from '../../../lib/db/connectDb';
import { NextRequest, NextResponse } from "next/server";
import { verifyTokenMiddleware } from '@/middlewares/middlewareToken';

// טיפול בבקשת GET: שליפת כל ההודעות
export async function GET(req: NextRequest, { params }: { params: { otheruser: string } }) {
    const { otheruser } = params;
    let username: string | undefined;

    // אימות הטוקן וקבלת שם המשתמש מהמיידלוור
    await verifyTokenMiddleware(req as any, {} as NextResponse, () => {
        username = (req as any).userName; // קבלת userName מהמיידלוור
    });

    if (!otheruser) {
        return NextResponse.json({ message: "otheruser is required" }, { status: 400 });
    }

    try {
        await connectDb();

        console.log("שליפת הודעות עבור:");
        console.log(`username: ${username}, otheruser: ${otheruser}`);

        // שליפה עם תנאים הפוכים
        const messages = await MessageChat.find({
            $or: [
                { username, otheruser }, // תנאי ראשון: username === username ו-otheruser === otheruser
                { username: otheruser, otheruser: username } 
            ]
        }).sort({ timestamp: 1 });

        if (messages.length === 0) {
            return NextResponse.json({ message: "No messages found for the specified users" }, { status: 404 });
        }

        return NextResponse.json({ messages }, { status: 200 });
    } catch (error) {
        console.error("Error fetching messages:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
