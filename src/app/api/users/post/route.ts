// import { NextResponse } from 'next/server';
// import bcrypt from 'bcryptjs';
// import { UserModel, AuthModel, AddressModel } from '@/app/lib/models/user'; // הוספת מודל לכתובת
// import connectDb from '@/app/lib/db/connectDb'; // חיבור למסד נתונים

// export async function POST(req: Request) {
//     try {
//         const { userId, firstName, lastName, userName, email, password, title, phone, language, address } = await req.json();

//         if (!userId || !firstName || !lastName || !userName || !email || !password || !title || !phone || !language || !address) {
//             return NextResponse.json(
//                 { error: 'Missing required fields' },
//                 { status: 400 }
//             );
//         }

//         // הצפנת הסיסמה
//         const salt = await bcrypt.genSalt(10); // יצירת salt להצפנה
//         const hashedPassword = await bcrypt.hash(password, salt); // הצפנת הסיסמה

//         // חיבור למסד הנתונים
//         await connectDb();
//         const newAuth = new AuthModel({
//             email,
//             password: hashedPassword,
//         });

//         await newAuth.save();
//         const updatedAddress = {
//             ...address,
//             userId,
//         };


//         const newAddress = new AddressModel(updatedAddress);
//         await newAddress.save();

//         const newUser = new UserModel({
//             userId,
//             firstName,
//             lastName,
//             userName,
//             email,
//             title,
//             phone,
//             language,
//             address: newAddress._id,
//         });

//         await newUser.save();



//         return NextResponse.json(
//             { message: 'User created successfully', newUser },
//             { status: 201 }
//         );
//     } catch (error) {
//         console.error('Error creating user:', error);
//         return NextResponse.json(
//             { error: 'Error creating user' },
//             { status: 500 }
//         );
//     }
// }
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { UserModel, AuthModel, AddressModel, SupplierModel, ConsumerModel } from '@/app/lib/models/user'; // כולל את המודלים החדשים
import connectDb from '@/app/lib/db/connectDb'; 

export async function POST(req: Request) {
    try {
        const {  firstName, lastName, userName, email, password, title, phone, language, address, description ,topPrice,startingPrice} = await req.json();

        // בדיקה אם כל השדות נמסרו
        if (  !firstName || !lastName || !userName || !email || !password || !title || !phone || !language || !address || !description) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // הצפנת הסיסמה
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // חיבור למסד הנתונים
        await connectDb();

        // יצירת משתמש חדש באוטנטיקציה
        const newAuth = new AuthModel({
            email,
            password: hashedPassword,
        });

        await newAuth.save();

     
        const updatedAddress = {
            userName,
            ...address // השתמש בשדות שהגיעו מהבקשה
        };
        const newAddress = new AddressModel(updatedAddress);
        await newAddress.save();

        // יצירת משתמש חדש עם הכתובת החדשה
        const newUser = new UserModel({
            firstName,
            lastName,
            userName,
            email,
            title,
            phone,
            language,
            addressId: newAddress._id, // הוספת ה-ObjectId של הכתובת
            description, // הוספת תיאור למשתמש
            postArr: [], // הוספת מערך הפוסטים (אם יש)
        });

        await newUser.save();

        // במקרה של "supplier" או "consumer", יצירת רשומה מתאימה למודל
        if (title === 'supplier') {
            const newSupplier = new SupplierModel({
                userName,
                startingPrice:startingPrice|| 0, // ניתן להוסיף שדות נוספים אם דרושים
                topPrice:topPrice|| 0,
                range: 0
            });
            await newSupplier.save();
        } else if (title === 'consumer') {
            const newConsumer = new ConsumerModel({
                userName,
                likedPostsArr: [], 
                likedPeople: []
            });
            await newConsumer.save();
        }


        return NextResponse.json(
            { message: 'User created successfully', newUser },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json(
            { error: 'Error creating user' },
            { status: 500 }
        );
    }
}
