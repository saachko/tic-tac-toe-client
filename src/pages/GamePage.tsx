import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import UserData from '../utils/interfaces';

interface GamePageProps {
  currentUser: UserData | null;
  users: UserData[];
}

function GamePage({ currentUser, users }: GamePageProps) {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');

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
        setPlayer1(secondPlayer.username);
        setPlayer2(currentUser.username);
      } else {
        setPlayer1(currentUser.username);
        setPlayer2('...');
      }
    }
  }, []);

  useEffect(() => {
    if (currentUser && player2 === '...') {
      const secondPlayer = findOpponent(currentUser);
      if (secondPlayer) setPlayer2(secondPlayer.username);
    }
  }, [users]);

  if (!users.length) {
    return <Navigate to="/" />;
  }
  return (
    <div className="text-center">
      <h1 className="mb--1 text-primary">Room {currentUser?.room}</h1>
      <p>
        {player1} vs {player2}
      </p>
    </div>
  );
}

export default GamePage;
