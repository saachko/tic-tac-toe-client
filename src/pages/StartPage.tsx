import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

import Notification from 'components/Notification';

import LoginForm from '../components/LoginForm';
import UserData from '../utils/interfaces';
import SetState from '../utils/types';

interface StartPageProps {
  setCurrentUser: SetState<UserData | null>;
  setUsers: SetState<UserData[]>;
  users: UserData[];
}

function StartPage({ setCurrentUser, setUsers, users }: StartPageProps) {
  const [isNotificationShown, setNotificationShown] = useState(false);

  if (users.length) {
    return <Navigate to="/game" />;
  }
  return (
    <div>
      <p className="mb--1 text-center">{`Let's play`}</p>
      <p className="text-center">tic-tac-toe</p>
      <LoginForm setCurrentUser={setCurrentUser} setUsers={setUsers} />
      <Notification
        isShown={isNotificationShown}
        closeNotification={() => setNotificationShown(false)}
      />
    </div>
  );
}

export default StartPage;
