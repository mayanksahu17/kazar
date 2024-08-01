"use client";
import { useState } from 'react';
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
  const router = useRouter();

  const sendOtp = async () => {
    setIsSendingOtp(true);
    try {
      const response = await axios.post("/api/node-mail", { email });
      if (response.status === 200) {
        console.log(response);

        toast.success("OTP sent successfully");
        setOtpSent(true);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("An error occurred while sending OTP");
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleSubmitOtp = async (e : any) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/verifyOtp", { otp });
      if (response.status === 200) {
        console.log(response);
        localStorage.setItem("token",response.data.token)
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
                <Button type="button" onClick={sendOtp} disabled={isSendingOtp} className="mb-2 sm:mb-0 sm:mr-2">
                  {isSendingOtp ? "Sending..." : "Send OTP"}
                </Button>
                {otpSent && <Button type="submit">Submit</Button>}
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
  );
};

export default ForgotPassword;
