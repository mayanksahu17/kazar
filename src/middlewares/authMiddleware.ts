import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose'; 

export async function authMiddleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
 
  
    try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    req.user = payload as { _id: string; userName: string };
    return NextResponse.next();
  } catch (error) {
    console.error('JWT verification error', error);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}
