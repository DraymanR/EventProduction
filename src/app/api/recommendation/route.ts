import { NextResponse } from 'next/server';
import jwt,{JwtPayload} from 'jsonwebtoken';
import { UserModel, PostModel, RecommendationModel } from '@/app/lib/models/user';
import connectDb from '@/app/lib/db/connectDb';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const verifyToken = (token: string): string | JwtPayload => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid token');
    }
};

export default async function POST(req: Request) {
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
        }

        const decodedUserName = decoded.userName;

   
        const body = await req.json();
        const { postId, text, rate } = body;

        if (!postId || !text || !rate) {
            return NextResponse.json(
                { error: 'Missing postId, text or rate' },
                { status: 400 }
            );
        }

     
        const post = await PostModel.findById(postId);
        if (!post) {
            return NextResponse.json(
                { error: 'Post not found' },
                { status: 404 }
            );
        }

     
        const recommendation = new RecommendationModel({
            userName: decodedUserName,
            text,
            rate,
        });

        await recommendation.save();

      
        post.recommendations.push(recommendation._id);
        await post.save();

        return NextResponse.json(
            {
                message: 'Recommendation added successfully',
                recommendation,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error adding recommendation:', error);
        return NextResponse.json(
            { error: 'Error adding recommendation' },
            { status: 500 }
        );
    }
}
