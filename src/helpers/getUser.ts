import { NextRequest, NextResponse , NextMiddleware} from 'next/server';
import { jwtVerify } from 'jose'; 
import { StartOfWeek } from 'mongoose';


interface User extends NextResponse {
  _id : string ;
  userName : string ;
}
export async function getUser(req: NextRequest) {
    const token = req.cookies.get('token')?.value;
  
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
   
     
      try {
      const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
      req.user  = payload as { _id: string; userName: string };

      return  req.user.userName ;
    } catch (error) {
      console.error('JWT verification error', error);
    
    }
  }
  