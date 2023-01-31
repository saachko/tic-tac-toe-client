import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import UserData from '../utils/interfaces';

interface GamePageProps {
  currentUser: UserData | null;
  users: UserData[];
}

function GamePage({ currentUser, users }: GamePageProps) {
  const [user1, setUser1] = useState('');
  const [user2, setUser2] = useState('');

  useEffect(() => {
    if (currentUser) {
      const secondUser = users.find(
        (user) => user.room === currentUser.room && user.id !== currentUser.id
      );
      if (secondUser) {
        setUser1(secondUser.username);
        setUser2(currentUser.username);
      } else {
        setUser1(currentUser.username);
        setUser2('...');
      }
    }
  }, [users]);

  if (!users.length) {
    return <Navigate to="/" />;
  }
  return (
    <div className="text-center">
      <h1 className="mb--1 text-primary">Room {currentUser?.room}</h1>
      <p>
        {user1} vs {user2}
      </p>
    </div>
  );
}

export default GamePage;
