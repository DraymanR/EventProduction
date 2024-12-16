import { NextResponse, NextRequest } from 'next/server';
import { UserModel, SupplierModel } from '@/app/lib/models/user';
import { User, Title } from '@/app/types/user';
import connectDb from '@/app/lib/db/connectDb';
import { verifyTokenMiddleware } from '@/middlewares/middlewareToken'; // נניח שהמיקום של ה-middleware

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(req: NextRequest) {
    try {
        await connectDb();
        let userName: string | undefined;

        // השתמש במידלוואר
        await verifyTokenMiddleware(req as any, {} as NextResponse, () => {
            userName = (req as any).userName; // קבלת userName ממידלוואר
        });

        const { searchParams } = new URL(req.url);
        const userNameFromQuery = searchParams.get('username');

        if (!userNameFromQuery) {
            return NextResponse.json(
                { error: 'Missing username' },
                { status: 400 }
            );
        }

        const user = await UserModel.findOne({ userName: userNameFromQuery })
            .populate('addressId')
            .populate({
                path: 'postArr',
                populate: {
                    path: 'recommendations',
                    model: 'Recommendation',
                },
            }).populate({
                path: 'likedPostsArr',
                populate: {
                    path: 'recommendations',
                    model: 'Recommendation',
                },})
            .lean<User>();




        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }
        let  supplierDetails;

        if (
            user.titles.some((title) =>
                Object.values(Title).includes(title as Title)
            )
        ) {
            supplierDetails = await SupplierModel.findOne({ userName: userNameFromQuery }).lean();
        }

        if (user.userName !== userName) {


            const { firstName, lastName, phone, email, addressId, ...filteredUser } = user;
            console.log(":user",filteredUser,"supplierDetails:",supplierDetails)//),"consumerDetails",consumerDetails);
            
            return NextResponse.json(
                {
                    message: 'User retrieved successfully',
                    user: filteredUser,
                    supplierDetails,
 
                },
                { status: 200 }
            );
        }

        return NextResponse.json(
            {
                message: 'User retrieved successfully',
                user,
            
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );}
}

