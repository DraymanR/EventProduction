// middleware.ts (NEW file in project root)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyTokenMiddleware } from '@/middlewares/middlewareToken'

// Define which routes need protection
const protectedPaths = [
    '/api/protected',
    '/dashboard',
    // Add your protected routes
]

export async function middleware(request: NextRequest) {
    // Skip authentication for login and registration routes
    if (
        request.nextUrl.pathname.startsWith('/api/auth') ||
        request.nextUrl.pathname.startsWith('/login') ||
        request.nextUrl.pathname.startsWith('/register')
    ) {
        return NextResponse.next()
    }

    // Check protected routes
    if (protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
        return await verifyTokenMiddleware(
            request,
            NextResponse.next(),
            () => NextResponse.next()
        )
    }

    return NextResponse.next()
}

// Tell Next.js which routes to run middleware on
export const config = {
    matcher: [
        '/api/:path*',
        '/dashboard/:path*',
        // Add your protected paths
    ],
}