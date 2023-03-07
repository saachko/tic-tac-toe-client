const winningIndexes = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];

const checkWinningIndex = (values: number[], index: number[]) =>
  values[index[0]] === values[index[1]] && values[index[1]] === values[index[2]]
    ? values[index[0]]
    : 0;

const checkMoves = (moves: number[]) => {
  for (let i = 0; i < winningIndexes.length; i++) {
    const index = winningIndexes[i];
    const winningValue = checkWinningIndex(moves, index);
    if (winningValue !== 0) {
      return winningValue;
    }
  }
  return 0;
};

export default checkMoves;
