import React, { useEffect, useState } from 'react';
import { FaRegCircle } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';
import { v4 } from 'uuid';

import { UserSocketData } from 'utils/interfaces';

interface GameTableProps {
  currentUser: UserSocketData | null;
  player1: UserSocketData | null;
  player2: UserSocketData | null;
}

function GameTable({ currentUser, player1, player2 }: GameTableProps) {
  const [moves, setMoves] = useState<number[]>([]);
  useEffect(() => {
    const defaultTable = new Array(9).fill(0);
    setMoves(defaultTable);
  }, []);

  const makeMove = (index: number) => {
    const newTable = [...moves];
    newTable[index] = player1?.id === currentUser?.id ? 1 : -1;
    setMoves(newTable);
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
