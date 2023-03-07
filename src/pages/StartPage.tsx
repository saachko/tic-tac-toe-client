import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Notification from 'components/Notification';

import LoginForm from '../components/LoginForm';
import { UserData } from '../utils/interfaces';
import { SetState } from '../utils/types';

interface StartPageProps {
  setCurrentUser: SetState<UserData | null>;
  currentUser: UserData | null;
  setUsers: SetState<UserData[]>;
  users: UserData[];
}

function StartPage({
  setCurrentUser,
  currentUser,
  setUsers,
  users,
}: StartPageProps) {
  const [isNotificationShown, setNotificationShown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (users.length && currentUser) {
      const usersInRoom = users.filter(
        (user) => user.room === currentUser.room
      );
      if (usersInRoom.length <= 2) {
        navigate('/game');
      } else {
        setNotificationShown(true);
      }
    }
  }, [currentUser, users]);

  return (
    <div>
      <p className="mb--1 text-center">{`Let's play`}</p>
      <p className="text-center">tic-tac-toe</p>
      <LoginForm
        setCurrentUser={setCurrentUser}
        setUsers={setUsers}
        isDisabled={isNotificationShown}
      />
      <Notification
        isShown={isNotificationShown}
        closeNotification={() => setNotificationShown(false)}
      />
    </div>
  );
}

export default StartPage;
