import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyTokenMiddleware } from '@/middlewares/middlewareToken'

// Define which routes need protection
const protectedPaths = [
    '/pages/user-account/message-box',
    '/pages/user-account/favorite-event',
    '/pages/user-account/my-events',
    '/pages/user-account/personal-details',
    // to add her all the pages that just login user can route (that check the token before)
]

export async function middleware(request: NextRequest) {
    // Skip authentication for login and registration routes
    //TO DO: check what is the routs that i need to update here.
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
        '/pages/user-account/message-box',
        '/pages/user-account/favorite-event',
        '/pages/user-account/my-events',
        '/pages/user-account/personal-details',
        // Add your protected paths
    ],
}