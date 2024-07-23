"use client"

import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";


interface SignUpFormData {
  userName: string;
  email: string;
  password: string;
  mobileNumber: string;
  bgmiId: string;
}

const SignUp: React.FC = () => {

    const getCookie = (name: string): string | undefined => {
        return Cookies.get(name);
      };
      const router = useRouter();

    
  const [formData, setFormData] = useState<SignUpFormData>({
    userName: '',
    email: '',
    password: '',
    mobileNumber: '',
    bgmiId: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { userName, email, password, mobileNumber, bgmiId } = formData;

    if (!userName || !email || !password || !mobileNumber || !bgmiId) {
      toast.error('All fields are required');
      return;
    }

    try {
        console.log("waitint for response");
        
      const response = await axios.post('api/sign-up', formData);
      console.log(response);
      
      toast.success('Sign up successful');
      router.push('/sign-in');
    } catch (err) {
      toast.error('Sign up failed. Please try again.');
    }
  };

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 bg-black text-orange-600">
      <ToastContainer />
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground text-orange-600">Sign up your account</h1>
          <p className="mt-2 text-muted-foreground">Enter your userName and details below</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="userName">Username</Label>
            <Input id="userName" type="text" placeholder="Enter your username" value={formData.userName} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input id="password" type="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="mobileNumber">Mobile Number</Label>
            <Input id="mobileNumber" type="tel" placeholder="Enter your Mobile Number" value={formData.mobileNumber} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="bgmiId">Bgmi Id</Label>
            <Input id="bgmiId" type="text" placeholder="Enter your bgmiID" value={formData.bgmiId} onChange={handleChange} required />
          </div>
          <Link href="/sign-in" className="text-sm font-medium text-primary hover:underline text-gray-700" prefetch={false}>
            already have an account sign-in
          </Link>
          <Button type="submit" className="w-full text-orange-600">
            Sign up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
