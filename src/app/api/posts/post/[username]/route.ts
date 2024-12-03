import { NextResponse, NextRequest } from 'next/server'; 
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserModel, ConsumerPostModel, PostModel } from '@/app/lib/models/user';
import connectDb from '@/app/lib/db/connectDb';

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

        const tokenCookie = req.cookies.get('token'); 
        const token = tokenCookie ? tokenCookie.value : null;  

        if (!token) {
            return NextResponse.json(
                { error: 'Missing token' },
                { status: 401 }
            );
        }

        let decoded;
        try {
            decoded = verifyToken(token);
        } catch (error) {
            return NextResponse.json(
                { error: 'Invalid token' },
                { status: 401 }
            );
        }

        if (typeof decoded !== 'object' || !('userName' in decoded)) {
            return NextResponse.json(
                { error: 'Invalid token structure' },
                { status: 401 }
            );
        }

        const decodedUserName = decoded.userName;

        const { searchParams } = new URL(req.url);
        const userName = searchParams.get('username');

        if (!userName) {
            return NextResponse.json(
                { error: 'Missing username' },
                { status: 400 }
            );
        }

        if (userName!==decodedUserName ) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 403 }
            );
        }

        const user = await UserModel.findOne({ userName });
        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        const body = await req.json();
        const { title, description, album, recommendations, eventCategory, budget, supplierNameArr } = body;

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
        } else {
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
