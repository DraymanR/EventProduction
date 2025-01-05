import MessageChat from '@/app/lib/models/chatmessage';
import connectDb from '../../../lib/db/connectDb'
import { NextRequest, NextResponse } from "next/server";
import { checkIfLoggedIn } from '@/app/services/user/registerUser';
import { verifyTokenMiddleware } from '@/middlewares/middlewareToken';

// טיפול בבקשת GET: שליפת כל ההודעות
export async function GET(req: NextRequest, { params }: { params: { otheruser: string} }) {
    const { otheruser } = params;
    let username: string | undefined;

    await verifyTokenMiddleware(req as any, {} as NextResponse, () => {
        username  = (req as any).userName; // קבלת userName ממידלוואר
    });

    if (!otheruser) {
        return NextResponse.json({ message: "otheruser is required" }, { status: 400 });
    }

    try {
        console.log("!!!!!!!!!!!!!!");

        console.log(username, otheruser);

        const messages = await MessageChat.find({ username, otheruser }).sort({ timestamp: 1 });
        console.log(messages);

        if (messages.length === 0) {
            return NextResponse.json({ message: "No messages found for this otheruser" }, { status: 404 });
        }

        return NextResponse.json({ messages }, { status: 200 });
    } catch (error) {
        console.error("Error fetching messages:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
