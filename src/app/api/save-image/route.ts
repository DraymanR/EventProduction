import { NextRequest, NextResponse } from 'next/server';
import connectDb from '../../lib/db/connectDb';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ImgModel, PostModel } from '../../lib/models/user';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const verifyToken = (token: string): string | JwtPayload => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid token');
    }
};

export async function POST(req: NextRequest) {
    try {
        await connectDb();

        console.log('inside the POST save-image function , still did nothing :)')

        // const token = req.headers.get('Authorization')?.split(' ')[1];

        // if (!token) {
        //     return NextResponse.json(
        //         { error: 'Missing token' },
        //         { status: 401 }
        //     );
        // }

        // const decoded = verifyToken(token);

        // if (typeof decoded !== 'object' || !('userName' in decoded)) {
        //     return NextResponse.json(
        //         { error: 'Invalid token structure' },
        //         { status: 401 }
        //     );
        // }

        // const decodedUserName = decoded.userName;

        const body = await req.json();
        const { imageUrl, postId } = body;

        console.log(`this is my imageUrl that come from the claudinery: ${imageUrl}`)


        if (!postId || !imageUrl) {
            return NextResponse.json(
                { error: 'postId or imageUrl not found' },
                { status: 404 }
            );
        }

        const post = await PostModel.findById(postId);
        if (!post) {
            return NextResponse.json(
                { error: 'Post not found' },
                { status: 404 }
            );
        }

        const newImg = new ImgModel({
            imgUrl: imageUrl,
        });

        await newImg.save();

        post.album.push(newImg.imgUrl);
        await post.save();

        return NextResponse.json(
            {
                message: 'Image URL saved successfully',
                newImg,
            },
            { status: 201 ,
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
        console.error('Error saving image URL:', error);
        return NextResponse.json(
            { error: 'Error saving image URL' },
            { status: 500 }
        );
    }
}
