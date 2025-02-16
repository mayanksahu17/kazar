"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const companySchema = z.object({
  name: z.string().min(1, "Company name is required"),
  industry: z.string().min(1, "Industry is required"),
})

type CompanyProfileForm = z.infer<typeof companySchema>

export default function CompanyProfile() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyProfileForm>({
    resolver: zodResolver(companySchema),
  })

  const onSubmit = async (data: CompanyProfileForm) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("/api/profile/company", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        router.push("/pricing")
      } else {
        setError(result.message || "An error occurred while saving profile")
      }
    } catch (err) {
      setError("An error occurred while saving profile")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Complete Your Company Profile</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Company Name
              </label>
              <input
                id="name"
                type="text"
                {...register("name")}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Company Name"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="industry" className="sr-only">
                Industry
              </label>
              <input
                id="industry"
                type="text"
                {...register("industry")}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Industry"
              />
              {errors.industry && <p className="text-red-500 text-xs mt-1">{errors.industry.message}</p>}
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

