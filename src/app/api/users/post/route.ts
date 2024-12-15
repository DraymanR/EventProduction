<<<<<<< HEAD


import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel, AuthModel, AddressModel, SupplierModel, ConsumerModel } from '@/app/lib/models/user'; 
import connectDb from '@/app/lib/db/connectDb'; 

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; 

export async function POST(req: Request) {
    try {
        const { firstName, lastName, userName, email, password, title, phone, language, address, description, topPrice, startingPrice } = await req.json();

        
        if (!firstName || !lastName || !userName || !email || !password || !title || !phone || !language || !address || !description) {
=======
// import connectDb from '@/app/lib/db/connectDb';
// import bcrypt from 'bcryptjs';
// import { generateToken, setAuthCookies } from '@/middlewares/authMiddleware';
// import { AddressModel, AuthModel, SupplierModel, UserModel } from '@/app/lib/models/user';
// import { NextResponse } from 'next/server';

// export async function POST(req: Request) {
//     try {
//         const { firstName, lastName, userName, email, password, title, phone, language, address, description, topPrice, startingPrice } = await req.json();

//         if (!firstName || !lastName || !userName || !email || !password || !title || !phone || !language || !address || !description) {
//             return NextResponse.json(
//                 { error: 'Missing required fields' },
//                 { status: 400 }
//             );
//         }

      
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);
//         const normalizedEmail = email.toLowerCase();

//         await connectDb();

//         const newAuth = new AuthModel({
//             userName,
//             email: normalizedEmail,
//             password: hashedPassword,
//         });

//         await newAuth.save();

//         const updatedAddress = {
//             userName,
//             ...address 
//         };
//         const newAddress = new AddressModel(updatedAddress);
//         await newAddress.save();

//         const newUser = new UserModel({
//             firstName,
//             lastName,
//             userName,
//             email: normalizedEmail,
//             titles: title,
//             phone,
//             languages: language,
//             addressId: newAddress._id,
//             description, 
//             postArr: [], 
//             likedPostsArr: [],
//             likedPeople: [],
//         });

//         await newUser.save();

//         if (title === 'supplier') {
//             const newSupplier = new SupplierModel({
//                 userName,
//                 startingPrice: startingPrice || 0, 
//                 topPrice: topPrice || 0,
//                 range: 0
//             });
//             await newSupplier.save();
//         } 
//         const token = generateToken(newUser);

//         const response = NextResponse.json(
//             { message: 'User created successfully' }, 
//             { status: 201 }
//         );

//         setAuthCookies(response,userName, token);

//         return response;

//     } catch (error) {
//         console.error('Error creating user:', error);
//         return NextResponse.json(
//             { error: 'Error creating user' },
//             { status: 500 }
//         );
//     }
// }
import connectDb from '@/app/lib/db/connectDb';
import bcrypt from 'bcryptjs';
import { generateToken, setAuthCookies } from '@/middlewares/authMiddleware';
import { Title } from '@/app/types/user';
import { AddressModel, AuthModel, SupplierModel, UserModel } from '@/app/lib/models/user';
import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
    try {

        const {
            firstName, lastName, userName, email, password, titles,
            phone, languages, address, description, topPrice, startingPrice,
            profileImage
        } = await req.json();

        if (!firstName || !lastName || !userName || !email || !password || !titles || !phone || !languages || !address || !description) {
>>>>>>> feb4b53c36ceefe34479e7431dd7d5b0453e91d4
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

<<<<<<< HEAD
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const normalizedEmail = email.toLowerCase();
       
        await connectDb();

        const newAuth = new AuthModel({
            userName,
            email:normalizedEmail,
            password: hashedPassword,
        });

        await newAuth.save();

        const updatedAddress = {
            userName,
            ...address 
        };
        const newAddress = new AddressModel(updatedAddress);
        await newAddress.save();

=======



        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const normalizedEmail = email.toLowerCase();

        // Connect to database
        await connectDb();

        // Upload profile image to Cloudinary
        let uploadedImageUrl = null;
        if (profileImage) {
            const uploadedImage = await cloudinary.uploader.upload(profileImage, {
                folder: 'profile_images',
                resource_type: 'image',
            });
            uploadedImageUrl = uploadedImage.secure_url;
        }

        // Create Auth document
        const newAuth = new AuthModel({
            userName,
            email: normalizedEmail,
            password: hashedPassword,
        });
        await newAuth.save();

        // Create Address document
        const updatedAddress = { userName, ...address };

        const newAddress = new AddressModel(updatedAddress);
        await newAddress.save();

        // Create User document
>>>>>>> feb4b53c36ceefe34479e7431dd7d5b0453e91d4
        const newUser = new UserModel({
            firstName,
            lastName,
            userName,
<<<<<<< HEAD
            email:normalizedEmail,
            titles:title,
            phone,
            languages:language,
            addressId: newAddress._id,
            description, 
            postArr: [], 
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
        } else if (title === 'consumer') {
            const newConsumer = new ConsumerModel({
                userName,
                likedPostsArr: [],
                likedPeople: []
            });
            await newConsumer.save();
        }

       
        const payload = { userName: newUser.userName, email: newUser.email }; 
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' }); 

     
        const response = NextResponse.json(
            { message: 'User created successfully' }, 
            { status: 201 }
        );

    
        response.cookies.set('userName', newUser.userName, { 
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

        
=======
            email: normalizedEmail,
            titles: titles,
            phone,
            languages: languages,
            addressId: newAddress._id,
            description,
            postArr: [],
            likedPostsArr: [],
            likedPeople: [],
            profileImage: uploadedImageUrl, // Save image URL in user document
        });
        await newUser.save();


        // Create Supplier document if needed
        if (titles.includes(Title)) {

            const newSupplier = new SupplierModel({
                userName,
                startingPrice: startingPrice || 0,
                topPrice: topPrice || 0,
                range: 0,
            });
            await newSupplier.save();
        }


        
        const token = generateToken(newUser);
        const response = NextResponse.json(
            { message: 'User created successfully' },
            { status: 201 }
        );



        setAuthCookies(response, userName, token);

>>>>>>> feb4b53c36ceefe34479e7431dd7d5b0453e91d4
        return response;

    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json(
            { error: 'Error creating user' },
            { status: 500 }
        );
    }
}
