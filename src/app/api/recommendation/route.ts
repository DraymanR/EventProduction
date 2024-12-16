


import { NextRequest, NextResponse } from 'next/server';
import { verifyTokenMiddleware } from '@/middlewares/middlewareToken';
import { PostModel, RecommendationModel } from '@/app/lib/models/user';
import connectDb from '@/app/lib/db/connectDb';

// תפקוד POST



export async function POST(req: NextRequest) {

    try {
        await connectDb();

        let userName: string | undefined;

        // קריאה למידלוואר
        await verifyTokenMiddleware(req as any, {} as NextResponse, () => {
            userName = (req as any).userName; // קבלת userName ממידלוואר
        });



        const body = await req.json();
        const { postId, text, rate } = body;

        if (!postId || !text || !rate) {
            return NextResponse.json(
                { error: 'Missing postId, text, or rate' },
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
            userName, // הוספת userName כאן
            text,
            rate,
        });

        await recommendation.save();
        post.recommendations.push(recommendation._id);
        await post.save();

        return NextResponse.json(
            { message: 'Recommendation added successfully', recommendation },
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