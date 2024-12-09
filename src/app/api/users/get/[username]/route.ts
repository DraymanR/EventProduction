
import { NextResponse, NextRequest } from 'next/server'; 
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserModel, ConsumerModel, SupplierModel } from '@/app/lib/models/user';
import { User,Title } from '@/app/types/user';
import connectDb from '@/app/lib/db/connectDb';

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

        if (!userNameFromQuery) {
            return NextResponse.json(
                { error: 'Missing username' },
                { status: 400 }
            );
        }

      
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
        const user = await UserModel.findOne({ userName: userNameFromQuery })
            .populate('addressId')
            .populate({
                path: 'postArr',
                populate: {
                    path: 'recommendations',
                    model: 'Recommendation',
                },
            })
            .lean<User>();

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        let consumerDetails,supplierDetails;

        if (user.titles.includes("consumer")) {
          
            consumerDetails = await ConsumerModel.findOne({ userName: userNameFromQuery }).lean();
          }
        if (user.titles.some(title => Object.values(Title).includes(title as Title))){
       
            supplierDetails = await SupplierModel.findOne({ userName: userNameFromQuery }).lean();
          } else
          
          


        if (user.userName !== decodedUserName) {
            const { firstName, lastName, phone, email, addressId, ...filteredUser } = user;
            return NextResponse.json(
                {
                    message: 'User retrieved successfully',
                    user: filteredUser,
                    supplierDetails: supplierDetails,
                    consumerDetails:consumerDetails
                },
                { status: 200 }
            );
        }

        return NextResponse.json(
            {
                message: 'User retrieved successfully',
                user: user,
                supplierDetails: supplierDetails,
                consumerDetails:consumerDetails
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: error || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
