import React, { Suspense, lazy, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Loader from 'components/Loader';

import { UserData } from './utils/interfaces';

const NotFound = lazy(() => import('./pages/NotFound'));
const GamePage = lazy(() => import('./pages/GamePage'));
const StartPage = lazy(() => import('./pages/StartPage'));

function App() {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [users, setUsers] = useState<UserData[]>([]);

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route
          path="/"
          element={
            <StartPage
              setCurrentUser={setCurrentUser}
              setUsers={setUsers}
              currentUser={currentUser}
              users={users}
            />
          }
        />
        <Route
          path="/game"
          element={<GamePage currentUser={currentUser} users={users} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
