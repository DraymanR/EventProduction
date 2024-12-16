
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { AuthModel } from '@/app/lib/models/user';
import connectDb from '@/app/lib/db/connectDb';
import { generateToken, setAuthCookies } from '@/middlewares/authMiddleware';

export async function POST(req: Request) {
    try {
        const { email, password, userName } = await req.json();

        if (!email || !password || !userName) {
            return NextResponse.json(
                { error: 'Email, username, and password are required' },
                { status: 400 }
            );
        }

        const normalizedEmail = email.toLowerCase();
        await connectDb();

        const user = await AuthModel.findOne({ email: normalizedEmail});

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return NextResponse.json(
                { error: 'Invalid password' },
                { status: 401 }
            );
        }

        // const payload = { userName: user.userName, email: normalizedEmail }; 
        // const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' }); 

        
        const token = generateToken({ userName: user.userName, email: normalizedEmail });
        const response = NextResponse.json(
            { message: 'Login successful' },
            { status: 200 }
        );

        
        response.cookies.set('userName', userName, { 
            httpOnly: false, 
            secure: process.env.NODE_ENV === 'production', 
            maxAge: 86400, 
            path: '/' 
        });

        response.cookies.set('token', token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            maxAge: 86400, 
            path: '/' 
        });
     

        return response;

        setAuthCookies(response, user.userName, token);

        return response;
    } catch (error) {
        console.error('Error during login:', error);
        return NextResponse.json(
            { error: 'Error during login' },
            { status: 500 }
        );
    }
}
