import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { AuthModel } from '@/app/lib/models/user'; 
import connectDb from '@/app/lib/db/connectDb'; // חיבור למסד נתונים

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json(); 

  
        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
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

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return NextResponse.json(
                { error: 'Invalid password' },
                { status: 401 }
            );
        }

        return NextResponse.json(
            { message: 'Login successful', user: user }, 
            { status: 200 }
        );
    } catch (error) {
        console.error('Error during login:', error);
        return NextResponse.json(
            { error: 'Error during login' },
            { status: 500 }
        );
    }
}
