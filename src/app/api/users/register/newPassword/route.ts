import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { AuthModel, UserModel } from '@/app/lib/models/user';
import connectDb from '@/app/lib/db/connectDb';
import { generateToken, setAuthCookies } from '@/middlewares/authMiddleware';

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

            // חפש את המשתמש לפי האימייל במודל Auth

            const authRecord = await AuthModel.findOne({ email });

            if (!authRecord) {
                return NextResponse.json(
                    { error: 'User not found' },
                    { status: 404 }
                );
            }

            const userName = user.userName;


            if (user.otp != otp || new Date() > user.otpExpiration) {


                const user = await UserModel.findOne({ email });

                if (!user) {
                    return NextResponse.json(
                        { error: 'User not found in User model' },
                        { status: 404 }
                    );
                }

                const userName = user.userName;


                if (authRecord.otp !== otp || new Date() > authRecord.otpExpiration) {
                    return NextResponse.json(
                        { error: 'Invalid or expired OTP' },
                        { status: 400 }
                    );
                }



                const hashedPassword = await bcrypt.hash(newPassword, 10);

                user.password = hashedPassword;

                user.otp = null;
                user.otpExpiration = null;
                await user.save();
                authRecord.password = hashedPassword;
                authRecord.otp = null;
                authRecord.otpExpiration = null;
                await authRecord.save();


                // const payload = { userName, email };


                // const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });


                const token = generateToken({ userName, email });


                const response = NextResponse.json(
                    { message: 'Password successfully updated', userName },
                    { status: 200 }
                );

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
                setAuthCookies(response, userName, token);

                return response;

            }
        }
    } catch (error) {
        console.error('Error during password reset:', error);
        return NextResponse.json(
            { error: 'Error during password reset' },
            { status: 500 }
        );
    }
}
