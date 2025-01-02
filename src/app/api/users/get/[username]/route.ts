import { NextResponse, NextRequest } from 'next/server';
import { UserModel, SupplierModel } from '@/app/lib/models/user';
import { User, Title } from '@/app/types/user';
import connectDb from '@/app/lib/db/connectDb';
import { verifyTokenMiddleware } from '@/middlewares/middlewareToken';

export async function GET(req: NextRequest) {
    try {
        await connectDb();
        let userName: string | undefined;

        // Verify token
        await verifyTokenMiddleware(req as any, {} as NextResponse, () => {
            userName = (req as any).userName;
        });

        const { searchParams } = new URL(req.url);
        const userNameFromQuery = searchParams.get('username');
        const emailFromQuery = searchParams.get('email');

        if (!userNameFromQuery && !emailFromQuery) {
            return NextResponse.json(
                { error: 'Missing username or email' },
                { status: 400 }
            );
        }

        // Build query based on available parameters
        const query = emailFromQuery 
            ? { email: decodeURIComponent(emailFromQuery) }
            : { userName: decodeURIComponent(userNameFromQuery!) };

        const user = await UserModel.findOne(query)
            .populate('addressId')
            .populate({
                path: 'postArr',
                populate: [
                    {
                        path: 'recommendations',
                        model: 'Recommendation',
                    },
                    {
                        path: 'postId',
                        model: 'ConsumerPost',
                    },
                ]
            })
            .populate({
                path: 'likedPostsArr',
                populate: [{
                    path: 'recommendations',
                    model: 'Recommendation',
                }, {
                    path: 'postId',
                    model: 'ConsumerPost',
                }]
            })
            .lean<User>();

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        let supplierDetails;
        if (user.titles.some((title) => Object.values(Title).includes(title as Title))) {
            supplierDetails = await SupplierModel.findOne({ 
                userName: user.userName 
            }).lean();
        }

        // Filter sensitive data if not requesting own profile
        if (user.userName !== userName) {
            const { firstName, lastName, addressId, likedPeople, likedPostsArr, ...filteredUser } = user;
            return NextResponse.json(
                {
                    message: 'User retrieved successfully',
                    user: filteredUser,
                    supplierDetails,
                },
                {
                    status: 200,
                    headers: {
                        'Access-Control-Allow-Credentials': 'true',
                        'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production'
                            ? 'https://event-production-fawn.vercel.app'
                            : 'http://localhost:3000',
                        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                    }
                }
            );
        }

        return NextResponse.json(
            {
                message: 'User retrieved successfully',
                user,
            },
            {
                status: 200,
                headers: {
                    'Access-Control-Allow-Credentials': 'true',
                    'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production'
                        ? 'https://event-production-fawn.vercel.app'
                        : 'http://localhost:3000',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                }
            }
        );
    } catch (error) {
        console.error('Error retrieving user:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}