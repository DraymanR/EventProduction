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
import { PostModel } from '@/app/lib/models/user'; 
import connectDb from '@/app/lib/db/connectDb';

export async function GET(req: Request) {
    try {
        await connectDb();
        
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '10', 10);

        const skip = (page - 1) * limit;

        const title = searchParams.get('title');
        const userName = searchParams.get('userName');
        const type = searchParams.get('type');
        const eventCategory = searchParams.get('eventCategory');

        let query: any = {};

        // חיפוש טקסטואלי חכם בכותרת עם רג'קס
        if (title) {
            query.title = { $regex: title, $options: 'i' }; // חיפוש רג'קס רגיש לאותיות גדולות וקטנות
        }

        // הוספת חיפושים לפי שדות נוספים
        if (userName) {
            query.userName = { $regex: userName, $options: 'i' }; 
        }

        if (type) {
            query.type = type; 
        }

        if (eventCategory) {
            query.eventCategory = { $regex: eventCategory, $options: 'i' }; 
        }

        console.log('Query:', query);

        // חיפוש בפוסטים עם השאילתה שהכנו
        const posts = await PostModel.find(query)
            .skip(skip)
            .limit(limit)
            .populate({
                path: 'recommendations',
                model: 'Recommendation',
            })
            .populate({
                path: 'postId',
                model: 'ConsumerPost',
            })
            .lean();

        console.log('Posts found:', posts);

        const totalPosts = await PostModel.countDocuments(query);

        return NextResponse.json(
            {
                message: 'Posts retrieved successfully',
                posts: posts,
                totalPosts: totalPosts, 
                totalPages: Math.ceil(totalPosts / limit), 
                currentPage: page,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error retrieving posts:', error);
        return NextResponse.json(
            { error: 'Error retrieving posts' },
            { status: 500 }
        );
    }
}
