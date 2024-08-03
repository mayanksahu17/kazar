"use client"
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastContainer , toast } from 'react-toastify';
import { useRouter } from "next/navigation";

const CreateTeam = () => {
    const [teamName, setTeamName] = useState('');
    const [players, setPlayers] = useState([{ id: 1, name: '' }]);
    const [leader, setLeader] = useState('');
    const router = useRouter();

    const handleAddPlayer = () => {
        if (players.length < 4) {
            setPlayers([...players, { id: players.length + 1, name: '' }]);
        }
    };

    const handleRemovePlayer = (id: number) => {
        setPlayers(players.filter(player => player.id !== id));
    };

    const handleInputChange = (id: number, value: string) => {
        const updatedPlayers = players.map((player) =>
            player.id === id ? { ...player, name: value } : player
        );
        setPlayers(updatedPlayers);
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
            console.log(teamData);
            
            const response = await axios.post('/api/teams/create-team', teamData);
            console.log(response.data);
            if (response.data.message === "One or more members do not exist") {
                toast.error(response.data.message);
            }else if(response.data.message ==="Team created successfully"){
                toast.success(response.data.message);
                router.push("/all-teams");
            }
        } catch (error : any) {

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
                            <div className="mb-4 flex items-center" key={player.id}>
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
                            <Button type="submit" className="bg-green-500">
                                Create Team
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreateTeam;
