"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";

// Define the shape of the tournament data
interface Tournament {
  _id: string;
  token: string;
  title: string;
  mode: string; 
  map: string;
  winningPrice: number;
  rank1Price: number;
  rank2Price: number;
  rank3Price: number;
  eligibility: string;
  launchDate: string; // Assuming ISO date string
  time: string;
  requiredTeamSize: number;
  entryPrice: number;
  thumbnail: string;
  owner: string;
}

export default function Tournaments() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Function to fetch tournament data
  const fetchTournaments = async () => {
    try {
      const response = await axios.get("/api/tournament/getAlltournaments");
      setTournaments(response.data.data);
    } catch (error) {
      console.error("Error fetching tournaments:", error);
      toast.error("Failed to load tournaments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  // Function to handle user registration
  const register = () => {
    if (!localStorage.getItem("token")) {
      toast.error("Please login to register");
      router.push("/sign-in");
    }
  };

  // Function to get the time remaining until the tournament starts
  const getTimeRemaining = (launchDate: string) => {
    const now = new Date();
    const launch = new Date(launchDate);
    const timeDiff = launch.getTime() - now.getTime();
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${days}d ${hours}h`;
  };

  // Function to check if registration is open
  const isRegistrationOpen = (launchDate: string) => {
    const now = new Date();
    const launch = new Date(launchDate);
    return launch >= now;
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-muted/40 bg-gray-900">
        <main className="flex-1 p-4 sm:p-6 bg-gray-900">
          <h2 className="text-2xl font-bold mb-4">All Tournaments</h2>
          {loading ? (
            <div className="text-center text-gray-200">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {tournaments.map((tournament) => (
                <Card key={tournament._id} className="bg-gray-900 text-orange-600">
                  <CardHeader>
                    <img
                      src={tournament.thumbnail}
                      alt={`${tournament.title} Thumbnail`}
                      className="rounded-t-lg w-full h-[200px] object-cover"
                    />
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-lg">{tournament.title}</div>
                        <Badge>
                          {isRegistrationOpen(tournament.launchDate)
                            ? `Starts in ${getTimeRemaining(tournament.launchDate)}`
                            : "Ended"}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <div className="text-sm text-gray-200">Entry Price</div>
                          <div>{tournament.entryPrice}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-200">Mode</div>
                          <div>{tournament.mode}</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <div className="text-sm text-gray-200">Map</div>
                          <div>{tournament.map}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-200">Winning Price</div>
                          <div>{tournament.winningPrice}</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        
                        <div>
                          <div className="text-sm text-gray-200">Owner</div>
                          <div>{tournament.owner}</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <div className="text-sm text-gray-200">Launch Date</div>
                          <div>{new Date(tournament.launchDate).toLocaleDateString()}</div>
                        </div>
                      </div>
                      <div>
                          <div className="text-sm text-gray-200">Eligibility/Rules*</div>
                          <div>{tournament.eligibility}</div>
                        </div>
                      {isRegistrationOpen(tournament.launchDate) ? (
                        <button
                          onClick={register}
                          className="mt-4 w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-700 transition-colors"
                        >
                          Register
                        </button>
                      ) : (
                        <button
                          className="mt-4 w-full py-2 bg-gray-400 text-white rounded-lg"
                        >
                          Ended
                        </button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
