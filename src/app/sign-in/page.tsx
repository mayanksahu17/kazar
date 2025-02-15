'use client'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { toast } from "sonner";

const signInSchema = z.object({
  userNameOrEmail: z.string().min(1, "Username or email is required"),
  password: z.string().min(1, "Password is required"),
});

type SignInForm = z.infer<typeof signInSchema>;

const Index = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
  });
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: SignInForm) => {
    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("userId", result.data?._id);
        window.location.href = `/dashboard/${result.data.role.toLowerCase()}`;
        toast.success("Successfully signed in!");
      } else {
        setError(result.message || "Invalid username/email or password");
        toast.error(result.message || "Invalid username/email or password");
      }
    } catch (err) {
      setError("An error occurred during sign in");
      toast.error("An error occurred during sign in");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-100 to-blue-100 antialiased">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md px-8 py-10 mx-4"
      >
        <div className="relative backdrop-blur-xl bg-white/80 rounded-2xl shadow-xl border border-green-100 p-8">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-transparent rounded-2xl" />
          
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center space-y-3 mb-8"
            >
              <h2 className="text-2xl font-medium text-gray-900">Welcome back</h2>
              <p className="text-sm text-gray-600">Sign in to your account</p>
            </motion.div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="userNameOrEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    Username or Email
                  </label>
                  <input
                    id="userNameOrEmail"
                    type="text"
                    {...register("userNameOrEmail")}
                    className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 text-gray-900 text-sm placeholder:text-gray-400"
                    placeholder="Enter your username or email"
                  />
                  {errors.userNameOrEmail && (
                    <p className="mt-1 text-sm text-red-500">{errors.userNameOrEmail.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    {...register("password")}
                    className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 text-gray-900 text-sm placeholder:text-gray-400"
                    placeholder="Enter your password"
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                  )}
                </div>
              </motion.div>

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-red-500 text-center"
                >
                  {error}
                </motion.p>
              )}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-sm"
                >
                  Sign in
                </button>
              </motion.div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;