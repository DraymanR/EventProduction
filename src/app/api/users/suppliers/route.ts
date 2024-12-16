import { NextResponse, NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import {  SupplierModel,UserModel } from '@/app/lib/models/user'; 
import connectDb from '@/app/lib/db/connectDb'; 
import { Title } from '@/app/types/user';
import { verifyTokenMiddleware } from '@/middlewares/middlewareToken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; 

const verifyToken = (token: string): string | jwt.JwtPayload => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid token');
    }
};


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

        const { topPrice,startingPrice } = await req.json(); 

     
        await connectDb();

        let existingSupplier = await SupplierModel.findOne({ userName: userName });


        if (!existingSupplier) {
            const user = await UserModel.findOne({ userName: userName });
            if(user&&user.titles.some((title: Title) => Object.values(Title).includes(title as Title))){
                 existingSupplier = new SupplierModel({
                    userName,
                    startingPrice: startingPrice || 0, 
                    topPrice: topPrice || 0,
                    range: 0
                });
            }else{
            return NextResponse.json(
                { error: 'Supplier not found' },
                { status: 404 }
            );}
        }
        
        if (startingPrice) {
            existingSupplier.startingPrice=startingPrice;

        }
        if (topPrice) {
            existingSupplier.topPrice=topPrice;

        }
        await existingSupplier.save();

        return NextResponse.json(
            { message: 'Supplier updated successfully' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error updating Supplier:', error);
        return NextResponse.json(
            { error: 'Error updating Supplier' },
            { status: 500 }
        );
    }
}
