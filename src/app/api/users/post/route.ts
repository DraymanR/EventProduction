import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { UserModel, AuthModel, AddressModel } from '@/app/lib/models/user'; // הוספת מודל לכתובת
import connectDb from '@/app/lib/db/connectDb'; // חיבור למסד נתונים

export async function POST(req: Request) {
    try {
        const { userId, firstName, lastName, userName, email, password, title, phone, language, address } = await req.json();

        if (!userId || !firstName || !lastName || !userName || !email || !password || !title || !phone || !language || !address) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // הצפנת הסיסמה
        const salt = await bcrypt.genSalt(10); // יצירת salt להצפנה
        const hashedPassword = await bcrypt.hash(password, salt); // הצפנת הסיסמה

        // חיבור למסד הנתונים
        await connectDb();
        const newAuth = new AuthModel({
            email,
            password: hashedPassword,
        });

        await newAuth.save();
        const updatedAddress = {
            ...address,
            userId,
        };


        const newAddress = new AddressModel(updatedAddress);
        await newAddress.save();

        const newUser = new UserModel({
            userId,
            firstName,
            lastName,
            userName,
            email,
            title,
            phone,
            language,
            address: newAddress._id,
        });

        await newUser.save();



        return NextResponse.json(
            { message: 'User created successfully', newUser },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json(
            { error: 'Error creating user' },
            { status: 500 }
        );
    }
}
