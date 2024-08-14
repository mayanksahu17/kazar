"use client"
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import debounce from 'lodash.debounce';

const CreateTeam = () => {
    const [teamName, setTeamName] = useState('');
    const [loading,setLoading] = useState(false)
    const [players, setPlayers] = useState([{ id: 1, name: '', suggestions: [] }]);
    const [leader, setLeader] = useState('');
    const router = useRouter();

    useEffect(()=>{
        const token = localStorage.getItem("token")
        if (!token) {
            router.push("/sign-in")
        }
    })

    const fetchUsernames = async (query: string) => {
        try {
            const response = await axios.get(`/api/suggest-username/get-all-username?query=${query}`);
            return response.data.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    const debouncedFetchUsernames = debounce(async (id: number, query: string) => {
        const suggestions = await fetchUsernames(query);
        setPlayers((prevPlayers) => 
            prevPlayers.map((player) => 
                player.id === id ? { ...player, suggestions } : player
            )
        );
    }, 300);

    const handleInputChange = (id: number, value: string) => {
        setPlayers((prevPlayers) =>
            prevPlayers.map((player) =>
                player.id === id ? { ...player, name: value } : player
            )
        );
        debouncedFetchUsernames(id, value);
    };

    const handleAddPlayer = () => {
        if (players.length < 4) {
            setPlayers([...players, { id: players.length + 1, name: '', suggestions: [] }]);
        }
    };

    const handleRemovePlayer = (id: number) => {
        setPlayers(players.filter(player => player.id !== id));
    };

    const handleSuggestionClick = (id: number, suggestion: string) => {
        setPlayers((prevPlayers) =>
            prevPlayers.map((player) =>
                player.id === id ? { ...player, name: suggestion, suggestions: [] } : player
            )
        );
    };

    const handleCancel = () => {
        router.push('/');
      };
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
        const teamData = {
            token,
            teamName,
            members: {
                player1: players[0]?.name || '',
                player2: players[1]?.name || '',
                player3: players[2]?.name || '',
                player4: players[3]?.name || '',
            },
            leader,
        };

        try {
            setLoading(true)
            const response = await axios.post('/api/teams/create-team', teamData);
            if (response.data.message === "One or more members do not exist") {
                setLoading(false)
                toast.error(response.data.message);
            } else if (response.data.message === "Team created successfully") {
                setLoading(false)
                toast.success(response.data.message);
                router.push("/all-teams");
            }
        } catch (error: any) {
            setLoading(false)
            console.error(error);
            toast.error(error.message);
        }
    };

    return (
        <div className="mx-auto p-4 bg-gray-900 min-h-screen">
            <ToastContainer />
            <h1 className="text-3xl font-bold mb-4 text-orange-600">Create new Team</h1>
            <Card className="bg-gray-800 text-white">
                <CardHeader>
                    <h2 className="text-xl font-semibold">Team Details</h2>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <Label htmlFor="teamName">Team Name</Label>
                            <Input
                                type="text"
                                id="teamName"
                                value={teamName}
                                onChange={(e) => setTeamName(e.target.value)}
                                className="w-full px-3 py-2 border rounded"
                                required
                            />
                        </div>
                        {players.map((player) => (
                            <div className="mb-4 flex items-center relative" key={player.id}>
                                <div className="flex-1">
                                    <Label htmlFor={`player${player.id}`}>{`Player ${player.id}`}</Label>
                                    <Input
                                        type="text"
                                        id={`player${player.id}`}
                                        value={player.name}
                                        onChange={(e) => handleInputChange(player.id, e.target.value)}
                                        className="w-full px-3 py-2 border rounded"
                                        required
                                    />
                                    {player.suggestions.length > 0 && (
                                        <ul className="absolute z-10 bg-gray-700 w-full mt-1 rounded shadow-lg">
                                            {player.suggestions.map((suggestion, index) => (
                                                <li
                                                    key={index}
                                                    className="px-4 py-2 cursor-pointer hover:bg-gray-600"
                                                    onClick={() => handleSuggestionClick(player.id, suggestion)}
                                                >
                                                    {suggestion}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <Button type="button" onClick={() => handleRemovePlayer(player.id)} className="ml-2 mt-6 bg-red-500">
                                    Remove
                                </Button>
                            </div>
                        ))}
                        <Button type="button" onClick={handleAddPlayer} className="mb-4" disabled={players.length >= 4}>
                            Add Player
                        </Button>
                        <div className="mb-4">
                            <Label htmlFor="leader">Team Leader</Label>
                            <Input
                                type="text"
                                id="leader"
                                value={leader}
                                onChange={(e) => setLeader(e.target.value)}
                                className="w-full px-3 py-2 border rounded"
                                required
                            />
                        </div>
                        <div className="text-right">
                        
                            <Button type="submit" onClick={handleCancel} className="w-full bg-green-600 hover:bg-green-700"> {loading ? (
        <div className="flex justify-center items-center h-20">
          <div className="w-8 h-8 border-4 border-t-transparent border-orange-500 rounded-full animate-spin"></div>
        </div>
      ) : " Create Team"}    </Button>
                            <Button type="button" onClick={handleCancel} className=" mt-5 w-full bg-gray-600 hover:bg-gray-700">  Cancel   </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreateTeam;
