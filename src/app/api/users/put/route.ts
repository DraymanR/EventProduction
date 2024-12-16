
import { NextResponse,NextRequest } from 'next/server';
import { UserModel, AddressModel } from '../../../lib/models/user';
import connectDb from '../../../lib/db/connectDb';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../../../types/user';

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
        const { firstName, lastName, address, description, title, language } = await req.json();

        if (!firstName && !lastName && !address && !title && !language) {
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
        const user = await UserModel.findOne({ userName: decodedUserName }).populate('addressId').lean<User>();

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
        
        // עדכון כתובת אם נשלחה
        if (address) {
            const addressUpdateFields: any = {};

            if (address.city) addressUpdateFields.city = address.city;
            if (address.street) addressUpdateFields.street = address.street;
            if (address.zipCode) addressUpdateFields.zipCode = address.zipCode;
            if (address.building) addressUpdateFields.building = address.building;

            if (Object.keys(addressUpdateFields).length > 0) {
                const updatedAddress = await AddressModel.findOneAndUpdate({userName:decodedUserName}, addressUpdateFields, { new: true });
                if (updatedAddress) {
                    updateFields.addressId = updatedAddress._id;
                }
            }
        }

        // אם נשלחו טיטלים חדשים, נוסיף אותם
        if (title) {
            if (Array.isArray(title)) {
                updateFields.titles = title; 
            } else if (!user.titles.includes(title)) {

                updateFields.titles = [...user.titles, title];
              
            }
            
        }

        // אם נשלחו שפות חדשות, נוסיף אותן
        if (language) {
            if (Array.isArray(language)) {
                updateFields.language = language; // אם נשלח מערך חדש של שפות, נעדכן את המערך
            } else if (!user.languages.includes(language)) {
                updateFields.language = [...user.languages, language]; // אם לא קיימת כבר, נוסיף שפה חדשה
            }
        }

        // עדכון המשתמש במסד הנתונים
        const updatedUser = await UserModel.findOneAndUpdate({userName:decodedUserName}, updateFields, { new: true });

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

// import { NextResponse,NextRequest } from 'next/server';
// import { UserModel, AddressModel } from '@/app/lib/models/user';
// import connectDb from '@/app/lib/db/connectDb';
// import jwt, { JwtPayload } from 'jsonwebtoken';
// import { User } from '@/app/types/user';

// const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
// const verifyToken = (token: string): string | JwtPayload => {
//     try {
//         return jwt.verify(token, JWT_SECRET);
//     } catch (error) {
//         throw new Error('Invalid token');
//     }
// };

// export async function PUT(req: NextRequest) {
//     try {
//         const { firstName, lastName, address, description, title, language } = await req.json();

//         if (!firstName && !lastName && !address && !title && !language) {
//             return NextResponse.json(
//                 { error: 'Missing fields to update' },
//                 { status: 400 }
//             );
//         }

//         await connectDb();

//         const tokenCookie = req.cookies.get('token'); 
//         const token = tokenCookie ? tokenCookie.value : null;  

//         if (!token) {
//             return NextResponse.json(
//                 { error: 'Missing token' },
//                 { status: 401 }
//             );
//         }

//         let decoded;
//         try {
//             decoded = verifyToken(token);
//         } catch (error) {
//             return NextResponse.json(
//                 { error: 'Invalid token' },
//                 { status: 401 }
//             );
//         }

//         if (typeof decoded !== 'object' || !('userName' in decoded)) {
//             return NextResponse.json(
//                 { error: 'Invalid token structure' },
//                 { status: 401 }
//             );
//         }

//         const decodedUserName = decoded.userName;
      
//         // חיפוש המשתמש
//         const user = await UserModel.findOne({ userName: decodedUserName }).populate('addressId').lean<User>();

//         if (!user) {
//             return NextResponse.json(
//                 { error: 'User not found' },
//                 { status: 404 }
//             );
//         }

//         const updateFields: any = {}; 

//         // עדכון השם הפרטי או המשפחה אם יש צורך
//         if (firstName) updateFields.firstName = firstName;
//         if (lastName) updateFields.lastName = lastName;
//         if (description) updateFields.description = description;
        
//         // עדכון כתובת אם נשלחה
//         if (address) {
//             const addressUpdateFields: any = {};

//             if (address.city) addressUpdateFields.city = address.city;
//             if (address.street) addressUpdateFields.street = address.street;
//             if (address.zipCode) addressUpdateFields.zipCode = address.zipCode;
//             if (address.building) addressUpdateFields.building = address.building;

//             if (Object.keys(addressUpdateFields).length > 0) {
//                 const updatedAddress = await AddressModel.findOneAndUpdate({userName:decodedUserName}, addressUpdateFields, { new: true });
//                 if (updatedAddress) {
//                     updateFields.addressId = updatedAddress._id;
//                 }
//             }
//         }

//         // אם נשלחו טיטלים חדשים, נוסיף אותם
//         if (title) {
//             if (Array.isArray(title)) {
//                 updateFields.titles = title; 
//             } else if (!user.titles.includes(title)) {

//                 updateFields.titles = [...user.titles, title];
              
//             }
            
//         }

//         // אם נשלחו שפות חדשות, נוסיף אותן
//         if (language) {
//             if (Array.isArray(language)) {
//                 updateFields.language = language; // אם נשלח מערך חדש של שפות, נעדכן את המערך
//             } else if (!user.languages.includes(language)) {
//                 updateFields.language = [...user.languages, language]; // אם לא קיימת כבר, נוסיף שפה חדשה
//             }
//         }

//         // עדכון המשתמש במסד הנתונים
//         const updatedUser = await UserModel.findOneAndUpdate({userName:decodedUserName}, updateFields, { new: true });

//         if (!updatedUser) {
//             return NextResponse.json(
//                 { error: 'Error updating user' },
//                 { status: 500 }
//             );
//         }

//         return NextResponse.json(
//             { message: 'User updated successfully', user: updatedUser },
//             { status: 200 }
//         );
//     } catch (error) {
//         console.error('Error updating user:', error);
//         return NextResponse.json(
//             { error: 'Error updating user' },
//             { status: 500 }
//         );
//     }
