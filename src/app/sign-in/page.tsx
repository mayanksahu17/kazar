"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const signInSchema = z.object({
  userNameOrEmail: z.string().min(1, "Username or email is required"),
  password: z.string().min(1, "Password is required"),
})

type SignInForm = z.infer<typeof signInSchema>

export default function SignIn() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
  })
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (data: SignInForm) => {
    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

<<<<<<< HEAD
      if (result.success) {
        localStorage.setItem("token", result.token)
        router.push(`/dashboard/${result.data.role.toLowerCase()}`)
=======
      if (response.status === 200) {
        // todo 
        
        router.push("/");
        toast.success(response?.data.message);
      } else if (response.status === 404) {
        toast.error(response.data.message);
>>>>>>> d825a258ff4638a067822054f234d822e13aed6e
      } else {
        setError(result.message || "Invalid username/email or password")
      }
    } catch (err) {
      setError("An error occurred during sign in")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="userNameOrEmail" className="sr-only">
                Username or Email
              </label>
              <input
                id="userNameOrEmail"
                type="text"
                {...register("userNameOrEmail")}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username or Email"
              />
              {errors.userNameOrEmail && <p className="text-red-500 text-xs mt-1">{errors.userNameOrEmail.message}</p>}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register("password")}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

