import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificaitonEmail(
    email: string,
    username : string,
    verifyCode : string
): Promise<ApiResponse>{
    try {
        

        const { data, error } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: " Mystrymessage Verification code ",
        react: VerificationEmail({username , otp : verifyCode}),
        });

        return {
            success : true   ,
            message : "  verification email send successfully",
            data : data,
            error : error
            }

    } catch (emailError) {
        console.log("Error sending verification email",emailError);
        return {
            success : false ,
             message : "Failed to send verification email",
            data : null,
            error : null}
    }
}