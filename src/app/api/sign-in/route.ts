import dbConnect from '@/lib/dbConnect';
import bcryptjs from 'bcryptjs';
import { User } from '@/model/User';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import cookie from 'cookie';
import createError from 'http-errors';
import { authMiddleware } from '@/middlewares/authMiddleware';
import { getUser } from '@/helpers/getUser';
const MAX_FAILED_ATTEMPTS = 5;
const LOCK_TIME = 30 * 60 * 1000; // 30 minutes

export async function POST(req: NextRequest, res: NextResponse) {
  await dbConnect();

  try {
      const { userName, password } = await req.json();
      console.log(userName, password);
      
      if (!userName || !password) {
          throw createError(400, 'Please provide username and password');
        }
        
    const user = await User.findOne({ userName });

    if (!user) {
      throw createError(401, 'Invalid username or password');
    }

    if (user.isLocked) {
      if (Date.now() > user.lockUntil) {
        user.isLocked = false;
        user.loginAttempts = 0;
        await user.save();
      } else {
        throw createError(403, 'Account locked. Please try again after 30 minutes');
      }
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      user.loginAttempts += 1;
      if (user.loginAttempts >= MAX_FAILED_ATTEMPTS) {
        user.isLocked = true;
        user.lockUntil = Date.now() + LOCK_TIME;
      }
      await user.save();
      throw createError(401, 'Invalid username or password. ');
    }

    user.loginAttempts = 0;
    user.isLocked = false;
    await user.save();

    const token = jwt.sign(
      { id: user._id, userName: user.userName },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    const response = NextResponse.json({
      success: true,
      message: 'User authenticated successfully',
      token,
    });

    response.headers.set('Set-Cookie', cookie.serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600,
      path: '/',
    }));

    return response;
  } catch (error: any) {
    console.error('Error authenticating user', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Error authenticating user',
    }, { status: error.statusCode || 500 });
  }
}
