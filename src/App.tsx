import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import GamePage from './pages/GamePage';
import NotFound from './pages/NotFound';
import StartPage from './pages/StartPage';
import UserData from './utils/interfaces';

function App() {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [users, setUsers] = useState<UserData[]>([]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <StartPage
            setCurrentUser={setCurrentUser}
            setUsers={setUsers}
            users={users}
          />
        }
      />
      <Route path="/game" element={<GamePage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
