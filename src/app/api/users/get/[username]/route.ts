import { NextResponse, NextRequest } from 'next/server';
import { UserModel, SupplierModel } from '@/app/lib/models/user';
import { User, Title } from '@/app/types/user';
import connectDb from '@/app/lib/db/connectDb';
import { verifyTokenMiddleware } from '@/middlewares/middlewareToken';

export async function GET(req: NextRequest) {
    try {
        console.log('API Request received:', req.url);
        
        await connectDb();
        let userName: string | undefined;

        // Log middleware execution
        try {
            await verifyTokenMiddleware(req as any, {} as NextResponse, () => {
                userName = (req as any).userName;
                console.log('Middleware userName:', userName);
            });
        } catch (middlewareError) {
            console.error('Middleware error:', middlewareError);
            return NextResponse.json(
                { error: 'Authentication failed' },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(req.url);
        console.log('Search params:', Object.fromEntries(searchParams.entries()));
        
        const userNameFromQuery = searchParams.get('username');
        const emailFromQuery = searchParams.get('email');

        console.log('Query parameters:', {
            username: userNameFromQuery,
            email: emailFromQuery
        });

        if (!userNameFromQuery && !emailFromQuery) {
            console.error('Missing parameters - username and email are both null');
            return NextResponse.json(
                { error: 'Missing username or email parameter' },
                { status: 400 }
            );
        }

        let query = {};
        if (emailFromQuery) {
            query = { email: decodeURIComponent(emailFromQuery) };
        } else if (userNameFromQuery) {
            query = { userName: decodeURIComponent(userNameFromQuery) };
        }

        console.log('Database query:', query);

        const user = await UserModel.findOne(query)
            .populate('addressId')
            .populate({
                path: 'postArr',
                populate: [
                    { path: 'recommendations', model: 'Recommendation' },
                    { path: 'postId', model: 'ConsumerPost' },
                ]
            })
            .populate({
                path: 'likedPostsArr',
                populate: [
                    { path: 'recommendations', model: 'Recommendation' },
                    { path: 'postId', model: 'ConsumerPost' },
                ]
            })
            .lean<User>();

        console.log('User found:', user ? 'Yes' : 'No');

        if (!user) {
            console.log('User not found for query:', query);
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        let supplierDetails;
        if (user.titles.some((title) => Object.values(Title).includes(title as Title))) {
            supplierDetails = await SupplierModel.findOne({ userName: user.userName }).lean();
            console.log('Supplier details found:', supplierDetails ? 'Yes' : 'No');
        }

        const isOwnProfile = user.userName === userName;
        console.log('Is own profile:', isOwnProfile);

        const response = isOwnProfile
            ? { message: 'User retrieved successfully', user }
            : {
                message: 'User retrieved successfully',
                user: {
                    ...user,
                    firstName: undefined,
                    lastName: undefined,
                    addressId: undefined,
                    likedPeople: undefined,
                    likedPostsArr: undefined,
                },
                supplierDetails,
            };

        return NextResponse.json(response, {
            status: 200,
            headers: {
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production'
                    ? 'https://event-production-fawn.vercel.app'
                    : 'http://localhost:3000',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            }
        });
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}