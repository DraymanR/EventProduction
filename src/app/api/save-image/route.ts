
import { NextRequest, NextResponse } from 'next/server';
import connectDb from '@/app/lib/db/connectDb';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ImgModel, PostModel } from '@/app/lib/models/user';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const verifyToken = (token: string): string | JwtPayload => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid token');
    }
};

export default async function handler(req: NextRequest, res: NextResponse) {
    if (req.method === 'POST') {
        try {

            await connectDb();

            const token = req.headers.get('Authorization')?.split(' ')[1];

            if (!token) {
                return NextResponse.json(
                    { error: 'Missing token' },
                    { status: 401 }
                );
            }

            const decoded = verifyToken(token);


            if (typeof decoded !== 'object' || !('userName' in decoded)) {
                return NextResponse.json(
                    { error: 'Invalid token structure' },
                    { status: 401 }
                );
            };

            const decodedUserName = decoded.userName;

            const body = await req.json();
            const { imageUrl, postId } = body;

            
            const post = await PostModel.findById(postId);
            if (!post) {
                return NextResponse.json(
                    { error: 'Post not found' },
                    { status: 404 }
                );
            }

            const newImg = new ImgModel({
                imageUrl: imageUrl
            });

            await newImg.save();

            post.album.push(newImg.imgUrl);
            await post.save()

            return NextResponse.json(
                {
                    message: 'Image URL saved successfully',
                    newImg,
                },
                { status: 201 }
            )
        } catch (error) {

            console.error('Error saving image URL:', error);
            return NextResponse.json(
                { error: 'Error saving image URL' },
                { status: 500 }
            );

        }
    } else {
        return NextResponse.json(
            { error: 'Method not allowed' },
            { status: 405 }
        )

    }
}