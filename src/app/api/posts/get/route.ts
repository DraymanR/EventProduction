
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

       
//         const posts = await PostModel.find()
//             .skip(skip) 
//             .limit(limit) 
//             .populate({
//                 path: 'recommendations',
//                 model: 'Recommendation',
//             })
//             .populate({
//                 path: 'postId',
//                 model: 'ConsumerPost',
//             })
//             .lean();

//         const totalPosts = await PostModel.countDocuments();

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
        const type = searchParams.get('type');
        const eventCategory = searchParams.get('eventCategory');

        let query: any = {};

        // בדיקה אם יש פרמטרים להציב בשאילתה
        if (title) {
            query.title = { $regex: title, $options: 'i' }; // חיפוש רג'קס בכותרת
        }

        if (username) {
            query.userName = { $regex: username, $options: 'i' }; // חיפוש לפי שם משתמש
        }

        if (type) {
            query.type = type; // חיפוש לפי סוג
        }

        if (eventCategory) {
            query.eventCategory = { $regex: eventCategory, $options: 'i' }; // חיפוש לפי קטגוריית אירוע
        }

        console.log('Query:', query);  // הדפסת השאילתה

        // חיפוש הפוסטים על פי השאילתה עם הגבלת תוצאות לפי עמוד
        const posts = await PostModel.find(query)
            .skip(skip)  // דילוג על הפוסטים לפי העמוד הנוכחי
            .limit(limit)  // הגבלת מספר הפוסטים לעמוד
            .populate({
                path: 'recommendations',
                model: 'Recommendation',
            })
            .populate({
                path: 'postId',
                model: 'ConsumerPost',
            })
            .lean();  // שימוש ב-lean כדי למנוע יצירת אובייקטים של Mongoose

        // חישוב סך כל הפוסטים שמחפשים
        const totalPosts = await PostModel.countDocuments(query);

        // החזרת תוצאות
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
