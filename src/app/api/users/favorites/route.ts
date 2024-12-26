import { NextResponse, NextRequest } from 'next/server';
import { verifyTokenMiddleware } from '@/middlewares/middlewareToken'; 
import { PostModel, UserModel } from '@/app/lib/models/user';
import connectDb from '@/app/lib/db/connectDb';

export async function PUT(req: NextRequest) {
    try {
        await connectDb();
        
        // Verify token and extract username
        const userName = await new Promise<string | null>((resolve, reject) => {
            verifyTokenMiddleware(req as any, {} as any, () => {
                resolve((req as any).userName);
            }).catch(reject);
        });

        if (!userName) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Extract data from the request body
        const { favoritePostID, favoriteUserName } = await req.json();

        // Validate input
        if (!favoritePostID && !favoriteUserName) {
            return NextResponse.json({ error: 'Missing favoritePostID or favoriteUserName' }, { status: 400 });
        }

        // Find or create the user
        let existingConsumer = await UserModel.findOne({ userName });
        if (!existingConsumer) {
            return NextResponse.json({ error: 'Consumer not found' }, { status: 404 });
        }

        // Update liked posts
        if (favoritePostID) {
            const existingPost = await PostModel.findById(favoritePostID);
            if (!existingPost) {
                return NextResponse.json({ error: 'Post not found' }, { status: 404 });
            }

            if (!existingConsumer.likedPostsArr) {
                existingConsumer.likedPostsArr = [];
            }

            if (!existingConsumer.likedPostsArr.includes(favoritePostID)) {
                existingConsumer.likedPostsArr.push(favoritePostID);
            }
        }

        // Update liked users
        if (favoriteUserName) {
            const existingUser = await UserModel.findOne({ userName: favoriteUserName });
            if (!existingUser) {
                return NextResponse.json({ error: 'User not found' }, { status: 404 });
            }

            if (!existingConsumer.likedPeople.includes(favoriteUserName)) {
                existingConsumer.likedPeople.push(favoriteUserName);
            }
        }

        // Save the updated user data
        await existingConsumer.save();

        return NextResponse.json({ message: 'User updated successfully' }, {
            status: 200,
            headers: {
                
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production'
                    ? 'https://your-production-url.com'
                    : 'http://localhost:3000',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',

            }
        });

    } catch (error) {
        console.error('Error updating User:', error);
        return NextResponse.json({ error: 'Error updating User' }, { status: 500 });
    }
}
