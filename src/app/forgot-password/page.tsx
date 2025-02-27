"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const router = useRouter();

  const sendOtp = async () => {
    setIsSendingOtp(true);
    try {
      const response = await axios.post("/api/auth/node-mail", { email });
      if (response.status === 200) {
        console.log(response);

        toast.success("OTP sent successfully");
        setOtpSent(true);
        setResendTimer(50); // Start the 50-second timer
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("An error occurred while sending OTP");
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleSubmitOtp = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/verifyOtp", { otp });
      if (response.status === 200) {
        console.log(response);
        localStorage.setItem("token", response.data.token);
        toast.success("OTP verified successfully");
        router.push("/change-password");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while verifying OTP");
    }
  };

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-orange-500 p-4">
      <ToastContainer />
      <Card className="w-full max-w-md text-white bg-gray-800">
        <CardHeader>
          <CardTitle className={"text-orange-500 text-2xl font-bold"}>Forgot Password</CardTitle>
          <CardDescription>Enter your email and verify your OTP.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitOtp}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button
                type="button"
                onClick={sendOtp}
                disabled={isSendingOtp || resendTimer > 0}
                className="mb-2 sm:mb-0 sm:mr-2"
              >
                {isSendingOtp ? "Sending..." : resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : "Send OTP"}
              </Button>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="otp">OTP</Label>
                <Input
                  id="otp"
                  placeholder="Enter your OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  disabled={!otpSent}
                />
              </div>
            </div>

            <CardFooter className="flex flex-col sm:flex-row justify-between mt-4">
              {otpSent && <Button type="submit" className="mb-2 sm:mb-0 sm:mr-2">Submit</Button>}
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
