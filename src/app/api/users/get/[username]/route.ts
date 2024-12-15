import { NextResponse, NextRequest } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserModel, ConsumerModel, SupplierModel } from '@/app/lib/models/user';
import { User, Title } from '@/app/types/user';
import connectDb from '@/app/lib/db/connectDb';
import { getToken } from "next-auth/jwt"; // Import NextAuth JWT helper

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const verifyToken = (token: string): string | JwtPayload => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid token');
    }
};

export async function GET(req: NextRequest) {
    try {
        await connectDb();

        const { searchParams } = new URL(req.url);
        const userNameFromQuery = searchParams.get('username');
        const emailFromQuery = searchParams.get('email'); // New parameter for Google auth

        // If no username or email is provided
        if (!userNameFromQuery && !emailFromQuery) {
            return NextResponse.json(
                { error: 'Missing username or email' },
                { status: 400 }
            );
        }

        // Check for JWT token from cookies
        const tokenCookie = req.cookies.get('token');
        const token = tokenCookie ? tokenCookie.value : null;

        // Check for NextAuth token
        const nextAuthToken = await getToken({ req });

        // Determine authentication method
        let isAuthenticated = false;
        let decodedUserName = '';

        // JWT Authentication
        if (token) {
            try {
                const decoded = verifyToken(token);
                if (typeof decoded === 'object' && 'userName' in decoded) {
                    isAuthenticated = true;
                    decodedUserName = decoded.userName as string;
                }
            } catch (error) {
                // Token verification failed, continue to next auth method
            }
        }

        // NextAuth (Google) Authentication
        if (!isAuthenticated && nextAuthToken) {
            isAuthenticated = true;
            decodedUserName = nextAuthToken.email as string;
        }

        // If no authentication method is valid
        if (!isAuthenticated) {
            return NextResponse.json(
                { error: 'Authentication failed' },
                { status: 401 }
            );
        }

        // Find user by username or email
        const user = await UserModel.findOne(
            userNameFromQuery 
                ? { userName: userNameFromQuery }
                : { email: emailFromQuery }
        )
        .populate('addressId')
        .populate({
            path: 'postArr',
            populate: {
                path: 'recommendations',
                model: 'Recommendation',
            },
        })
        .lean<User>();

        // If user not found
        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // Fetch additional details
        let consumerDetails, supplierDetails;
        if (user.titles.includes("consumer")) {
            consumerDetails = await ConsumerModel.findOne({ 
                userName: user.userName 
            }).lean();
        }

        if (user.titles.some(title => Object.values(Title).includes(title as Title))) {
            supplierDetails = await SupplierModel.findOne({ 
                userName: user.userName 
            }).lean();
        }

        // Determine what user details to return
        // This part remains mostly the same as your original implementation
        if (user.userName !== decodedUserName && !nextAuthToken) {
            const { firstName, lastName, phone, email, addressId, ...filteredUser } = user;
            return NextResponse.json(
                {
                    message: 'User retrieved successfully',
                    user: filteredUser,
                    supplierDetails: supplierDetails,
                    consumerDetails: consumerDetails
                },
                { status: 200 }
            );
        }

        return NextResponse.json(
            {
                message: 'User retrieved successfully',
                user: user,
                supplierDetails: supplierDetails,
                consumerDetails: consumerDetails
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error in user retrieval:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
    
}
