"use client";
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from 'react-toastify';

export default function SignInComponent() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/sign-in", {
        userName : username,
        password,
      });
      console.log(response);
      localStorage.setItem("token",response?.data.token)

      if (response.status === 200) {
        toast.success(response?.data.message);
        router.push("/")
      }else if (response.status === 404){
        toast.error(response.data.message)
      }
      toast.error(response.data.message)
    } catch (error : any) {
      console.log(error);
      
      toast.error("Failed to sign in. Please check your credentials.");
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 bg-black text-orange-500">
            <ToastContainer />
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground text-orange-500">Sign in to your account</h1>
          <p className="mt-2 text-muted-foreground">Enter your username and password below</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="/forgot-password" className="text-sm font-medium  text-muted-foreground hover:underline " prefetch={false}>
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Link href="/sign-up" className="text-sm font-medium  hover:underline  text-muted-foreground" prefetch={false}>
            Don not have an account? Create one.
          </Link>
          <Button type="submit" className="w-full text-orange-600" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}
