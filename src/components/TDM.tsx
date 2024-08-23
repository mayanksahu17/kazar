import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from './ui/button';
import { Badge } from "@/components/ui/badge";
import axios from 'axios';
import { toast } from 'react-toastify';
import Modal from "@/components/ui/Model";
import { useRouter } from 'next/navigation';
import Script from 'next/script';

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

  
  const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_g1g3enpX7nMKYG";
  if (!key) throw new Error("Razorpay key is missing");

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
      
      const response = await axios.post('/api/tdm/joinTDM', { tdmId: selectedTdmId, teamname: selectedTeam ,token : localStorage.getItem("token") });
     
       
      if (response.status === 200) {
        const order = response.data.order;
        const userDetails = response.data.user
        const options = {
          key,
          name: "Scrims Crown",
          currency: order.currency,
          amount: order.amount,
          order_id: order.id,
          description: "Tournament Payment",
          image: "https://utfs.io/f/b20ac6fe-f3d3-4df6-998a-2084302d59e6-apa690.png",
          handler: async (response: any) => {  
            const res = await axios.put('/api/tdm/joinTDM', { tdmId: selectedTdmId, teamname: selectedTeam ,token : localStorage.getItem("token") });
            if(res.status !== 200){
              toast.success(res.data.message);
            }
          },
          prefill: {
            name: userDetails.userName,
            email: userDetails.email,
            contact: userDetails.mobileNumber,
          },
          theme: {
            color: "#3399cc",
          },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
  
        paymentObject.on("payment.failed", () => {
          toast.error("Payment failed. Please try again.");
        });
      } else {
        toast.error('Failed to join tdm.');
      }
      toast.success("Successfully joined the TDM!");
      setShowModal(false);
      setSelectedTeam("");
      setSelectedTdmId("");

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

  const getRegistrationStatus = (tdm: TDM) => {
    const registeredTeams = [tdm.registeredTeam1, tdm.registeredTeam2].filter(Boolean).length;
    return `Registered teams ${registeredTeams} of 2`;
  };

  return (
    <>
      <div className="bg-gray-900 min-h-screen p-8">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
        <h1 className="text-orange-600 text-3xl mb-8 font-bold"> </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tdms?.map(tdm => (
            <Card key={tdm._id} className="bg-gray-800 text-white">
              <CardHeader>
                <CardTitle className="text-orange-600">{tdm.name}</CardTitle>
                <CardDescription>{new Date(tdm.launchDate).toLocaleDateString()}</CardDescription>
                <Badge>{`Starts in ${getTimeRemaining(tdm.launchDate)}`}</Badge>
              </CardHeader>
              <CardContent>
                <img src={tdm.thumbnail} alt={tdm.name} className="w-full h-40 object-cover mb-4"  />
                <p><span className="text-orange-600">Entry Price:</span> {tdm.entryPrice}</p>
                <p><span className="text-orange-600">Winning Price:</span> {tdm.winningPrice}</p>
                <p><span className="text-orange-600">Weapon:</span> {tdm.Weapon}</p>
                <p>{getRegistrationStatus(tdm)}</p>
              </CardContent>
              <CardFooter>
                {!tdm.registeredTeam2 ? (
                  <Button
                    className="text-white bg-orange-600 hover:bg-orange-700"
                    onClick={() => handleJoinClick(tdm._id)}
                  >
                    Join TDM
                  </Button>
                ) : (
                  <p className="text-orange-600">TDM is full</p>
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
