// import { NextResponse } from 'next/server';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken'; 
// import { AuthModel } from '@/app/lib/models/user';
// import connectDb from '@/app/lib/db/connectDb'; 
// const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; 

// export async function POST(req: Request) {
//     try {
//         const { email, password } = await req.json(); 


//         if (!email || !password) {
//             return NextResponse.json(
//                 { error: 'Email and password are required' },
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

     
//         const isMatch = await bcrypt.compare(password, user.password);

//         if (!isMatch) {
//             return NextResponse.json(
//                 { error: 'Invalid password' },
//                 { status: 401 }
//             );
//         }
 
//         const payload = { userName: user.userName, email: user.email }; 
//         const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' }); 

       
//         return NextResponse.json(
//             { message: 'Login successful', token },
//             { status: 200 }
//         );
//     } catch (error) {
//         console.error('Error during login:', error);
//         return NextResponse.json(
//             { error: 'Error during login' },
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
        const { email, password,userName } = await req.json(); 

        if (!email || !password||!userName) {
            return NextResponse.json(
                { error: 'Email, username and password are required' },
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

        const payload = { userName: userName, email: user.email }; 
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' }); 

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

    } catch (error) {
        console.error('Error during login:', error);
        return NextResponse.json(
            { error: 'Error during login' },
            { status: 500 }
        );
    }
}
