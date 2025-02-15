"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const studentSchema = z.object({
  enrollmentNumber: z.string().min(1, "Enrollment number is required"),
  year: z.string().min(1, "Year is required"),
  section: z.string().min(1, "Section is required"),
})

type StudentProfileForm = z.infer<typeof studentSchema>

export default function StudentProfile() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentProfileForm>({
    resolver: zodResolver(studentSchema),
  })

  const onSubmit = async (data: StudentProfileForm) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("/api/profile/student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        router.push("/dashboard/student")
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
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Complete Your Student Profile</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="enrollmentNumber" className="sr-only">
                Enrollment Number
              </label>
              <input
                id="enrollmentNumber"
                type="text"
                {...register("enrollmentNumber")}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enrollment Number"
              />
              {errors.enrollmentNumber && (
                <p className="text-red-500 text-xs mt-1">{errors.enrollmentNumber.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="year" className="sr-only">
                Year
              </label>
              <input
                id="year"
                type="text"
                {...register("year")}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Year"
              />
              {errors.year && <p className="text-red-500 text-xs mt-1">{errors.year.message}</p>}
            </div>
            <div>
              <label htmlFor="section" className="sr-only">
                Section
              </label>
              <input
                id="section"
                type="text"
                {...register("section")}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Section"
              />
              {errors.section && <p className="text-red-500 text-xs mt-1">{errors.section.message}</p>}
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

