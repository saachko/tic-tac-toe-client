import React from 'react';

import LoginForm from '../components/LoginForm';

function StartPage() {
  return (
    <div>
      <p className="mb--1 text-center">{`Let's play`}</p>
      <p className="text-center">tic-tac-toe</p>
      <LoginForm />
    </div>
  );
}

export default StartPage;
