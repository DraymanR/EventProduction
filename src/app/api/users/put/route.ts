import { NextResponse,NextRequest } from 'next/server';
import { UserModel, AddressModel } from '@/app/lib/models/user';
import connectDb from '@/app/lib/db/connectDb';
import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const verifyToken = (token: string): string | JwtPayload => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid token');
    }
};
export async function PUT(req: NextRequest) {
    try {
        const { firstName, lastName, address,description } = await req.json();

       
        if (!firstName && !lastName && !address) {
            return NextResponse.json(
                { error: 'Missing fields to update' },
                { status: 400 }
            );
        }

      
        await connectDb();

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
      
        // חיפוש המשתמש
        const user = await UserModel.findOne({ userName: decodedUserName }).lean();

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        const updateFields: any = {}; 

        // עדכון השם הפרטי או המשפחה אם יש צורך
        if (firstName) updateFields.firstName = firstName;
        if (lastName) updateFields.lastName = lastName;
        if (description) updateFields.description = description;
        
        // אם יש כתובת חדשה, נעדכן רק את השדות שהמשתמש ביקש לשנות
        if (address) {
            const addressUpdateFields: any = {};

            // עדכון העיר אם נשלחה
            if (address.city) addressUpdateFields.city = address.city;

            // עדכון הרחוב אם נשלח
            if (address.street) addressUpdateFields.street = address.street;

            // עדכון הקוד הדואר אם נשלח
            if (address.zipCode) addressUpdateFields.zipCode = address.zipCode;

            // עדכון הבניין אם נשלח
            if (address.building) addressUpdateFields.building = address.building;

            // אם יש שדות לעדכון, נעדכן את הכתובת
            if (Object.keys(addressUpdateFields).length > 0) {
                const updatedAddress = await AddressModel.findByIdAndUpdate(user.addressId, addressUpdateFields, { new: true });
                if (updatedAddress) {
                    updateFields.addressId = updatedAddress._id;
                }
            }
        }

        // עדכון המשתמש
        const updatedUser = await UserModel.findByIdAndUpdate(user._id, updateFields, { new: true });

        if (!updatedUser) {
            return NextResponse.json(
                { error: 'Error updating user' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: 'User updated successfully', user: updatedUser },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json(
            { error: 'Error updating user' },
            { status: 500 }
        );
    }
}
