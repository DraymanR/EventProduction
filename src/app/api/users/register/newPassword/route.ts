// import { NextResponse } from 'next/server';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import { AuthModel } from '@/app/lib/models/user';
// import connectDb from '@/app/lib/db/connectDb';

// const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// export async function POST(req: Request) {
//     try {
//         const { email, otp, newPassword } = await req.json(); 

//         if (!email || !otp || !newPassword) {
//             return NextResponse.json(
//                 { error: 'Email, OTP, and new password are required' },
//                 { status: 400 }
//             );
//         }

//         await connectDb();

//         const user = await AuthModel.findOne({ email });

//         if (!user) {
//             return NextResponse.json(
//                 { error: 'User not found' },
//                 { status: 404 }
//             );
//         }

//         if (user.otp != otp || new Date() > user.otpExpiration) {
//             return NextResponse.json(
//                 { error: 'Invalid or expired OTP' },
//                 { status: 400 }
//             );
//         }

//         const hashedPassword = await bcrypt.hash(newPassword, 10);

//         user.password = hashedPassword;
//         user.otp = null;
//         user.otpExpiration = null;
//         await user.save();

//         const payload = { userName: user.userName, email: user.email };
//         const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

//         return NextResponse.json(
//             { message: 'Password successfully updated', token },
//             { status: 200 }
//         );
//     } catch (error) {
//         console.error('Error during password reset:', error);
//         return NextResponse.json(
//             { error: 'Error during password reset' },
//             { status: 500 }
//         );
//     }
// }
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthModel } from '@/app/lib/models/user';
import connectDb from '@/app/lib/db/connectDb';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

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

        const user = await AuthModel.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // בדיקת OTP
        if (user.otp != otp || new Date() > user.otpExpiration) {
            return NextResponse.json(
                { error: 'Invalid or expired OTP' },
                { status: 400 }
            );
        }

        // יצירת סיסמה מוצפנת חדשה
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // עדכון הסיסמה ו-OTP במערכת
        user.password = hashedPassword;
        user.otp = null;
        user.otpExpiration = null;
        await user.save();

        // יצירת payload לטוקן
        const payload = { userName: user.userName, email: user.email };

        // יצירת טוקן JWT חדש
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        // יצירת תגובה עם טוקן בעוגיה
        const response = NextResponse.json(
            { message: 'Password successfully updated' },
            { status: 200 }
        );

        // הגדרת העוגיה
        response.cookies.set('token', token, {
            httpOnly: true, // מונע גישה לעוגיה מהלקוח (JavaScript)
            secure: process.env.NODE_ENV === 'production', // מאובטח רק ב-production
            maxAge: 3600, // 1 שעה
            path: '/', // העוגיה תהיה זמינה בכל האפליקציה
        });

        return response;

    } catch (error) {
        console.error('Error during password reset:', error);
        return NextResponse.json(
            { error: 'Error during password reset' },
            { status: 500 }
        );
    }
}
