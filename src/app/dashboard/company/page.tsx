"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type CompanyDashboardData = {
  postedInternships: string[];
  jobListings: string[];
};

export default function CompanyDashboard() {
  const router = useRouter();
  const [data, setData] = useState<CompanyDashboardData | null>(null);
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

        const response = await fetch("/api/dashboard/company", {
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
          <h1 className="text-3xl font-bold text-gray-900">Company Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {data && (
            <div className="p-6 bg-white shadow rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Posted Internships</h2>
              <ul className="list-disc pl-5 space-y-1">
                {data.postedInternships.length > 0 ? (
                  data.postedInternships.map((internship, index) => <li key={index}>{internship}</li>)
                ) : (
                  <p>No posted internships.</p>
                )}
              </ul>
              <h2 className="text-xl font-semibold mt-6 mb-4">Job Listings</h2>
              <ul className="list-disc pl-5 space-y-1">
                {data.jobListings.length > 0 ? (
                  data.jobListings.map((job, index) => <li key={index}>{job}</li>)
                ) : (
                  <p>No job listings.</p>
                )}
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
