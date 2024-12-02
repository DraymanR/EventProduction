
// import { NextResponse } from 'next/server';
// import { PostModel } from '@/app/lib/models/user'; 
// import connectDb from '@/app/lib/db/connectDb';

// export async function GET(req: Request) {
//     try {
//         await connectDb();

//         const { searchParams } = new URL(req.url);
//         const page = parseInt(searchParams.get('page') || '1', 10);
//         const limit = parseInt(searchParams.get('limit') || '10', 10);

//         const skip = (page - 1) * limit;

//         const title = searchParams.get('title');
//         const username = searchParams.get('username');
//         const eventCategory = searchParams.get('eventCategory');

//         let query: any = {};

//         if (title) {
//             query.title = { $regex: title, $options: 'i' }; 
//         }

//         if (username) {
//             query.userName = { $regex: username, $options: 'i' }; 
//         }

//         if (eventCategory) {
//             query.eventCategory = { $regex: eventCategory, $options: 'i' }; 
//         }

//         console.log('Query:', query);  // הדפסת השאילתה

//         // חיפוש הפוסטים על פי השאילתה עם הגבלת תוצאות לפי עמוד
//         const posts = await PostModel.find(query)
//             .skip(skip)  // דילוג על הפוסטים לפי העמוד הנוכחי
//             .limit(limit)  // הגבלת מספר הפוסטים לעמוד
//             .populate({
//                 path: 'recommendations',
//                 model: 'Recommendation',
//             })
//             .populate({
//                 path: 'postId',
//                 model: 'ConsumerPost',
//             })
//             .lean();  // שימוש ב-lean כדי למנוע יצירת אובייקטים של Mongoose

//         // חישוב סך כל הפוסטים שמחפשים
//         const totalPosts = await PostModel.countDocuments(query);

//         // החזרת תוצאות
//         return NextResponse.json(
//             {
//                 message: 'Posts retrieved successfully',
//                 posts: posts,
//                 totalPosts: totalPosts, 
//                 totalPages: Math.ceil(totalPosts / limit), 
//                 currentPage: page,
//             },
//             { status: 200 }
//         );
//     } catch (error) {
//         console.error('Error retrieving posts:', error);
//         return NextResponse.json(
//             { error: 'Error retrieving posts' },
//             { status: 500 }
//         );
//     }
// }

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
        const username = searchParams.get('username');
        const eventCategory = searchParams.get('eventCategory');
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');

        let query: any = {};

    
        if (title) {
            query.title = { $regex: title, $options: 'i' }; 
        }

        if (username) {
            query.userName = { $regex: username, $options: 'i' }; 
        }

        if (eventCategory) {
            query.eventCategory = { $regex: eventCategory, $options: 'i' }; 
        }

        if (startDate) {
            query.createDate = { $gte: new Date(startDate) };
        }

        if (endDate) {
            query.createDate = { 
                ...query.createDate, 
                $lte: new Date(endDate) 
            };
        }

        console.log('Query:', query); 

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
