"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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
  launchDate: string;
  time: string;
  requiredTeamSize: number;
  entryPrice: number;
  thumbnail: string;
  owner: string;
}

export default function Tournaments() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const [roomData, setRoomData] = useState<Record<string, { Roomid: string; Roompass: string }>>({});
  const [userRegisteredTournaments, setUserRegisteredTournaments] = useState<Set<string>>(new Set());
  const router = useRouter();

  useEffect(() => {
    const fetchTournaments = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("You must be logged in to view tournaments");
        router.push("/sign-in");
        return;
      }

      try {
        const response = await axios.post("/api/tournament/launched-tournament", { token });
        if (response.data && response.data.data) {
          setTournaments(response.data.data);
          setUserRegisteredTournaments(new Set(response.data.userRegisteredTournamentIds || []));
        } else {
          toast.warning("No tournaments found or data is malformed");
        }
      } catch (error) {
        console.error("Error fetching tournaments:", error);
        toast.error("Failed to load tournaments");
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, [router]);

  const handleUpload = async (RoomId: string, Password: string, tournamentId: string, tournamentName: string) => {
    if (!RoomId || !Password) {
      toast.warning("Room ID and Password cannot be empty");
      return;
    }

    setUploading((prev) => ({ ...prev, [tournamentId]: true }));

    try {
      const response = await axios.put("/api/tournament/launched-tournament", { RoomId, Password, tournamentName });
      if (response.data) {
        toast.success(`Tournament ${tournamentName} Launched successfully`);
        setRoomData((prevData) => ({
          ...prevData,
          [tournamentId]: { Roomid: "", Roompass: "" },
        }));
      }
    } catch (error) {
      console.error("Error uploading tournament details:", error);
      toast.error("Failed to upload tournament details");
    } finally {
      setUploading((prev) => ({ ...prev, [tournamentId]: false }));
    }
  };

  const getTimeRemaining = (launchDate: string) => {
    const now = new Date();
    const launch = new Date(launchDate);
    const timeDiff = launch.getTime() - now.getTime();
    if (timeDiff <= 0) return "Starts now";
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${days}d ${hours}h`;
  };

  const isRegistrationOpen = (launchDate: string) => {
    const now = new Date();
    const launch = new Date(launchDate);
    return launch >= now;
  };

  const handleInputChange = (tournamentId: string, field: "Roomid" | "Roompass", value: string) => {
    setRoomData((prevData) => ({
      ...prevData,
      [tournamentId]: {
        ...prevData[tournamentId],
        [field]: value,
      },
    }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/40 bg-gray-900">
      <ToastContainer />
      <main className="flex-1 p-4 sm:p-6 bg-gray-900">
        {loading ? (
          <div className="flex justify-center items-center h-20">
            <div className="w-8 h-8 border-4 border-t-transparent border-orange-500 rounded-full animate-spin"></div>
          </div>
        ) : tournaments.length === 0 ? (
          <div className="ml-10 font-bold p-10">No tournaments Registered YET!</div>
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
                        <div>₹{tournament.entryPrice}</div>
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
                        <div className="text-sm text-gray-200">Price Pool</div>
                        <div>₹{tournament.winningPrice}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="text-sm text-gray-200">Organiser</div>
                        <div>{tournament.owner}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-200">#1 Winning Price</div>
                        <div>₹{tournament.rank1Price}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="text-sm text-gray-200">Launch Date</div>
                        <div>{new Date(tournament.launchDate).toLocaleDateString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-200">#2 Winning Price</div>
                        <div>₹{tournament.rank2Price}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="text-sm text-gray-200">Eligibility/Rules*</div>
                        <div>{tournament.eligibility}</div>
                      </div>
                    </div>

                    {isRegistrationOpen(tournament.launchDate) ? (
                      <>
                        <div>
                          <Label>Enter Room Id</Label>
                          <Input
                            value={roomData[tournament._id]?.Roomid || ""}
                            onChange={(e) => handleInputChange(tournament._id, "Roomid", e.target.value)}
                            placeholder="Room Id"
                            disabled={uploading[tournament._id]}
                          />
                        </div>
                        <div>
                          <Label>Enter Room Password</Label>
                          <Input
                            value={roomData[tournament._id]?.Roompass || ""}
                            onChange={(e) => handleInputChange(tournament._id, "Roompass", e.target.value)}
                            placeholder="Room Password"
                            disabled={uploading[tournament._id]}
                          />
                        </div>
                        <Button
                          onClick={() =>
                            handleUpload(roomData[tournament._id]?.Roomid, roomData[tournament._id]?.Roompass, tournament._id, tournament.title)
                          }
                          className="mt-4 w-full py-2 bg-yellow-600 text-white rounded-lg"
                          disabled={uploading[tournament._id]}
                        >
                          {uploading[tournament._id] ? (
                            <div className="flex justify-center items-center">
                              <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                              Uploading...
                            </div>
                          ) : (
                            "Launch Winning Team"
                          )}
                        </Button>
                        <Button
                          onClick={() =>
                            handleUpload(roomData[tournament._id]?.Roomid, roomData[tournament._id]?.Roompass, tournament._id, tournament.title)
                          }
                          className="mt-4 w-full py-2 bg-yellow-600 text-white rounded-lg"
                          disabled={uploading[tournament._id]}
                        >
                          {uploading[tournament._id] ? (
                            <div className="flex justify-center items-center">
                              <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                              Uploading...
                            </div>
                          ) : (
                            "Upload"
                          )}
                        </Button>
                      </>
                    ) : (
                      <button
                        className="mt-4 w-full py-2 bg-gray-400 text-white rounded-lg"
                        disabled
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
  );
}
