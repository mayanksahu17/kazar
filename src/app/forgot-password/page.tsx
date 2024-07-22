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
      const response = await axios.put("/api/forgotPassword", { email });
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
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("An error occurred while verifying OTP");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-orange-500">
      <ToastContainer />
      <div className="mt-[10%] ml-[40%]">
        <Card className="w-[350px] text-orange-600 bg-black">
          <CardHeader>
            <CardTitle>Forgot Password</CardTitle>
            <CardDescription>Enter your email and Verify your OTP.</CardDescription>
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
              <CardFooter className="flex justify-between mt-4">
                <Button type="button" onClick={sendOtp} disabled={isSendingOtp}>
                  {isSendingOtp ? "Sending..." : "Send OTP"}
                </Button>
                {otpSent && <Button type="submit">Submit</Button>}
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
