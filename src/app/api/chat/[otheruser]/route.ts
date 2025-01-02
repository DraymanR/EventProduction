import MessageChat from '@/app/lib/models/chatmessage';
import connectDb from '../../../lib/db/connectDb'
import { NextRequest, NextResponse } from "next/server";

// טיפול בבקשת GET: שליפת כל ההודעות
export async function GET(req: NextRequest, { params }: { params: { otheruser: string } }) {
    const { otheruser } = params;
    console.log(otheruser);
    
    if (!otheruser) {
        return NextResponse.json({ message: "otheruser is required" }, { status: 400 });
    }

    try {
        await connectDb();
        
        // שליפה של ההודעות לפי otheruser
        const messages = await MessageChat.find({ otheruser }).sort({ timestamp: 1 });

        if (messages.length === 0) {
            return NextResponse.json({ message: "No messages found for this otheruser" }, { status: 404 });
        }

        return NextResponse.json({ messages }, { status: 200 });
    } catch (error) {
        console.error("Error fetching messages:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
