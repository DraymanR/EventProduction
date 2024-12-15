<<<<<<< HEAD

// import { NextResponse, NextRequest } from 'next/server'; 
// import jwt, { JwtPayload } from 'jsonwebtoken';
// import { UserModel, SupplierModel } from '@/app/lib/models/user';
// import { User,Title } from '@/app/types/user';
// import connectDb from '@/app/lib/db/connectDb';

// const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// const verifyToken = (token: string): string | JwtPayload => {
//     try {
//         return jwt.verify(token, JWT_SECRET);
//     } catch (error) {
//         throw new Error('Invalid token');
//     }
// };

// export async function GET(req: NextRequest) {  
 
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

      
//         const tokenCookie = req.cookies.get('token'); 
//         const token = tokenCookie ? tokenCookie.value : null;  

//         if (!token) {
//             return NextResponse.json(
//                 { error: 'Missing token' },
//                 { status: 401 }
//             );
//         }

//         let decoded;
//         try {
//             decoded = verifyToken(token);
//         } catch (error) {
//             return NextResponse.json(
//                 { error: 'Invalid token' },
//                 { status: 401 }
//             );
//         }

//         if (typeof decoded !== 'object' || !('userName' in decoded)) {
//             return NextResponse.json(
//                 { error: 'Invalid token structure' },
//                 { status: 401 }
//             );
//         }

//         const decodedUserName = decoded.userName;
//         const user = await UserModel.findOne({ userName: userNameFromQuery })
//             .populate('addressId')
//             .populate({
//                 path: 'postArr',
//                 populate: {
//                     path: 'recommendations',
//                     model: 'Recommendation',
//                 },
//             })
//             .lean<User>();

//         if (!user) {
//             return NextResponse.json(
//                 { error: 'User not found' },
//                 { status: 404 }
//             );
//         }

//         let consumerDetails,supplierDetails;

     
//         if (user.titles.some(title => Object.values(Title).includes(title as Title))){
       
//             supplierDetails = await SupplierModel.findOne({ userName: userNameFromQuery }).lean();
//           } else
          
          


//         if (user.userName !== decodedUserName) {
//             const { firstName, lastName, phone, email, addressId, ...filteredUser } = user;
//             return NextResponse.json(
//                 {
//                     message: 'User retrieved successfully',
//                     user: filteredUser,
//                     supplierDetails: supplierDetails,
//                     consumerDetails:consumerDetails
//                 },
//                 { status: 200 }
//             );
//         }

