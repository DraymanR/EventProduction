
// // import { NextResponse } from 'next/server';
// // import { UserModel } from '../../../lib/models/user';  
// // import connectDb from '../../../lib/db/connectDb';

// // export async function GET(req: Request) {
// //     try {
// //         await connectDb();

// //         const { searchParams } = new URL(req.url);
// //         const page = parseInt(searchParams.get('page') || '1', 10);
// //         const limit = parseInt(searchParams.get('limit') || '10', 10);
// //         const skip = (page - 1) * limit;

// //         const city = searchParams.get('city');
// //         const title = searchParams.get('title');
// //         const language = searchParams.get('language');

// //         let query: any = {};

// //         if (city) {
// //             query['addressId.city'] = { $regex: city, $options: 'i' }; 
// //         }

// //         if (title) {
// //             query.titles = { $elemMatch: { $regex: title, $options: 'i' } };
// //         }
        
// //         if (language) {
// //             query.languages = { $elemMatch: { $regex: language, $options: 'i' } };
// //         }
        
        

// //         console.log('Query:', query);

      
// //         const users = await UserModel.find(query)
// //         .skip(skip)
// //         .limit(limit)// בחר רק את השדות שברצונך להחזיר
// //         .populate('addressId', 'city')
// //         .select('userName email phone titles languages profileImage ') // אם אתה רוצה גם להציג את פרטי הכתובת
// //         .lean();

// //         const totalUsers = await UserModel.countDocuments(query); // ספר את כל המשתמשים שמתאימים לשאילתא

// //         return NextResponse.json(
// //             {
// //                 message: 'Users retrieved successfully',
// //                 users: users,
// //                 totalUsers: totalUsers,
// //                 totalPages: Math.ceil(totalUsers / limit),
// //                 currentPage: page,
// //             },
// //             { status: 200 ,
// //                 headers: {
// //                     'Access-Control-Allow-Credentials': 'true',
// //                     'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production' 
// //                         ? 'https://event-production-git-main-riva-draimans-projects.vercel.app'
// //                         : 'http://localhost:3000',
// //                     'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
// //                     'Access-Control-Allow-Headers': 'Content-Type, Authorization',
// //                 }
// //             }
// //         );
// //     } catch (error) {
// //         console.error('Error retrieving users:', error);
// //         return NextResponse.json(
// //             { error: 'Error retrieving users' },
// //             { status: 500 }
// //         );
// //     }
// // }

// import { NextResponse } from 'next/server';
// import { UserModel } from '../../../lib/models/user';  
// import connectDb from '../../../lib/db/connectDb';

// export async function GET(req: Request) {
//     try {
//         await connectDb();

//         const { searchParams } = new URL(req.url);
//         const page = parseInt(searchParams.get('page') || '1', 10);
//         const limit = parseInt(searchParams.get('limit') || '10', 10);
//         const skip = (page - 1) * limit;

//         const city = searchParams.get('city');
//         const titles = searchParams.get('title')?.split(','); // תמיכה ברשימה של טייטלים
//         const languages = searchParams.get('language')?.split(','); // תמיכה ברשימה של שפות

//         let query: any = {};

//         if (city) {
//             query['addressId.city'] = { $regex: city, $options: 'i' }; 
//         }

//         if (titles && titles.length > 0) {
//             query.titles = { $in: titles.map(title => new RegExp(title, 'i')) }; // תמיכה ברשימה של טייטלים
//         }
        
//         if (languages && languages.length > 0) {
//             query.languages = { $in: languages.map(language => new RegExp(language, 'i')) }; // תמיכה ברשימה של שפות
//         }

//         console.log('Query:', query);

//         const users = await UserModel.find(query)
//             .skip(skip)
//             .limit(limit)
//             .populate('addressId', 'city')
//             .select('userName email phone titles languages profileImage')
//             .lean();

//         const totalUsers = await UserModel.countDocuments(query);

//         return NextResponse.json(
//             {
//                 message: 'Users retrieved successfully',
//                 users: users,
//                 totalUsers: totalUsers,
//                 totalPages: Math.ceil(totalUsers / limit),
//                 currentPage: page,
//             },
//             { 
//                 status: 200,
//                 headers: {
//                     'Access-Control-Allow-Credentials': 'true',
//                     'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production' 
//                         ? 'https://event-production-git-main-riva-draimans-projects.vercel.app'
//                         : 'http://localhost:3000',
//                     'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//                     'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//                 }
//             }
//         );
//     } catch (error) {
//         console.error('Error retrieving users:', error);
//         return NextResponse.json(
//             { error: 'Error retrieving users' },
//             { status: 500 }
//         );
//     }
// }

import { NextResponse } from 'next/server';
import { UserModel } from '../../../lib/models/user';  
import connectDb from '../../../lib/db/connectDb';

export async function GET(req: Request) {
    try {
        await connectDb();

        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '10', 10);
        const skip = (page - 1) * limit;

        const city = searchParams.get('city');
        const titles = searchParams.get('title')?.split(','); // תמיכה ברשימה של טייטלים
        const languages = searchParams.get('language')?.split(','); // תמיכה ברשימה של שפות
        const userName = searchParams.get('userName'); // חיפוש לפי שם משתמש

        let query: any = {};

        if (city) {
            query['addressId.city'] = { $regex: city, $options: 'i' }; // חיפוש בעיר
        }

        if (titles && titles.length > 0) {
            query.titles = { $in: titles.map(title => new RegExp(title, 'i')) }; // חיפוש לפי טייטלים
        }
        
        if (languages && languages.length > 0) {
            query.languages = { $in: languages.map(language => new RegExp(language, 'i')) }; // חיפוש לפי שפות
        }

        if (userName) {
            query.userName = { $regex: userName, $options: 'i' }; // חיפוש לפי שם משתמש
        }

        console.log('Query:', query);

        const users = await UserModel.find(query)
            .skip(skip)
            .limit(limit)
            .populate('addressId', 'city')
            .select('userName email phone titles languages profileImage')
            .lean();

        const totalUsers = await UserModel.countDocuments(query);

        return NextResponse.json(
            {
                message: 'Users retrieved successfully',
                users: users,
                totalUsers: totalUsers,
                totalPages: Math.ceil(totalUsers / limit),
                currentPage: page,
            },
            { 
                status: 200,
                headers: {
                    'Access-Control-Allow-Credentials': 'true',
                    'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production' 
                        ? 'https://event-production-git-main-riva-draimans-projects.vercel.app'
                        : 'http://localhost:3000',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                }
            }
        );
    } catch (error) {
        console.error('Error retrieving users:', error);
        return NextResponse.json(
            { error: 'Error retrieving users' },
            { status: 500 }
        );
    }
}
