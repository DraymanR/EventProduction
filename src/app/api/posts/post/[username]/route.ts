import { NextResponse } from 'next/server';
import { UserModel, PostModel, ConsumerPostModel } from '@/app/lib/models/user';
import connectDb from '@/app/lib/db/connectDb';

export async function POST(req: Request) {
    try {
        await connectDb();

        const { searchParams } = new URL(req.url);
        const userName = searchParams.get('username');
        console.log(userName);
        // בדיקה אם username נמסר
        if (!userName) {
            return NextResponse.json(
                { error: 'Missing username' },
                { status: 400 }
            );
        }

        // חיפוש המשתמש לפי userName
        const user = await UserModel.findOne({ userName });
        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // קריאת גוף הבקשה
        const body = await req.json();
        const { title, description, album, recommendations, eventCategory, budget, supplierNameArr } = body;

        // בדיקת תקינות נתונים
        if (!title || !description) {
            return NextResponse.json(
                { error: 'Missing or invalid post data' },
                { status: 400 }
            );
        }
        let newPost;

        if (user.title === 'consumer') {
            if (!supplierNameArr || !Array.isArray(supplierNameArr)) {
                return NextResponse.json(
                    { error: 'Missing supplier name array for consumer post' },
                    { status: 400 }
                );
            }

            // יצירת פוסט לצרכן
            const consumerPost = new ConsumerPostModel({
                eventCategory,
                supplierNameArr,
                budget,
            });

            await consumerPost.save();


            newPost = new PostModel({
                userName: user.userName,
                createDate: new Date(),
                album,
                title,
                description,
                recommendations: recommendations || [],
                postId: consumerPost._id,
            });



        }
        else {
            newPost = new PostModel({
                userName: user.userName,
                createDate: new Date(),
                album,
                title,
                description,
                recommendations: recommendations || [],

            });



        }
        await newPost.save();
        user.postArr.push(newPost._id);
        await user.save();
        return NextResponse.json(
            {
                message: 'Post added successfully',
                post: newPost,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error adding post:', error);
        return NextResponse.json(
            { error: 'Error adding post' },
            { status: 500 }
        );
    }
}
