// import { NextResponse } from 'next/server';
// import jwt, { JwtPayload } from 'jsonwebtoken';
// import { UserModel, PostModel, RecommendationModel, ConsumerModel, SupplierModel } from '@/app/lib/models/user';
// import { User } from '@/app/types/user';
// import connectDb from '@/app/lib/db/connectDb';

// const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// const verifyToken = (token: string): string | JwtPayload => {
//     try {
//         return jwt.verify(token, JWT_SECRET);
//     } catch (error) {
//         throw new Error('Invalid token');
//     }
// };

// export async function GET(req: Request) {
//     try {
//         await connectDb();

//         const { searchParams } = new URL(req.url);
//         const userNameFromQuery = searchParams.get('username');


//         if (!userNameFromQuery) {
//             return NextResponse.json(
//                 { error: 'Missing username' },
//                 { status: 400 }
//             );
//         }

//         const token = req.headers.get('Authorization')?.split(' ')[1];

//         if (!token) {
//             return NextResponse.json(
//                 { error: 'Missing token' },
//                 { status: 401 }
//             );
//         }

//         const decoded = verifyToken(token);

//         if (typeof decoded !== 'object' || !('userName' in decoded)) {
//             return NextResponse.json(
//                 { error: 'Invalid token structure' },
//                 { status: 401 }
//             );
//         }

//         const decodedUserName = decoded.userName;


//         if (decodedUserName !== userNameFromQuery) {
//             return NextResponse.json(
//                 { error: 'Unauthorized' },
//                 { status: 403 }
//             );
//         }


//         const user = await UserModel.findOne({ userName: userNameFromQuery })
//             .populate('addressId') // שליפה של כתובת
//             .populate({
//                 path: 'postArr', // שליפה של פוסטים
//                 populate: {
//                     path: 'recommendations', // שליפה של המלצות בכל פוסט
//                     model: 'Recommendation', // שימוש במודל ההמלצות
//                 },
//             })
//             .lean<User>();

//         if (!user) {
//             return NextResponse.json(
//                 { error: 'User not found' },
//                 { status: 404 }
//             );
//         }
//         console.log(user);
//         let userDetails;
//         // בדיקה אם המשתמש הוא "supplier" או "consumer" והוספת מידע רלוונטי
//         if (user.title === 'supplier') {
//             userDetails = await SupplierModel.findOne({ userName: userNameFromQuery }).lean();
//         } else if (user.title === 'consumer') {
//             userDetails = await ConsumerModel.findOne({ userName: userNameFromQuery }).lean();
//         }


//         return NextResponse.json(
//             {
//                 message: 'User retrieved successfully',
//                 user: user,
//                 userDetails: userDetails,
//             },
//             { status: 200 }
//         );
//     } catch (error) {
//         console.error('Error retrieving user:', error);
//         return NextResponse.json(
//             { error: 'Error retrieving user' },
//             { status: 500 }
//         );
//     }
// }import { NextResponse } from 'next/server';
import { NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserModel, ConsumerModel, SupplierModel } from '@/app/lib/models/user';
import { User } from '@/app/types/user';
import connectDb from '@/app/lib/db/connectDb';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const verifyToken = (token: string): string | JwtPayload => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid token');
    }
};

export async function GET(req: Request) {
    try {
        await connectDb();

        const { searchParams } = new URL(req.url);
        const userNameFromQuery = searchParams.get('username');

        if (!userNameFromQuery) {
            return NextResponse.json(
                { error: 'Missing username' },
                { status: 400 }
            );
        }

        const token = req.headers.get('Authorization')?.split(' ')[1];

        if (!token) {
            return NextResponse.json(
                { error: 'Missing token' },
                { status: 401 }
            );
        }

        const decoded = verifyToken(token);

        if (typeof decoded !== 'object' || !('userName' in decoded)) {
            return NextResponse.json(
                { error: 'Invalid token structure' },
                { status: 401 }
            );
        }

        const decodedUserName = decoded.userName;

        const user = await UserModel.findOne({ userName: userNameFromQuery })
        .populate('addressId') 
        .populate({
            path: 'postArr', 
            populate: [
                {
                    path: 'recommendations', 
                    model: 'Recommendation',
                },
                {
                    path: 'postId', 
                    model: 'ConsumerPost',
                }
            ]
        })
        .lean<User>(); 

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        let userDetails;
        let consumerDetails;
        if (user.title === 'supplier') {
            userDetails = await SupplierModel.findOne({ userName: userNameFromQuery }).lean();
        } else if (user.title === 'consumer') {
       
            consumerDetails = await ConsumerModel.findOne({ userName: userNameFromQuery }).lean();
        }

      
        if (user.userName !== decodedUserName) {
            const { firstName, lastName, phone, email, addressId, ...filteredUser } = user;

            return NextResponse.json(
                {
                    message: 'User retrieved successfully',
                    user: filteredUser,
                    userDetails: userDetails,
                    consumerDetails: consumerDetails, 
                },
                { status: 200 }
            );
        }

        return NextResponse.json(
            {
                message: 'User retrieved successfully',
                user: user,
                userDetails: userDetails,
                consumerDetails: consumerDetails, 
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error retrieving user:', error);
        return NextResponse.json(
            { error: 'Error retrieving user' },
            { status: 500 }
        );
    }
}
