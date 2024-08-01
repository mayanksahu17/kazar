"use client";

import React from 'react';
import { Card, CardFooter, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Page = () => {
  const userId = 'vrtgh';

  const data = {
    teamName: "verdvb",
    player1: "ijhsi",
    player2: "csen",
    player3: "vrtgh",
    player4: "cewrf",
    registeredTournament: [],
    leader: "ijhsi"
  };

  const players = [
    { id: data.player1, name: "Player 1" },
    { id: data.player2, name: "Player 2" },
    { id: data.player3, name: "Player 3" },
    { id: data.player4, name: "Player 4" },
  ];

  const isLeader = userId === data.leader;

  const handleRemoveMember = (memberId : any) => {
    // Add logic to remove member
    console.log(`Removing member: ${memberId}`);
  };

  const handleLeaveTeam = () => {
    // Add logic to leave team
    console.log(`Leaving team`);
  };

  const handleDeleteTeam = () => {
    // Add logic to delete team
    console.log(`Deleting team`);
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-md w-full min-h-screen">
      <h1 className='text-orange-600 font-bold text-3xl mb-8'>Your Teams</h1>
      <Card>
        <CardHeader className="bg-gray-900 text-orange-500 font-bold">Team Name: {data.teamName}</CardHeader>
        {players.map((player, index) => (
          <CardContent key={index} className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <span>{player.name}: {player.id === userId ? 'You' : player.id}</span>
            {isLeader && player.id !== userId ? (
              <Button className='p-4 ml-10' onClick={() => handleRemoveMember(player.id)}>Remove</Button>
            ) : (
              !isLeader && player.id === userId && <Button className='p-4 ml-10' onClick={handleLeaveTeam}>Leave</Button>
            )}
          </CardContent>
        ))}
        <CardFooter className="bg-gray-900 text-white p-4 flex justify-between items-center">
          {isLeader ? (
            <>
              <span>You are the leader</span>
              <Button className='p-4 ml-10' onClick={handleDeleteTeam}>Delete Team</Button>
            </>
          ) : (
            <span>Leader: {data.leader}</span>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
