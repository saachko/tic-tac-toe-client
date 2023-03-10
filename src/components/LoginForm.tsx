import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { v4 } from 'uuid';

import { wssUrl } from 'utils/constants';

import { SocketRawData, UserData } from '../utils/interfaces';
import { SetState } from '../utils/types';
import Loader from './Loader';

interface LoginFormProps {
  setCurrentUser: SetState<UserData | null>;
  setUsers: SetState<UserData[]>;
  isDisabled: boolean;
}

type LoginInputs = {
  username: HTMLInputElement;
  room: HTMLInputElement;
};

function LoginForm({ setCurrentUser, setUsers, isDisabled }: LoginFormProps) {
  const [isUserLoading, setUserLoading] = useState(false);
  const connectToWebSocket = (userData: UserData) => {
    const ws = new WebSocket(wssUrl);
    ws.onopen = () => {
      const data = { type: 'user', user: userData };
      ws.send(JSON.stringify(data));
      setCurrentUser(userData);
    };

    ws.onmessage = (event) => {
      setUserLoading(false);
      const rawData: SocketRawData = JSON.parse(event.data);
      if (rawData.type === 'user') {
        setUsers(rawData.users);
      }
    };
  };

  const handleSubmit: React.FormEventHandler<
    HTMLFormElement & LoginInputs
  > = async (event) => {
    event.preventDefault();
    setUserLoading(true);
    const form = event.currentTarget;
    const { username, room } = form;
    connectToWebSocket({
      id: v4(),
      username: username.value,
      room: room.value,
    });
  };

  return (
    <>
      <Form
        className="col-md-4 col-sm-5 mx-auto w-100 d-flex flex-column justify-content-center"
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Control
            type="text"
            placeholder="Enter your name"
            name="username"
            required
            pattern="^(?!.*\.{3})[\s\S]*$"
            disabled={isDisabled}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formRoom">
          <Form.Control
            type="text"
            placeholder="Unique room id"
            name="room"
            required
            disabled={isDisabled}
          />
          <p className="raleway-font">{`*room id is a special code to join your friend's room`}</p>
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="w-100 mt-2"
          disabled={isDisabled}
        >
          Start game!
        </Button>
      </Form>
      {isUserLoading && <Loader />}
    </>
  );
}

export default LoginForm;
