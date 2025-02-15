"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type StudentDashboardData = {
  enrolledCourses: string[];
  events: string[];
};

export default function StudentDashboard() {
  const router = useRouter();
  const [data, setData] = useState<StudentDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/signin");
          return;
        }

        const response = await fetch("/api/dashboard/student", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Failed to fetch data");

        setData(result.data);
      } catch (err) {
        setError("Error loading dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {data && (
            <div className="p-6 bg-white shadow rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Enrolled Courses</h2>
              <ul className="list-disc pl-5 space-y-1">
                {data.enrolledCourses.length > 0 ? (
                  data.enrolledCourses.map((course, index) => <li key={index}>{course}</li>)
                ) : (
                  <p>No courses enrolled.</p>
                )}
              </ul>
              <h2 className="text-xl font-semibold mt-6 mb-4">Upcoming Events</h2>
              <ul className="list-disc pl-5 space-y-1">
                {data.events.length > 0 ? (
                  data.events.map((event, index) => <li key={index}>{event}</li>)
                ) : (
                  <p>No upcoming events.</p>
                )}
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
