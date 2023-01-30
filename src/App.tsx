import React from 'react';
import { Route, Routes } from 'react-router-dom';

import GamePage from './pages/GamePage';
import NotFound from './pages/NotFound';
import StartPage from './pages/StartPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/game" element={<GamePage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
