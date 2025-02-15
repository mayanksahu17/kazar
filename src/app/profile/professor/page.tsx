"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define Zod schema for validation
const professorSchema = z.object({
  department: z.string().min(2, "Department name is required"),
  subjects: z.string().min(2, "At least one subject is required"),
  assignedClasses: z.string().optional(),
});

type ProfessorForm = z.infer<typeof professorSchema>;

export default function ProfessorProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfessorForm>({ resolver: zodResolver(professorSchema) });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/signin");
          return;
        }

        const res = await fetch("/api/profile/professor", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch profile data");

        const { professor } = await res.json();
        if (professor) {
          setValue("department", professor.department);
          setValue("subjects", professor.subjects.join(", "));
          setValue("assignedClasses", professor.assignedClasses?.join(", ") || "");
        }
      } catch (err) {
        setError("Error fetching profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router, setValue]);

  const onSubmit = async (data: ProfessorForm) => {
    try {
      setError(null);
      setSuccess(null);
      const token = localStorage.getItem("token");

      const res = await fetch("/api/profile/professor", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          department: data.department,
          subjects: data.subjects.split(",").map((s) => s.trim()),
          assignedClasses: data.assignedClasses ? data.assignedClasses.split(",").map((c) => c.trim()) : [],
        }),
      });

      const result = await res.json();

      if (!result.success) throw new Error(result.error || "Failed to update profile");

      setSuccess("Profile updated successfully!");
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Professor Profile</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-500 mb-2">{success}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <input
              type="text"
              {...register("department")}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {errors.department && <p className="text-red-500 text-sm">{errors.department.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Subjects (comma-separated)</label>
            <input
              type="text"
              {...register("subjects")}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {errors.subjects && <p className="text-red-500 text-sm">{errors.subjects.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Assigned Classes (comma-separated)</label>
            <input
              type="text"
              {...register("assignedClasses")}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md w-full hover:bg-blue-700 transition"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}
