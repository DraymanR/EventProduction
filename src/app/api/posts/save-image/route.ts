// import { NextRequest, NextResponse } from 'next/server';
// import connectDb from '@/app/lib/db/connectDb';
// import jwt, { JwtPayload } from 'jsonwebtoken';
// import { ImgModel, PostModel } from '@/app/lib/models/user';



// export async function POST(req: NextRequest) {
//     try {
//         await connectDb();

//         console.log('inside the POST save-image function , still did nothing :)')

//         // const token = req.headers.get('Authorization')?.split(' ')[1];

//         // if (!token) {
//         //     return NextResponse.json(
//         //         { error: 'Missing token' },
//         //         { status: 401 }
//         //     );
//         // }

//         // const decoded = verifyToken(token);

//         // if (typeof decoded !== 'object' || !('userName' in decoded)) {
//         //     return NextResponse.json(
//         //         { error: 'Invalid token structure' },
//         //         { status: 401 }
//         //     );
//         // }

//         // const decodedUserName = decoded.userName;

//         const body = await req.json();
//         const { imageUrl, postId } = body;

//         console.log(`this is my imageUrl that come from the claudinery: ${imageUrl}`)


//         if (!postId || !imageUrl) {
//             return NextResponse.json(
//                 { error: 'postId or imageUrl not found' },
//                 { status: 404 }
//             );
//         }

//         const post = await PostModel.findById(postId);
//         if (!post) {
//             return NextResponse.json(
//                 { error: 'Post not found' },
//                 { status: 404 }
//             );
//         }

//         const newImg = new ImgModel({
//             imgUrl: imageUrl,
//         });

//         await newImg.save();

//         post.album.push(newImg.imgUrl);
//         await post.save();

//         return NextResponse.json(
//             {
//                 message: 'Image URL saved successfully',
//                 newImg,
//             },
//             { status: 201 }
//         );
//     } catch (error) {
//         console.error('Error saving image URL:', error);
//         return NextResponse.json(
//             { error: 'Error saving image URL' },
//             { status: 500 }
//         );
//     }
// }

import { NextRequest, NextResponse } from 'next/server';
import connectDb from '../../../lib/db/connectDb';
import { ImgModel, PostModel } from '../../../lib/models/user';

export async function POST(req: NextRequest) {
    try {
        // התחברות למסד הנתונים
        await connectDb();
        console.log('Connected to database for save-image operation.');

        // קריאת body מתוך הבקשה
        const body = await req.json();
        const { imageUrl, postId } = body;

        // בדיקה של תקינות הקלט
        if (!postId || !imageUrl) {
            console.error('Missing postId or imageUrl in request.');
            return NextResponse.json(
                { error: 'postId or imageUrl not found' },
                { status: 400 }
            );
        }

        // חיפוש הפוסט לפי postId
        const post = await PostModel.findById(postId);
        if (!post) {
            console.error(`Post with ID ${postId} not found.`);
            return NextResponse.json(
                { error: 'Post not found' },
                { status: 404 }
            );
        }

        // יצירת התמונה החדשה ושמירתה
        const newImg = new ImgModel({
            imgUrl: imageUrl,
        });
        await newImg.save();
        console.log(`Image saved with URL: ${imageUrl}`);

        // עדכון מערך album בפוסט
        post.album.push(newImg.imgUrl);
        await post.save();
        console.log(`Post with ID ${postId} updated with new image.`);

        // תגובה מוצלחת
        return NextResponse.json(
            {
                message: 'Image URL added to post successfully.',
                post,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error saving image URL:', error);
        return NextResponse.json(
            { error: 'Error saving image URL' },
            { status: 500 }
        );
    }
}
