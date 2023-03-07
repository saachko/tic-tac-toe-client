import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import GameTable from '../components/GameTable';
import { UserData } from '../utils/interfaces';

interface GamePageProps {
  currentUser: UserData | null;
  users: UserData[];
}

function GamePage({ currentUser, users }: GamePageProps) {
  const [player1, setPlayer1] = useState<UserData | null>(null);
  const [player2, setPlayer2] = useState<UserData | null>(null);

  const findOpponent = (currentPlayer: UserData) => {
    const secondUser = users.find(
      (user) => user.room === currentPlayer.room && user.id !== currentPlayer.id
    );
    return secondUser;
  };

  useEffect(() => {
    if (currentUser) {
      const secondPlayer = findOpponent(currentUser);
      if (secondPlayer) {
        setPlayer1(secondPlayer);
        setPlayer2(currentUser);
      } else {
        setPlayer1(currentUser);
        setPlayer2({
          id: '0',
          username: '...',
          room: currentUser.room,
        });
      }
    }
  }, []);

  useEffect(() => {
    if (currentUser && player2?.username === '...') {
      const secondPlayer = findOpponent(currentUser);
      if (secondPlayer) setPlayer2(secondPlayer);
    }
  }, [users]);

  if (!users.length) {
    return <Navigate to="/" />;
  }
  return (
    <div className="text-center">
      <h1 className="mb--1 text-primary">Room {currentUser?.room}</h1>
      <p>
        {player1?.username} vs {player2?.username}
      </p>
      <GameTable
        currentUser={currentUser}
        player1={player1}
        player2={player2}
      />
    </div>
  );
}

export default GamePage;
