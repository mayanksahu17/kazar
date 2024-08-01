// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { rateLimitMiddleware } from './middlewares/rateLimitMiddleware';
import { authMiddleware } from './middlewares/authMiddleware';

export async function middleware(req: NextRequest) {
  // Apply rate limit middleware
  let response = await rateLimitMiddleware(req);
  if (response) return response;

  // Apply auth middleware
  response = await authMiddleware(req);
  if (response) return response;

  const token = req.cookies.get('token');
  console.log(token)

  // Redirect authenticated users away from sign-in and sign-up pages
  if (token && (req.nextUrl.pathname === '/sign-in' || req.nextUrl.pathname === '/sign-up')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Allow access to the route
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/sign-in',
    '/sign-up',
    '/secure/:path*',
    '/api/:path*',
  ],
};
