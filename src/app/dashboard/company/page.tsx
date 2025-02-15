"use client";
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

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
          <h1 className="text-3xl font-bold text-blue-600">Company Dashboard</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="bg-blue-600 text-white">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:text-blue-600">
              Overview
            </TabsTrigger>
            <TabsTrigger value="internships" className="data-[state=active]:bg-white data-[state=active]:text-blue-600">
              Internships
            </TabsTrigger>

          </TabsList>
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-2 gap-6">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle className="text-blue-600">Leaderboard</CardTitle>
                  <CardDescription>Top performing interns and employees</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Placeholder for leaderboard */}
                  <p>Leaderboard content goes here</p>
                </CardContent>
              </Card>
              <div className="col-span-1 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-600">Post Opportunity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <Input placeholder="Opportunity Title" />
                      <Textarea placeholder="Opportunity Description" />
                      <Button className="w-full bg-green-500 hover:bg-green-600">Post Opportunity</Button>
                    </form>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-600">Current Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">No current projects</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="internships">
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600">Posted Internships</CardTitle>
              </CardHeader>
              <CardContent>
                {data?.postedInternships?.length ? (
                  <ul>
                    {data.postedInternships.map((internship, index) => (
                      <li key={index}>{internship}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No internships posted yet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="jobs">
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600">Job Listings</CardTitle>
              </CardHeader>

            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
