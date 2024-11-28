
import { NextResponse } from 'next/server';
import { PostModel } from '@/app/lib/models/user'; 
import connectDb from '@/app/lib/db/connectDb';

export async function GET(req: Request) {
    try {
        await connectDb();

      
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '10', 10); 

    
        const skip = (page - 1) * limit;

       
        const posts = await PostModel.find()
            .skip(skip) 
            .limit(limit) 
            .populate({
                path: 'recommendations',
                model: 'Recommendation',
            })
            .populate({
                path: 'postId',
                model: 'ConsumerPost',
            })
            .lean();

        const totalPosts = await PostModel.countDocuments();

        return NextResponse.json(
            {
                message: 'Posts retrieved successfully',
                posts: posts,
                totalPosts: totalPosts, 
                totalPages: Math.ceil(totalPosts / limit), 
                currentPage: page,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error retrieving posts:', error);
        return NextResponse.json(
            { error: 'Error retrieving posts' },
            { status: 500 }
        );
    }
}
