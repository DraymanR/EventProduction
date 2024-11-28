import { NextResponse } from 'next/server';
import { UserModel, PostModel, ConsumerPostModel } from '@/app/lib/models/user';
import connectDb from '@/app/lib/db/connectDb';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary 
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(req: Request) {
    try {
        await connectDb();

        const { searchParams } = new URL(req.url);
        const userName = searchParams.get('username');
        
        if (!userName) {
            return NextResponse.json(
                { error: 'Missing username' },
                { status: 400 }
            );
        }

        // Find the user
        const user = await UserModel.findOne({ userName });
        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // Parse request body
        const body = await req.json();
        const { 
            title, 
            description, 
            album, // This should now be an array of Cloudinary upload results or URLs
            recommendations, 
            eventCategory, 
            budget, 
            supplierNameArr 
        } = body;

        // Validate core post data
        if (!title || !description) {
            return NextResponse.json(
                { error: 'Missing or invalid post data' },
                { status: 400 }
            );
        }

        // Validate and process Cloudinary URLs
        let processedAlbum: string[] = [];
        if (album && Array.isArray(album)) {
            // If album contains full Cloudinary upload results
            processedAlbum = album.map(item => {
                // Handle both URL string and upload result object
                return typeof item === 'string' 
                    ? item 
                    : item.secure_url || item.url;
            }).filter(url => url); // Remove any undefined URLs
        }

        let newPost;

        if (user.title === 'consumer') {
            if (!supplierNameArr || !Array.isArray(supplierNameArr)) {
                return NextResponse.json(
                    { error: 'Missing supplier name array for consumer post' },
                    { status: 400 }
                );
            }

            // Create consumer post
            const consumerPost = new ConsumerPostModel({
                eventCategory,
                supplierNameArr,
                budget,
            });

            await consumerPost.save();
            newPost = new PostModel({
                userName: user.userName,
                createDate: new Date(),
                album: processedAlbum,
                title,
                description,
                recommendations: recommendations || [],
                postId: consumerPost._id,
            });
        } else {
            newPost = new PostModel({
                userName: user.userName,
                createDate: new Date(),
                album: processedAlbum,
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