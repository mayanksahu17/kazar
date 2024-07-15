import { NextRequest, NextResponse } from 'next/server';
import { sendVerificaitonEmail } from '@/helpers/sendVerificationEmail';
import validator from 'validator'
import { User } from '@/model/User';
import { verify } from 'crypto';



export async function PUT(request: NextRequest) {
    try {
      const { email } = await request.json();
  
      if (!validator.isEmail(email)) {
        return NextResponse.json({ errors: ['Invalid email'] }, { status: 400 });
      }
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
  
      const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
      await User.updateOne({ email }, { verifyCode });
  
      const response = await sendVerificaitonEmail(email, user.userName, verifyCode);
      return NextResponse.json({ response });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
  }


