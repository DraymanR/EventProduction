import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { AuthModel } from '@/app/lib/models/user';
import connectDb from '@/app/lib/db/connectDb';

export async function POST(req: Request) {
    try {
        const { email, otp, newPassword } = await req.json(); 

        if (!email || !otp || !newPassword) {
            return NextResponse.json(
                { error: 'Email, OTP, and new password are required' },
                { status: 400 }
            );
        }

        await connectDb();

        // חיפוש המשתמש לפי המייל
        const user = await AuthModel.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // בדיקת תקפות ה-OTP
        if (user.otp != otp || new Date() > user.otpExpiration) {
            return NextResponse.json(
                { error: 'Invalid or expired OTP' },
                { status: 400 }
            );
        }

        // הצפנת הסיסמה החדשה
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // עדכון הסיסמה בבסיס הנתונים
        user.password = hashedPassword;
        user.otp = null; // נמחק את ה-OTP לאחר ששונתה הסיסמה
        user.otpExpiration = null;
        await user.save();

        return NextResponse.json(
            { message: 'Password successfully updated' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error during password reset:', error);
        return NextResponse.json(
            { error: 'Error during password reset' },
            { status: 500 }
        );
    }
}
