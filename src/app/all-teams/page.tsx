"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Card, CardFooter, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import axios from 'axios';

interface Team {
  _id: string;
  teamName: string;
  player1: string;
  player2: string;
  player3: string;
  player4: string;
  leader: string;
  registeredTournament: string[];
}

const Page: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const userId = 'shivi';

  useEffect(() => {
    async function getTeams() {
      try {
        const response = await axios.post("/api/teams/get-all-teams" , {token : localStorage.getItem("token")});
        if (response.data.success) {
          setTeams(response.data.teams);
        }
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    }

    getTeams();
  }, []);

  const handleRemoveMember = (teamId: string, memberId: string) => {
    console.log(`Removing member: ${memberId} from team: ${teamId}`);
    // Add logic to remove member from team
  };

  const handleLeaveTeam = (teamId: string) => {
    console.log(`Leaving team: ${teamId}`);
    // Add logic to leave team
  };

  const handleDeleteTeam = (teamId: string) => {
    console.log(`Deleting team: ${teamId}`);
    // Add logic to delete team
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-md w-full min-h-screen">
      <h1 className="text-orange-600 font-bold text-3xl mb-8">Your Teams</h1>
      {teams.length === 0 ? (
        <div className="text-white text-center mt-20">
          <p className="text-xl">You are not part of any team yet.</p>
          <p className="text-lg">Create or join a team to get started!</p>
          <Button className='bg-green-500 p-4 mt-10' >Create Team</Button>
        </div>
      ) : (
        teams.map((team) => {
          const isLeader = userId === team.leader;
          const players = [
            { id: team.player1, name: "Player 1" },
            { id: team.player2, name: "Player 2" },
            { id: team.player3, name: "Player 3" },
            { id: team.player4, name: "Player 4" },
          ];

          return (
            <Card key={team._id} className="mb-4">
              <CardHeader className="bg-gray-900 text-orange-500 font-bold text-2xl">
                {team.teamName}
                {isLeader && <span className="ml-2 text-green-500 text-xl">(You are the leader)</span>}
              </CardHeader>
              {players.map((player, index) => (
                <CardContent key={index} className="bg-gray-800 text-white p-4 flex justify-between items-center">
                  <span>{player.name}: {player.id === userId ? 'You' : player.id}</span>
                  {isLeader && player.id !== userId ? (
                    <Button className="p-4 ml-10" onClick={() => handleRemoveMember(team._id, player.id)}>Remove</Button>
                  ) : (
                    !isLeader && player.id === userId && <Button className="p-4 ml-10" onClick={() => handleLeaveTeam(team._id)}>Leave</Button>
                  )}
                </CardContent>
              ))}
              <CardFooter className="bg-gray-900 text-white p-4 flex justify-between items-center">
                {isLeader ? (
                  <>
                    <span>You are the leader</span>
                    <Button className="p-4 ml-10" onClick={() => handleDeleteTeam(team._id)}>Delete Team</Button>
                  </>
                ) : (
                  <span>Leader: {team.leader}</span>
                )}
              </CardFooter>
            </Card>
          );
        })
      )}
    </div>
  );
};

export default Page;
