import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token || token === '') {
    return NextResponse.json({ message: 'Unauthorized', token }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    return NextResponse.json({ success: true, message: 'User is authenticated', data: payload.userName }, { status: 200 });
  } catch (error) {
    console.error('Error verifying JWT:', error);
    return NextResponse.json({ message: 'Invalid token', error }, { status: 401 });
  }
}
