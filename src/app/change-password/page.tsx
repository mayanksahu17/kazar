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

const validatePassword = (password : string) => {
  const lengthCheck = password.length >= 8;
  const numberCheck = /\d/.test(password);
  const specialCharCheck = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return lengthCheck && numberCheck && specialCharCheck;
};

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const router = useRouter();

  const handleChangePassword = async (e : any) => {
    e.preventDefault();
    if (!passwordsMatch || !passwordStrength) {
      toast.error("Passwords do not match or are not strong enough");
      return;
    }

    try {
        console.log("febi");
      const token = localStorage.getItem("token")
      const response = await axios.post("/api/changePassword", { newPassword, token });
      console.log(response);
      
      if (response.status === 200) {
        toast.success("Password changed successfully");
        router.push("/sign-in");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("An error occurred while changing the password");
    }
  };

  const handlePasswordChange = (e : any) => {
    const password = e.target.value;
    setNewPassword(password);
    setPasswordStrength(validatePassword(password));
    setPasswordsMatch(password === confirmPassword);
  };

  const handleConfirmPasswordChange = (e : any) => {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
    setPasswordsMatch(newPassword === confirmPassword);
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-orange-500">
      <ToastContainer />
      <div className="mt-[10%] ml-[40%]">
        <Card className="w-[350px] text-orange-600 bg-black">
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>Enter your new password and confirm it.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleChangePassword}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                </div>
              </div>
              <CardFooter className="flex justify-between">
                <Button type="submit" className='mt-4' disabled={!passwordStrength || !passwordsMatch}>
                  Change Password
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChangePassword;
