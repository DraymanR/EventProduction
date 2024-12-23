

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
            { status: 201 ,
                headers: {
                    'Access-Control-Allow-Credentials': 'true',
                    'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production' 
                        ? 'https://event-production-git-main-riva-draimans-projects.vercel.app/'
                        : 'http://localhost:3000',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                }
            }
        );
    } catch (error) {
        console.error('Error saving image URL:', error);
        return NextResponse.json(
            { error: 'Error saving image URL' },
            { status: 500 }
        );
    }
}
