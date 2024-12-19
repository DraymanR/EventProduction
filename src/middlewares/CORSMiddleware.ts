
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request : NextRequest) {
    console.log('Middleware is running'); // Log to confirm
  const response = NextResponse.next();

  // Add CORS headers to the response
  response.headers.set('Access-Control-Allow-Origin', 'https://event-production-fawn.vercel.app');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight request
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: response.headers,
    });
  }

  return response;
}

export const config = {
    matcher: '/api/:path*', // Only apply middleware to API routes
  };
  
