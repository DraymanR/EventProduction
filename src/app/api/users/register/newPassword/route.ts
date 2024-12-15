
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
<<<<<<< HEAD
import jwt from 'jsonwebtoken';
import { AuthModel } from '@/app/lib/models/user';
import { UserModel } from '@/app/lib/models/user'; // import the User model
import connectDb from '@/app/lib/db/connectDb';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(req: Request) {
    try {
        const { email, otp, newPassword } = await req.json(); 
=======
import { AuthModel, UserModel } from '@/app/lib/models/user';
import connectDb from '@/app/lib/db/connectDb';
import { generateToken, setAuthCookies } from '@/middlewares/authMiddleware';

export async function POST(req: Request) {
    try {
        const { email, otp, newPassword } = await req.json();
>>>>>>> feb4b53c36ceefe34479e7431dd7d5b0453e91d4

        if (!email || !otp || !newPassword) {
            return NextResponse.json(
                { error: 'Email, OTP, and new password are required' },
                { status: 400 }
            );
        }

        await connectDb();

<<<<<<< HEAD
        // חפש את המשתמש לפי האימייל במודל Auth
=======
      
>>>>>>> feb4b53c36ceefe34479e7431dd7d5b0453e91d4
        const authRecord = await AuthModel.findOne({ email });

        if (!authRecord) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

<<<<<<< HEAD
=======
       
>>>>>>> feb4b53c36ceefe34479e7431dd7d5b0453e91d4
        const user = await UserModel.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { error: 'User not found in User model' },
                { status: 404 }
            );
        }

<<<<<<< HEAD
        const userName = user.userName;  

       
        if (authRecord.otp != otp || new Date() > authRecord.otpExpiration) {
=======
        const userName = user.userName;

        
        if (authRecord.otp !== otp || new Date() > authRecord.otpExpiration) {
>>>>>>> feb4b53c36ceefe34479e7431dd7d5b0453e91d4
            return NextResponse.json(
                { error: 'Invalid or expired OTP' },
                { status: 400 }
            );
        }

<<<<<<< HEAD
     
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        // console.log('Old Password:', authRecord.password);
        authRecord.password = hashedPassword;
        // console.log('New Password:', authRecord.password);
        // await authRecord.save();
        // console.log('Password updated successfully');
        
=======
       
        const hashedPassword = await bcrypt.hash(newPassword, 10);
>>>>>>> feb4b53c36ceefe34479e7431dd7d5b0453e91d4
        authRecord.password = hashedPassword;
        authRecord.otp = null;
        authRecord.otpExpiration = null;
        await authRecord.save();

<<<<<<< HEAD
      
        const payload = { userName, email };

        
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

      
=======
        const token = generateToken({ userName, email });

        
>>>>>>> feb4b53c36ceefe34479e7431dd7d5b0453e91d4
        const response = NextResponse.json(
            { message: 'Password successfully updated', userName },
            { status: 200 }
        );

<<<<<<< HEAD
        response.cookies.set('userName', userName, {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600,
            path: '/',
        });
       
        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600,
            path: '/',
        });
=======
        setAuthCookies(response, userName, token);
>>>>>>> feb4b53c36ceefe34479e7431dd7d5b0453e91d4

        return response;

    } catch (error) {
        console.error('Error during password reset:', error);
        return NextResponse.json(
            { error: 'Error during password reset' },
            { status: 500 }
        );
    }
}
