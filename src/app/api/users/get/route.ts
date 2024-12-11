<<<<<<< HEAD

=======
>>>>>>> main
import { NextResponse } from 'next/server';
import { UserModel } from '@/app/lib/models/user';  
import connectDb from '@/app/lib/db/connectDb';

export async function GET(req: Request) {
    try {
        await connectDb();

        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '10', 10);
        const skip = (page - 1) * limit;

        const city = searchParams.get('city');
        const title = searchParams.get('title');
        const language = searchParams.get('language');

        let query: any = {};

<<<<<<< HEAD
        // אם יש ערך בשדה העיר, הוסף אותו לשאילתא
        if (city) {
            query['addressId.city'] = { $regex: city, $options: 'i' };  // חיפוש בעיר
        }

        // אם יש ערך בשדה הכותרת, הוסף אותו לשאילתא
        if (title) {
            query.title = { $regex: title, $options: 'i' };  // חיפוש בכותרת
        }

        // אם יש ערך בשדה השפה, הוסף אותו לשאילתא
        if (language) {
            query.language = { $regex: language, $options: 'i' };  // חיפוש בשפה
        }
=======
        if (city) {
            query['addressId.city'] = { $regex: city, $options: 'i' }; 
        }

        if (title) {
            query.title = { $elemMatch: { $regex: title, $options: 'i' } };
        }
        
        if (language) {
            query.language = { $elemMatch: { $regex: language, $options: 'i' } };
        }
        
        
>>>>>>> main

        console.log('Query:', query);

        // חפש את המשתמשים לפי השאילתא שהוגדרה
        const users = await UserModel.find(query)
            .skip(skip)  // דלג על הנתונים שכבר הוצגו
            .limit(limit)  // הגבל את התוצאות לפי המגבלה
            .populate('addressId') // ממלא את פרטי הכתובת ממודל הכתובת
            .lean(); // הפוך לאובייקט רגיל ולא דוקומנט של Mongoose

        const totalUsers = await UserModel.countDocuments(query); // ספר את כל המשתמשים שמתאימים לשאילתא

        return NextResponse.json(
            {
                message: 'Users retrieved successfully',
                users: users,
                totalUsers: totalUsers,
                totalPages: Math.ceil(totalUsers / limit),
                currentPage: page,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error retrieving users:', error);
        return NextResponse.json(
            { error: 'Error retrieving users' },
            { status: 500 }
        );
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> main