//         return NextResponse.json(
//             {
//                 message: 'User retrieved successfully',
//                 user: user,
//                 supplierDetails: supplierDetails,
//             },
//             { status: 200 }
//         );
//     } catch (error) {
//         return NextResponse.json(
//             { error: error || 'Internal Server Error' },
//             { status: 500 }
//         );
//     }
// }
import { NextResponse, NextRequest } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserModel, SupplierModel } from '@/app/lib/models/user';
import { User, Title } from '@/app/types/user';
import connectDb from '@/app/lib/db/connectDb';
import { verifyTokenMiddleware } from '@/middlewares/middlewareToken'; // נניח שהמיקום של ה-middleware

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(req: NextRequest) {
    try {
        await connectDb();
        let userName: string | undefined;

        // השתמש במידלוואר
        await verifyTokenMiddleware(req as any, {} as NextResponse, () => {
            userName = (req as any).userName; // קבלת userName ממידלוואר
        });

        const { searchParams } = new URL(req.url);
        const userNameFromQuery = searchParams.get('username');

        if (!userNameFromQuery) {
            return NextResponse.json(
                { error: 'Missing username' },
=======
import { NextResponse, NextRequest } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserModel, ConsumerModel, SupplierModel } from '@/app/lib/models/user';
import { User, Title } from '@/app/types/user';
import connectDb from '@/app/lib/db/connectDb';
import { getToken } from "next-auth/jwt"; // Import NextAuth JWT helper

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const verifyToken = (token: string): string | JwtPayload => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid token');
    }
};

export async function GET(req: NextRequest) {
    try {
        await connectDb();

        const { searchParams } = new URL(req.url);
        const userNameFromQuery = searchParams.get('username');
        const emailFromQuery = searchParams.get('email'); // New parameter for Google auth

        // If no username or email is provided
        if (!userNameFromQuery && !emailFromQuery) {
            return NextResponse.json(
                { error: 'Missing username or email' },
>>>>>>> 9ae9e7a3087546fc2634f0000c5375bf030a299a
                { status: 400 }
            );
        }

<<<<<<< HEAD
        const user = await UserModel.findOne({ userName: userNameFromQuery })
            .populate('addressId')
            .populate({
                path: 'postArr',
                populate: {
                    path: 'recommendations',
                    model: 'Recommendation',
                },
            }).populate({
                path: 'likedPostsArr',
                populate: {
                    path: 'recommendations',
                    model: 'Recommendation',
                },})
            .lean<User>();

=======
        // Check for JWT token from cookies
        const tokenCookie = req.cookies.get('token');
        const token = tokenCookie ? tokenCookie.value : null;

        // Check for NextAuth token
        const nextAuthToken = await getToken({ req });

        // Determine authentication method
        let isAuthenticated = false;
        let decodedUserName = '';

        // JWT Authentication
        if (token) {
            try {
                const decoded = verifyToken(token);
                if (typeof decoded === 'object' && 'userName' in decoded) {
                    isAuthenticated = true;
                    decodedUserName = decoded.userName as string;
                }
            } catch (error) {
                // Token verification failed, continue to next auth method
            }
        }

        // NextAuth (Google) Authentication
        if (!isAuthenticated && nextAuthToken) {
            isAuthenticated = true;
            decodedUserName = nextAuthToken.email as string;
        }

        // If no authentication method is valid
        if (!isAuthenticated) {
            return NextResponse.json(
                { error: 'Authentication failed' },
                { status: 401 }
            );
        }

        // Find user by username or email
        const user = await UserModel.findOne(
            userNameFromQuery 
                ? { userName: userNameFromQuery }
                : { email: emailFromQuery }
        )
        .populate('addressId')
        .populate({
            path: 'postArr',
            populate: {
                path: 'recommendations',
                model: 'Recommendation',
            },
        })
        .lean<User>();

        // If user not found
>>>>>>> 9ae9e7a3087546fc2634f0000c5375bf030a299a
        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

<<<<<<< HEAD
        let consumerDetails, supplierDetails;

        if (
            user.titles.some((title) =>
                Object.values(Title).includes(title as Title)
            )
        ) {
            supplierDetails = await SupplierModel.findOne({ userName: userNameFromQuery }).lean();
        }

        if (user.userName !== userName) {
            const { firstName, lastName, phone, email, addressId, ...filteredUser } = user;
            console.log(":user",filteredUser,"supplierDetails:",supplierDetails,"consumerDetails",consumerDetails);
            
=======
        // Fetch additional details
        let consumerDetails, supplierDetails;
        if (user.titles.includes("consumer")) {
            consumerDetails = await ConsumerModel.findOne({ 
                userName: user.userName 
            }).lean();
        }

        if (user.titles.some(title => Object.values(Title).includes(title as Title))) {
            supplierDetails = await SupplierModel.findOne({ 
                userName: user.userName 
            }).lean();
        }

        // Determine what user details to return
        // This part remains mostly the same as your original implementation
        if (user.userName !== decodedUserName && !nextAuthToken) {
            const { firstName, lastName, phone, email, addressId, ...filteredUser } = user;
>>>>>>> 9ae9e7a3087546fc2634f0000c5375bf030a299a
            return NextResponse.json(
                {
                    message: 'User retrieved successfully',
                    user: filteredUser,
<<<<<<< HEAD
                    supplierDetails,
                    consumerDetails,
=======
                    supplierDetails: supplierDetails,
                    consumerDetails: consumerDetails
>>>>>>> 9ae9e7a3087546fc2634f0000c5375bf030a299a
                },
                { status: 200 }
            );
        }

        return NextResponse.json(
            {
                message: 'User retrieved successfully',
<<<<<<< HEAD
                user,
                supplierDetails,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
=======
                user: user,
                supplierDetails: supplierDetails,
                consumerDetails: consumerDetails
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error in user retrieval:', error);
>>>>>>> 9ae9e7a3087546fc2634f0000c5375bf030a299a
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
<<<<<<< HEAD
=======
    
>>>>>>> 9ae9e7a3087546fc2634f0000c5375bf030a299a
}
