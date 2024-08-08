import { NextRequest, NextResponse } from 'next/server';
import { RegisterREQ } from '@/model/RegisterREQ';
import dbConnect from '@/lib/dbConnect';
import { render } from '@react-email/render';
import { Teams } from '@/model/Teams';
import { User } from '@/model/User';
import RegistrationEmail from '@/emails/RegistrationEmail';
import nodemailer from 'nodemailer';
import { jwtVerify } from 'jose';


const UNAUTHORIZED = 401;
const SUCCESS = 200;
const SERVER_ERROR = 500;


export async function POST(req: NextRequest) {
    await dbConnect();

    try {
        const { transactionId, imageUrl, amount, teamName,token,tournamentName } = await req.json();
         // Check if token is present
    if (!token || token === "") {
        return NextResponse.json({ message: "Unauthorized" }, { status: UNAUTHORIZED });
      }
  
      // Verify JWT token
      const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET as string));
      const userId = payload.id as string;
  
      // Find the user by ID
      const user = await User.findById(userId).lean();
      if (!user) {
          return NextResponse.json({ message: "Unauthorized" }, { status: UNAUTHORIZED });
      } 



        // Validate the input data
        if (!transactionId || !imageUrl || amount === undefined || !teamName) {
            return NextResponse.json(
                { message: 'All fields are required' },
                { status: 400 }
            );
        }

        // Create a new registration record
        const registration = await RegisterREQ.create({
            transactionId,
            imageUrl,
            amount,
            teamName,
            userName : user.userName
        });


        const auth = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            port: 465,
            auth: {
              user: 'mayanksahu0024@gmail.com',
              pass: 'qdtj wcbt mtjs nihf',
            },
          });
      
          const emailTemplate = render(<RegistrationEmail username={user.userName} tournamentName={tournamentName} />);
          
          const receiver = {
            from: 'mayanksahu0024@gmail.com',
            to: user.email,
            subject: 'Verification Code',
            html: emailTemplate,
          };
          
          await auth.sendMail(receiver);
      

        return NextResponse.json(
            { message: 'Registration successful', registration },
            { status: 201 }
        );
        
    } catch (error : any) {
        console.error('Error registering transaction:', error);
        return NextResponse.json(
            { message: 'Failed to register transaction', error: error.message },
            { status: 500 }
        );
    }
}
