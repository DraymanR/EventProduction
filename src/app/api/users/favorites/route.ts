import { NextResponse, NextRequest } from 'next/server';
import { verifyTokenMiddleware } from '../../../../middlewares/middlewareToken'; 
import { PostModel, UserModel } from '../../../lib/models/user';
import connectDb from '../../../lib/db/connectDb';

export async function PUT(req: NextRequest) {
    try {
      
        await connectDb();
        const userName = await new Promise<string | null>((resolve, reject) => {
            verifyTokenMiddleware(req as any, {} as any, () => {
                resolve((req as any).userName);
            }).catch(reject);
        });

        if (!userName) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { favoritePostID, favoriteUserName } = await req.json();

        let existingConsumer = await UserModel.findOne({ userName });

        if (!existingConsumer) {
            const user = await UserModel.findOne({ userName });
            if (user) {
                existingConsumer = new UserModel({
                    userName,
                    likedPostsArr: [],
                    likedPeople: [],
                });
            } else {
                return NextResponse.json(
                    { error: 'Consumer not found' },
                    { status: 404 }
                );
            }
        }

        // עדכון לייקים לפוסטים
        if (favoritePostID) {
            console.log(favoritePostID);
            const existingPost = await PostModel.findById(favoritePostID);
            console.log(existingPost);
            console.log(existingConsumer.likedPostsArr);
            if (!existingConsumer.likedPostsArr) {
                existingConsumer.likedPostsArr = [];
            }
            if (
                !existingConsumer.likedPostsArr.includes(favoritePostID) &&
                existingPost
            ) {
                existingConsumer.likedPostsArr.push(favoritePostID);
            }
        }

        // עדכון לייקים למשתמשים
        if (favoriteUserName) {
            const existingUser = await UserModel.findOne({
                userName: favoriteUserName,
            });
            if (
                !existingConsumer.likedPeople.includes(favoriteUserName) &&
                existingUser
            ) {
                existingConsumer.likedPeople.push(favoriteUserName);
            }
        }

        // שמירת השינויים
        await existingConsumer.save();

        return NextResponse.json(
            { message: 'User updated successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating User:', error);
        return NextResponse.json(
            { error: 'Error updating User' },
            { status: 500 }
        );
    }
}
