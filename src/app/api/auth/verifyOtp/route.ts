import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/model/User';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';


export async function POST(req:NextRequest) {
    const {otp } = await req.json()
    const user = await User.findOne(
        {verifyCode : otp }
    );
    if(!user)
     return NextResponse.json(
    {
        error : 'Invalid OTP'
    }, 
    {
        status :400
    })
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()
    await User.updateOne(
        {email : user.email},
        {verifyCode : verifyCode}
    )
    const token = jwt.sign(
        { id: user._id, userName: user.userName },
        process.env.JWT_SECRET as string,
        { expiresIn: '7d' }
      );
      const response = NextResponse.json({
        success: true,
        message: 'User verified successfully',
        token,
      },{
        status : 200
      });
      response.headers.set('Set-Cookie', cookie.serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600,
        path: '/',
      }));
    
  
    return response;
      
}