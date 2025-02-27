import dbConnect from '@/lib/dbConnect';
import bcryptjs from 'bcryptjs';
import { User } from '@/model/User';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import cookie from 'cookie';

const MAX_FAILED_ATTEMPTS = 5;
const LOCK_TIME = 30 * 60 * 1000; 

export async function POST(req: NextRequest, res: NextResponse) {
  await dbConnect();

  try {
    const { userNameOrEmail, password } = await req.json();

    if (!userNameOrEmail || !password) {
      return NextResponse.json({ success: false, message: 'Please provide username/email and password' }, { status: 400 });
    }
    console.log(userNameOrEmail);
    

    // Check if userNameOrEmail is an email or username
    const query = userNameOrEmail.includes('@') ? { email: userNameOrEmail } : { userName: userNameOrEmail };
    const user = await User.findOne(query);

    if (!user) {
      return NextResponse.json({ success: false, message: `You don't have any account. Please create one` }, { status: 404 });
    }

    if (user.isLocked) {
      if (Date.now() > user.lockUntil) {
        user.isLocked = false;
        user.loginAttempts = 0;
        await user.save();
      } else {
        return NextResponse.json({ success: false, message: 'Account locked. Please try again after 30 minutes' }, { status: 401 });
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
      return NextResponse.json({ success: false, message: 'Invalid username/email or password.' }, { status: 401 });
    }

    user.loginAttempts = 0;
    user.isLocked = false;
    await user.save();

    const token = jwt.sign(
      { id: user._id, userName: user.userName, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    );

    const response = NextResponse.json({
      success: true,
      message: "Signed in successfully!",
      token,
      data: user
    });

    response.headers.set('Set-Cookie', cookie.serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600,
      path: '/verifyOtp',
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
