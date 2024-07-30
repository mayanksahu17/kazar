"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    _id: "",
    userName: "",
    email: "",
    mobileNumber: "",
    bgmiId: "",
    walletBalance: 0,
    UPI: "",
  });
  const router = useRouter();

  useEffect(() => {
    // Hardcoded user data for now
    const hardcodedData = {
      _id: "669bcdfeeeb14eb59a02fb73",
      userName: "test",
      email: "1mayank0real0world@gmail.com",
      mobileNumber: "6263420391",
      bgmiId: "345235856",
      walletBalance: 0,
      UPI: "",
    };
    setProfile(hardcodedData);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "/api/update-profile",
        { ...profile, token },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Failed to update profile.");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Error updating profile.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-4xl w-full mx-auto bg-gray-800 rounded-lg p-6">
        <h1 className="text-3xl font-bold text-orange-500 text-center mb-6">User Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Label htmlFor="userName">Username</Label>
              <Input
                id="userName"
                name="userName"
                value={profile.userName}
                onChange={handleChange}
                required
                className="bg-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={profile.email}
                onChange={handleChange}
                required
                className="bg-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="mobileNumber">Mobile Number</Label>
              <Input
                id="mobileNumber"
                name="mobileNumber"
                type="tel"
                value={profile.mobileNumber}
                onChange={handleChange}
                required
                className="bg-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="bgmiId">BGMI ID</Label>
              <Input
                id="bgmiId"
                name="bgmiId"
                value={profile.bgmiId}
                onChange={handleChange}
                required
                className="bg-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="walletBalance">Wallet Balance</Label>
              <Input
                id="walletBalance"
                name="walletBalance"
                type="number"
                value={profile.walletBalance}
                onChange={handleChange}
                required
                className="bg-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="UPI">UPI ID</Label>
              <Input
                id="UPI"
                name="UPI"
                value={profile.UPI}
                onChange={handleChange}
                className="bg-gray-700 text-white"
              />
            </div>
          </div>
          <div className="text-center">
            <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
              Update Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
