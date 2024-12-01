import { NextResponse } from 'next/server';
import { UserModel, AddressModel, SupplierModel, ConsumerModel, PostModel, RecommendationModel } from '@/app/lib/models/user';
import { User } from '@/app/types/user';
import connectDb from '@/app/lib/db/connectDb';

export async function GET(req: Request) {
    try {
        await connectDb();

        const { searchParams } = new URL(req.url);
        const userName = searchParams.get('username');

        // בדיקה אם username נמסר
        if (!userName) {
            return NextResponse.json(
                { error: 'Missing username' },
                { status: 400 }
            );
        }

        // חיפוש המשתמש לפי username כולל כתובת, פוסטים והמלצות
        const user = await UserModel.findOne({ userName })
            .populate('addressId') // שליפה של כתובת
            .populate({
                path: 'postArr', // שליפה של פוסטים
                populate: {
                    path: 'recommendations', // שליפה של המלצות בכל פוסט
                    model: 'Recommendation', // שימוש במודל ההמלצות
                },
            })
            .lean<User>();

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        let userDetailes;
        // בדיקה אם המשתמש הוא "supplier" או "consumer" והוספת מידע רלוונטי
        if (user.title === 'supplier') {
            userDetailes = await SupplierModel.findOne({ userName }).lean();
        } else if (user.title === 'consumer') {
            userDetailes = await ConsumerModel.findOne({ userName }).lean();
        }

        // החזרת פרטי המשתמש כולל פוסטים והמלצות
        return NextResponse.json(
            {
                message: 'User retrieved successfully',
                user: user,
                userDetailes: userDetailes,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error retrieving user:', error);
        return NextResponse.json(
            { error: 'Error retrieving user' },
            { status: 500 }
        );
    }
}
