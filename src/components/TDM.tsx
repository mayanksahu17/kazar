import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from './ui/button';
import axios from 'axios';
import Image from 'next/image';
import { toast } from 'react-toastify';
import Modal from "@/components/ui/Model"; // Import the Modal component
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge'; // Import the Badge component

interface TDM {
  _id: string;
  name: string;
  thumbnail: string;
  winningPrice: number;
  entryPrice: number;
  launchDate: string;
  Weapon: string;
  registeredTeam1?: string;
  registeredTeam2?: string;
  time: string;
}

export default function TdmPage() {
  const [tdms, setTdms] = useState<TDM[]>([]);
  const [teams, setTeams] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [selectedTdmId, setSelectedTdmId] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    async function fetchTdms() {
      try {
        const response = await axios.get('/api/tdm/get-all');
        setTdms(response.data.data);
      } catch (error) {
        console.error('Error fetching TDMs:', error);
      }
    }
    fetchTdms();
  }, []);

  // Function to fetch team names
  const fetchTeams = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to register");
        router.push("/sign-in");
        return;
      }

      const response = await axios.post("/api/teams/get-all-teams", { token });
      setTeams(response.data.teamNames || []);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching teams:", error);
      toast.error("Failed to load teams");
    }
  };

  const handleJoinClick = (tdmId: string) => {
    setSelectedTdmId(tdmId);
    fetchTeams();
  };

  const handleTeamSelect = async () => {
    try {
      if (!selectedTeam) {
        toast.error("Please select a team");
        return;
      }
      
      const response = await axios.put('/api/tdm/join', { tdmId: selectedTdmId, teamname: selectedTeam });
      toast.success("Successfully joined the TDM!");
      setShowModal(false);
      setSelectedTeam("");
      setSelectedTdmId("");

      // Refresh the TDM list after successful join
      const updatedTdms = await axios.get('/api/tdm/get-all');
      setTdms(updatedTdms.data.data);
    } catch (error) {
      console.error('Error joining TDM:', error);
      toast.error("Failed to join TDM");
    }
  };

  const getTimeRemaining = (launchDate: string) => {
    const now = new Date();
    const launch = new Date(launchDate);
    const timeDiff = launch.getTime() - now.getTime();
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${days}d ${hours}h`;
  };

  const isRegistrationOpen = (launchDate: string) => {
    const now = new Date();
    const launch = new Date(launchDate);
    return launch >= now;
  };

  return (
    <>
      <div className="bg-gray-900 min-h-screen p-8">
        <h1 className="text-orange-600 text-3xl mb-8">Available TDMs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tdms?.map(tdm => (
            <Card key={tdm._id} className="bg-gray-800 text-white">
              <CardHeader>
                <CardTitle className="text-orange-600">{tdm.name}</CardTitle>
                <CardDescription>
                  <Badge>
                    {isRegistrationOpen(tdm.launchDate) 
                      ? `Starts in ${getTimeRemaining(tdm.launchDate)}`
                      : "Ended"}
                  </Badge>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <img src={tdm.thumbnail} alt={tdm.name} className="w-full h-40 object-cover mb-4" />
                <p><span className="text-orange-600">Entry Price:</span> {tdm.entryPrice}</p>
                <p><span className="text-orange-600">Winning Price:</span> {tdm.winningPrice}</p>
                <p><span className="text-orange-600">Weapon:</span> {tdm.Weapon}</p>
              </CardContent>
              <CardFooter>
                {isRegistrationOpen(tdm.launchDate) && (!tdm.registeredTeam1 || !tdm.registeredTeam2) ? (
                  <Button
                    className="text-white bg-orange-600 hover:bg-orange-700"
                    onClick={() => handleJoinClick(tdm._id)}
                  >
                    Join TDM
                  </Button>
                ) : (
                  <p className="text-orange-600">TDM is full or registration ended</p>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {showModal && (
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <h2 className="text-xl font-bold mb-4">Register for TDM</h2>
          <h3 className="text-lg font-semibold text-red-600">Eligibility and Rules*</h3>
          <div className="mb-4 px-20">
            Mobile Players only!
          </div>
          {selectedTdmId && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Select Your Team</h3>
              <select
                className="w-full p-2 bg-gray-700 text-white rounded-lg"
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
              >
                <option value="" disabled>Select your team</option>
                {teams.map((team) => (
                  <option key={team} value={team}>
                    {team}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Entry Price</h3>
            <p>₹{tdms.find(tdm => tdm._id === selectedTdmId)?.entryPrice}</p>
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
