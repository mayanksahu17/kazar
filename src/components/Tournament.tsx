"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import Modal from "@/components/ui/Model"; // Import the Modal component
import Script from 'next/script';

declare global {
  interface Window {
    Razorpay : any
  }
}
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
  const [showModal, setShowModal] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  const [teams, setTeams] = useState<string[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [user , setUser] = useState({})
  const router = useRouter();

  // Function to fetch tournament data
  const fetchTournaments = async () => {
    try {
     
      
      const response = await axios.get("/api/tournament/getAlltournaments");
      const currentDate = new Date();
      const validTournaments = response.data.data.filter((tournament: Tournament) => {
        return new Date(tournament.launchDate) >= currentDate;
      });
      setTournaments(validTournaments);
    } catch (error) {
      console.error("Error fetching tournaments:", error);
      toast.error("Failed to load tournaments");
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch team names
  const fetchTeams = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/api/teams/get-all-teams", { token });
      setTeams(response.data.teamNames);
    } catch (error) {
      console.error("Error fetching teams:", error);
      toast.error("Failed to load teams");
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  // Function to handle user registration
  const register = (tournament: Tournament) => {
    if (!localStorage.getItem("token")) {
      toast.error("Please login to register");
      router.push("/sign-in");
      return;
    }
    setSelectedTournament(tournament);
    fetchTeams();
    setShowModal(true);
  };

 useEffect(()=>{
  localStorage.setItem("team",selectedTeam)
  const title = selectedTournament?.title || ""
  localStorage.setItem("tName",title)
 },[selectedTeam,selectedTournament])


  const handleTeamSelect = async() => {
    if (selectedTournament) {
      if (selectedTournament.mode === "duo") {
        if (teams.length === 0) {
          // If squad mode and user has no teams, show a message and redirect
          toast.error("You don't have any team. Please create one.");
          router.push("/create-team");
        } else if (selectedTeam) {
          // If squad mode and user has teams, proceed with the selected team
           router.push(`/payment/${selectedTournament.entryPrice}`);
        } else {
          toast.error("Please select a team");
        }

      } else if (selectedTournament.mode === "solo") {
        // If solo mode, proceed directly to payment without selecting a team
        router.push(`/payment/${selectedTournament.entryPrice}`);

      } else if (selectedTournament.mode === "squad") {
        if (teams.length === 0) {
          // If squad mode and user has no teams, show a message and redirect
          toast.error("You don't have any team. Please create one.");
          router.push("/create-team");
        } else if (selectedTeam) {
          // If squad mode and user has teams, proceed with the selected team
           router.push(`/payment/${selectedTournament.entryPrice}`);
        } else {
          toast.error("Please select a team");
        }
      }
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
          <Script src="https://checkout.razorpay.com/v1/checkout.js"/>
          <main className="flex-1 p-4 sm:p-6 bg-gray-900">
            {loading ? (
        <div className="flex justify-center items-center h-20">
          <div className="w-8 h-8 border-4 border-t-transparent border-orange-500 rounded-full animate-spin"></div>
        </div>
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
                                <div className="text-sm text-gray-200"> Price Pool</div>
                                <div>₹{tournament.winningPrice}</div>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <div className="text-sm text-gray-200">Organiser</div>
                                <div>{tournament.owner}</div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-200 ">#1 Rank : ₹{tournament.rank1Price}</div>
                                <div className="text-sm text-gray-200 ">#2 Rank : ₹{tournament.rank2Price}</div>
                                <div className="text-sm text-gray-200 ">#3 Rank : ₹{tournament.rank3Price}</div>

                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <div className="text-sm text-gray-200">Launch Date</div>
                                <div>{new Date(tournament.launchDate).toLocaleDateString()}</div>
                              </div>

                            </div>
                            {isRegistrationOpen(tournament.launchDate) ? (
                                <button
                                    onClick={() => register(tournament)}
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

        {showModal && selectedTournament && (
            <Modal show={showModal} onClose={() => setShowModal(false)}>
              <h2 className="text-xl font-bold mb-4">Register for {selectedTournament.title}</h2>
                <h3 className="text-lg font-semibold text-red-600">Eligibility and Rules*</h3>
              <div className="mb-4 px-20">
                <p>{selectedTournament.eligibility}</p>
              </div>
              {selectedTournament.mode !== "solo" && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold">Select Your Team</h3>
                    <select
                        className="w-full p-2 bg-gray-700 text-white rounded-lg"
                        value={selectedTeam}
                        onChange={(e) => setSelectedTeam(e.target.value)}
                    >
                      <option value="" disabled>Select your team</option>
                      {teams.map((team) =>{
                            if(team === null){
                              return;
                            }else{
                              return  (
                                  <option key={team} value={team}>
                                    {team}
                                  </option>
                              )
                            }
                          }
                      )}
                    </select>
                  </div>
              )}
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Entry Price</h3>
                <p>₹{selectedTournament.entryPrice}</p>
              </div>
              <button
                  onClick={handleTeamSelect}
                  className="mt-4 w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                Proceed to Payment
              </button>
            </Modal>
        )}
      </>
  );
}