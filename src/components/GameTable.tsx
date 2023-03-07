import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { FaRegCircle } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';
import { v4 } from 'uuid';

import { checkIfMovesLeft, checkMoves } from 'utils/functions';
import { SocketRawData, UserData } from 'utils/interfaces';

interface GameTableProps {
  currentUser: UserData | null;
  player1: UserData | null;
  player2: UserData | null;
}

function GameTable({ currentUser, player1, player2 }: GameTableProps) {
  const [moves, setMoves] = useState<number[]>([]);
  const [nextUser, setNextUser] = useState(player1);
  const [message, setMessage] = useState('');
  const [winner, setWinner] = useState<UserData | null>(null);
  const [draw, setDraw] = useState(false);

  const selectWhoMovesNext = (id: string | undefined) => {
    if (id) {
      const nextMove = id === player1?.id ? player1 : player2;
      setNextUser(nextMove || currentUser);
      setMessage(`${nextMove?.username || currentUser?.username} moves next`);
    }
  };

  const connectToWebSocket = (movesData: number[]) => {
    const ws = new WebSocket('ws://localhost:3001/');
    ws.onopen = () => {
      const opponentId =
        player1?.id === currentUser?.id ? player2?.id : player1?.id;
      const data = { type: 'move', move: movesData, opponentId };
      ws.send(JSON.stringify(data));
      selectWhoMovesNext(opponentId);
    };

    ws.onmessage = (event) => {
      const rawData: SocketRawData = JSON.parse(event.data);
      if (rawData.type === 'move' && rawData.opponentId === currentUser?.id) {
        setMoves(rawData.moves);
        selectWhoMovesNext(rawData.opponentId);
      }
      if (rawData.type === 'close') {
        const usersList = rawData.users;
        if (!usersList.find((user) => user.id === player1?.id || player2?.id)) {
          document.location.reload();
        }
      }
    };
  };

  useEffect(() => {
    const defaultTable = new Array(9).fill(0);
    setMoves(defaultTable);
    if (player1?.id !== currentUser?.id) {
      connectToWebSocket(defaultTable);
    }
  }, []);

  useEffect(() => {
    if (player1) {
      setMessage(`${player1?.username} moves first`);
    }
  }, [player1]);

  const makeMove = (index: number) => {
    const newTable = [...moves];
    newTable[index] = player1?.id === currentUser?.id ? 1 : -1;
    setMoves(newTable);
    connectToWebSocket(newTable);
  };

  useEffect(() => {
    if (moves.length > 0) {
      const checkingResult = checkMoves(moves);
      if (checkingResult) {
        setWinner(checkingResult === 1 ? player1 : player2);
      }
      setDraw(checkIfMovesLeft(moves));
    }
  }, [moves]);

  useEffect(() => {
    if (winner) {
      setTimeout(() => {
        setMessage(`${winner.username} wins`);
      }, 0);
    }
  }, [winner]);

  useEffect(() => {
    if (draw) {
      setTimeout(() => {
        setMessage("It's a draw!");
      }, 0);
    }
  }, [draw]);

  return (
    <>
      <div className="table">
        {moves.map((move, index) => (
          <button
            type="button"
            key={v4()}
            className="cell"
            onClick={() => makeMove(index)}
            disabled={
              (nextUser || player1)?.id !== currentUser?.id ||
              !!move ||
              !!winner ||
              draw
            }
          >
            {move === 1 && <GrClose />}
            {move === -1 && <FaRegCircle />}
          </button>
        ))}
        <div
          className={clsx('table-hidden raleway-font', {
            hidden: player2?.id !== '0',
          })}
        >
          waiting for your opponent...
        </div>
      </div>
      <p className="raleway-font fs-1">{message}</p>
    </>
  );
}

export default GameTable;
