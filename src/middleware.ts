import { NextRequest, NextResponse } from 'next/server';
import {  rateLimitMiddleware } from './middlewares/rateLimitMiddleware';
import {  authMiddleware } from './middlewares/authMiddleware';


export async function middleware(req: NextRequest) {
  // Apply rate limit middleware
  let response = await rateLimitMiddleware(req);
  if (response) return response;

  // Apply auth middleware
  response = await authMiddleware(req);
  if (response) return response;

  console.log('User:', req.user); // This should now print the user object if authentication is successful

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/secure/:path*', // Match all routes under /secure
    '/api/:path*',    // Match all routes under /api
  ],
};
