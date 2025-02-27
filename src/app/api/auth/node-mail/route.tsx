import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import VerificationEmail from '@/emails/VerificationEmail';
import React from 'react';
import { User } from '@/model/User';
import validator from 'validator'
import dbConnect from '@/lib/dbConnect';

export async function POST(req: NextRequest) {
  try {
    await dbConnect()
    const { email } = await req.json();

    if (!validator.isEmail(email)) {
      return NextResponse.json({ errors: ['Invalid email'] }, { status: 400 });
    }

    console.log("test");
    const user = await User.findOne({ email })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const verifyCode = Math.floor(100000 +   Math.random() * 900000).toString();
    await User.updateOne({ email }, { verifyCode });

    const auth = nodemailer.createTransport({
      service: 'gmail',
      secure: true,
      port: 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const emailTemplate = render(<VerificationEmail username={user.userName} otp={verifyCode} />);
    
    const receiver = {
      from: 'scrimsscrown@gmail.com',
      to: email,
      subject: 'Verification Code',
      html: emailTemplate,
    };
    
    await auth.sendMail(receiver);

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200});
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Error occurred while sending the email' }, { status: 500 });
  }
}
