import React from 'react';
import { Button, Form } from 'react-bootstrap';

import UserData from '../utils/interfaces';
import SetState from '../utils/types';

interface LoginFormProps {
  setCurrentUser: SetState<UserData | null>;
  setUsers: SetState<UserData[]>;
}

type LoginInputs = {
  username: HTMLInputElement;
  room: HTMLInputElement;
};

function LoginForm({ setCurrentUser, setUsers }: LoginFormProps) {
  const connectToWebSocket = (userData: UserData) => {
    const ws = new WebSocket('ws://localhost:3001/');
    ws.onopen = () => {
      ws.send(JSON.stringify(userData));
      setCurrentUser(userData);
    };

    ws.onmessage = (event) => {
      setUsers(JSON.parse(event.data));
    };
  };

  const handleSubmit: React.FormEventHandler<
    HTMLFormElement & LoginInputs
  > = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const { username, room } = form;
    connectToWebSocket({
      username: username.value,
      room: room.value,
    });
  };

  return (
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
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formRoom">
        <Form.Control
          type="text"
          placeholder="Unique room id"
          name="room"
          required
        />
        <p className="raleway-font">{`*room id is a special code to join your friend's room`}</p>
      </Form.Group>
      <Button variant="primary" type="submit" className="w-100 mt-2">
        Start game!
      </Button>
    </Form>
  );
}

export default LoginForm;
