import { NextRequest, NextResponse } from 'next/server';
import shortid from 'shortid';
import Razorpay from 'razorpay';
import dbConnect from '@/lib/dbConnect';
import { render } from '@react-email/render';
import { Teams } from '@/model/Teams';
import { Tournaments } from '@/model/Tournaments';
import { User } from '@/model/User';
import RegistrationEmail from '@/emails/RegistrationEmail';
import nodemailer from 'nodemailer';
import { jwtVerify } from 'jose';

const UNAUTHORIZED = 401;
const SUCCESS = 200;
const SERVER_ERROR = 500;
const BAD_REQUEST = 400;



export async function POST(req: NextRequest) {
    await dbConnect();

    try {
        let { amount, teamName, token, tournamentName ,razorpayPaymentId,  razorpayOrderId,razorpaySignature} = await req.json();
        
        // Validate the presence of the token
        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: UNAUTHORIZED });
        }

        // Verify JWT token
        let payload;
        try {
            const verified = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!));
            payload = verified.payload;
        } catch (err) {
            return NextResponse.json({ message: "Unauthorized - Invalid Token" }, { status: UNAUTHORIZED });
        }

        const userId = payload.id as string;

        // Find the user by ID
        const user = await User.findById(userId).lean();
        if (!user) {
            return NextResponse.json({ message: "Unauthorized - User not found" }, { status: UNAUTHORIZED });
        }

        if (teamName === "") {
            teamName = user.userName
        }
       
    
        // Send confirmation email to the user
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

       
        const emailTemplate = render(
            <RegistrationEmail username={user.userName} tournamentName={tournamentName} team={teamName} />
        );

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Registration Confirmation',
            html: emailTemplate,
        };
        
        await transporter.sendMail(mailOptions);

        return NextResponse.json({
            message: 'Registration successful',       
            user
        }, { status: SUCCESS });

    } catch (err: any) {
        console.error('Server error:', err);
        return NextResponse.json({ error: 'Internal Server Error', details: err.message }, { status: SERVER_ERROR });
    }
}
