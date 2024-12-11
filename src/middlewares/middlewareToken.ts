import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// מפתח סודי
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// טיפוס מותאם אישית לבקשה עם יוזר
interface CustomRequest extends NextRequest {
    userName?: string; // הוספת userName לבקשה
}

// פונקציית המידלוואר
export async function verifyTokenMiddleware(req: CustomRequest, res: NextResponse, next: () => void) {
    try {
        const tokenCookie = req.cookies.get('token');
        const token = tokenCookie?.value;

        if (!token) {
            return NextResponse.json(
                { error: 'Missing token' },
                { status: 401 }
            );
        }

        // אימות הטוקן
        const decoded: any = jwt.verify(token, JWT_SECRET);

        // הוספת userName ל-req
        req.userName = decoded.userName;
       
        
        if (!req.userName) {
            return NextResponse.json(
                { error: 'User not authenticated' },
                { status: 401 }
            );
        }
        // אם הטוקן תקין, נמשיך לפונקציה הבאה
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        return NextResponse.json(
            { error: 'Invalid token' },
            { status: 401 }
        );
    }
}
