import connectDb from '@/app/lib/db/connectDb';
import bcrypt from 'bcryptjs';
import { generateToken, setAuthCookies } from '@/middlewares/authMiddleware';
import { AddressModel, AuthModel, SupplierModel, UserModel } from '@/app/lib/models/user';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { firstName, lastName, userName, email, password, title, phone, language, address, description, topPrice, startingPrice } = await req.json();

        if (!firstName || !lastName || !userName || !email || !password || !title || !phone || !language || !address || !description) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

      
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const normalizedEmail = email.toLowerCase();

        await connectDb();

        const newAuth = new AuthModel({
            userName,
            email: normalizedEmail,
            password: hashedPassword,
        });

        await newAuth.save();

        const updatedAddress = {
            userName,
            ...address 
        };
        const newAddress = new AddressModel(updatedAddress);
        await newAddress.save();

        const newUser = new UserModel({
            firstName,
            lastName,
            userName,
            email: normalizedEmail,
            titles: title,
            phone,
            languages: language,
            addressId: newAddress._id,
            description, 
            postArr: [], 
            likedPostsArr: [],
            likedPeople: [],
        });

        await newUser.save();

        if (title === 'supplier') {
            const newSupplier = new SupplierModel({
                userName,
                startingPrice: startingPrice || 0, 
                topPrice: topPrice || 0,
                range: 0
            });
            await newSupplier.save();
        } 
        const token = generateToken(newUser);

        const response = NextResponse.json(
            { message: 'User created successfully' }, 
            { status: 201 }
        );

        setAuthCookies(response,userName, token);

        return response;

    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json(
            { error: 'Error creating user' },
            { status: 500 }
        );
    }
}
