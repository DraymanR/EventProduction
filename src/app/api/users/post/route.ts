
// import { NextResponse } from 'next/server';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import { UserModel, AuthModel, AddressModel, SupplierModel, ConsumerModel } from '@/app/lib/models/user'; 
// import connectDb from '@/app/lib/db/connectDb'; 

// const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; 
// export async function POST(req: Request) {
//     try {
//         const { firstName, lastName, userName, email, password, title, phone, language, address, description ,topPrice,startingPrice} = await req.json();

//         if (  !firstName || !lastName || !userName || !email || !password || !title || !phone || !language || !address || !description) {
//             return NextResponse.json(
//                 { error: 'Missing required fields' },
//                 { status: 400 }
//             );
//         }

        
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

        
//         await connectDb();

       
//         const newAuth = new AuthModel({
//             userName,
//             email,
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
//             email,
//             title,
//             phone,
//             language,
//             addressId: newAddress._id,
//             description, 
//             postArr: [], 
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
//         } else if (title === 'consumer') {
//             const newConsumer = new ConsumerModel({
//                 userName,
//                 likedPostsArr: [],
//                 likedPeople: []
//             });
//             await newConsumer.save();
//         }

        
//         const payload = { userName: newUser.userName, email: newUser.email }; 
//         const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' }); 
 
//         return NextResponse.json(
//             { message: 'User created successfully', newUser, token },
//             { status: 201 }
//         );
//     } catch (error) {
//         console.error('Error creating user:', error);
//         return NextResponse.json(
//             { error: 'Error creating user' },
//             { status: 500 }
//         );
//     }
// }



import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel, AuthModel, AddressModel, SupplierModel, ConsumerModel } from '@/app/lib/models/user'; 
import connectDb from '@/app/lib/db/connectDb'; 

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; 

export async function POST(req: Request) {
    try {
        const { firstName, lastName, userName, email, password, title, phone, language, address, description, topPrice, startingPrice } = await req.json();

        // בדיקה אם יש שדות חסרים
        if (!firstName || !lastName || !userName || !email || !password || !title || !phone || !language || !address || !description) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await connectDb();

        const newAuth = new AuthModel({
            userName,
            email,
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
            email,
            title,
            phone,
            language,
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
            httpOnly: true, 
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

        // החזרת התשובה עם העוגיות
        return response;

    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json(
            { error: 'Error creating user' },
            { status: 500 }
        );
    }
}
