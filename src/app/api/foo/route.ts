            import type { NextApiRequest, NextApiResponse } from 'next';
            import { EmailTemplate } from '../../../../emails/emailTemplate';
            import { Resend } from 'resend';
            import { NextRequest, NextResponse } from 'next/server';
            import VerificationEmail from '../../../../emails/VerificationEmail';
            const resend = new Resend(process.env.RESEND_API_KEY);

            export async function POST(req : NextRequest) {
                try {
                const { data, error } = await resend.emails.send({
                    from: 'onboarding@resend.dev',
                    to: "mayank0real0world@gmail.com",
                    subject: 'Hello world',
                    text : " Mystrymessage Verification code",
                    react: VerificationEmail({username : "Mayank" , otp : "4356"})
                });
            
                if (error) {
                    return Response.json({ error }, { status: 500 });
                }
            
                return NextResponse.json({
                    data: data,
                    success : true
                    }, { status: 200 });
                
                } catch (error) {
                return Response.json({ error }, { status: 500 });
                }
            }