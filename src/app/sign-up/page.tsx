'use client'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { toast } from "sonner";

const signUpSchema = z.object({
  userName: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  mobileNumber: z.string().regex(/^\d{10}$/, "Invalid mobile number"),
  role: z.enum(["student", "professor", "company"]),
});

type SignUpForm = z.infer<typeof signUpSchema>;

const Index = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
  });
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: SignUpForm) => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        localStorage.setItem("token", result.token);
        window.location.href = `/profile/${data.role}`;
        toast.success("Successfully signed up!");
      } else {
        setError(result.message || "An error occurred during sign up");
        toast.error(result.message || "An error occurred during sign up");
      }
    } catch (err) {
      setError("An error occurred during sign up");
      toast.error("An error occurred during sign up");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 antialiased">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md px-8 py-10 mx-4"
      >
        <div className="relative backdrop-blur-xl bg-white/80 rounded-2xl shadow-xl border border-green-100 p-8">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent rounded-2xl" />
          
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center space-y-3 mb-8"
            >
              <h2 className="text-2xl font-medium text-gray-900">Create an account</h2>
              <p className="text-sm text-gray-600">Join us today</p>
            </motion.div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <input
                    id="userName"
                    type="text"
                    {...register("userName")}
                    className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 text-gray-900 text-sm placeholder:text-gray-400"
                    placeholder="Enter your username"
                  />
                  {errors.userName && (
                    <p className="mt-1 text-sm text-red-500">{errors.userName.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 text-gray-900 text-sm placeholder:text-gray-400"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
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

                <div>
                  <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number
                  </label>
                  <input
                    id="mobileNumber"
                    type="tel"
                    {...register("mobileNumber")}
                    className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 text-gray-900 text-sm placeholder:text-gray-400"
                    placeholder="Enter your mobile number"
                  />
                  {errors.mobileNumber && (
                    <p className="mt-1 text-sm text-red-500">{errors.mobileNumber.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select
                    id="role"
                    {...register("role")}
                    className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 text-gray-900 text-sm"
                  >
                    <option value="">Select your role</option>
                    <option value="student">Student</option>
                    <option value="professor">Professor</option>
                    <option value="company">Company</option>
                  </select>
                  {errors.role && (
                    <p className="mt-1 text-sm text-red-500">{errors.role.message}</p>
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
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-lg font-medium hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-sm"
                >
                  Sign up
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