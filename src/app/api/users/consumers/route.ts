// import { NextResponse, NextRequest } from 'next/server';
// import jwt from 'jsonwebtoken';
// import {  ConsumerModel,PostModel,UserModel } from '@/app/lib/models/user'; 
// import connectDb from '@/app/lib/db/connectDb'; 

// const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; 

// const verifyToken = (token: string): string | jwt.JwtPayload => {
//     try {
//         return jwt.verify(token, JWT_SECRET);
//     } catch (error) {
//         throw new Error('Invalid token');
//     }
// };

// export async function PUT(req: NextRequest) {
//     try {
//         const tokenCookie = req.cookies.get('token'); 
//         const token = tokenCookie ? tokenCookie.value : null;  

//         if (!token) {
//             return NextResponse.json(
//                 { error: 'Missing token in cookies' },
//                 { status: 401 }
//             );
//         }

//         const decoded = verifyToken(token);

//         if (typeof decoded !== 'object' || !('userName' in decoded)) {
//             return NextResponse.json(
//                 { error: 'Invalid token structure' },
//                 { status: 401 }
//             );
//         }

//         const decodedUserName = decoded.userName;

//         const { favoritePostID, favoriteUserName } = await req.json(); 

     
//         await connectDb();

//         let existingConsumer = await ConsumerModel.findOne({ userName: decodedUserName });


//         if (!existingConsumer) {
//             const user = await UserModel.findOne({ userName: decodedUserName });
//             if(user&&user.titles.includes('consumer')){
//                  existingConsumer = new ConsumerModel({
//                     userName: decodedUserName,
//                     likedPostsArr: [],
//                     likedPeople: []
//                 });
//             }else{
//             return NextResponse.json(
//                 { error: 'Consumer not found' },
//                 { status: 404 }
//             );}
//         }
        
 
//         if (favoritePostID) {
//             const existingPost = await PostModel.findById(favoritePostID);
//                 if (!existingConsumer.likedPostsArr.includes(favoritePostID)&&existingPost) {
//                     existingConsumer.likedPostsArr.push(favoritePostID);
//                 }
//         }

        
//         if (favoriteUserName) {
//             const existingUser = await UserModel.findOne({ userName: decodedUserName });
//                 if (!existingConsumer.likedPeople.includes(favoriteUserName)&&existingUser) {
//                     existingConsumer.likedPeople.push(favoriteUserName); 
//                 }
          
//         }

//         await existingConsumer.save();

//         return NextResponse.json(
//             { message: 'Consumer updated successfully' },
//             { status: 200 }
//         );

//     } catch (error) {
//         console.error('Error updating consumer:', error);
//         return NextResponse.json(
//             { error: 'Error updating consumer' },
//             { status: 500 }
//         );
//     }
// }
