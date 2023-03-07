import React, { useEffect, useState } from 'react';
import { FaRegCircle } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';
import { v4 } from 'uuid';

import { SocketRawData, UserData } from 'utils/interfaces';

interface GameTableProps {
  currentUser: UserData | null;
  player1: UserData | null;
  player2: UserData | null;
}

function GameTable({ currentUser, player1, player2 }: GameTableProps) {
  const [moves, setMoves] = useState<number[]>([]);

  const connectToWebSocket = (movesData: number[]) => {
    const ws = new WebSocket('ws://localhost:3001/');
    ws.onopen = () => {
      const opponentId =
        player1?.id === currentUser?.id ? player2?.id : player1?.id;
      const data = { type: 'move', move: movesData, opponentId };
      ws.send(JSON.stringify(data));
    };

    ws.onmessage = (event) => {
      const rawData: SocketRawData = JSON.parse(event.data);
      if (rawData.type === 'move' && rawData.opponentId === currentUser?.id) {
        setMoves(rawData.moves);
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

  const makeMove = (index: number) => {
    const newTable = [...moves];
    newTable[index] = player1?.id === currentUser?.id ? 1 : -1;
    setMoves(newTable);
    connectToWebSocket(newTable);
  };

  return (
    <div className="table">
      {moves.map((move, index) => (
        <button
          type="button"
          key={v4()}
          className="cell"
          onClick={() => makeMove(index)}
          disabled={!!move}
        >
          {move === 1 && <GrClose />}
          {move === -1 && <FaRegCircle />}
        </button>
      ))}
    </div>
  );
}

export default GameTable;
