import { useState } from "react";

function findWinner(board) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return board[a];
    }
  }
  return null;
}

function Cell({ index, disabled, mark, turn, onClick }) {
  return (
    <button
      aria-label={mark == null ? `Mark cell ${index} as ${turn}}` : undefined}
      className="cell"
      disabled={disabled}
      onClick={onClick}
    >
      <span aria-hidden={true}>{mark}</span>
    </button>
  );
}

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xPlaying, setXPlaying] = useState(true);

  const winner = findWinner(board);

  function onReset() {
    setBoard(Array(9).fill(null));
    setXPlaying(true);
  }

  function getStatus() {
    if (winner) {
      return `Player ${winner} wins!`;
    }
    //If the board is filled up
    if (!board.includes(null)) {
      return "Draw!";
    }
    return `Player ${xPlaying ? "X" : "O"} turn`;
  }

  return (
    <div className="app">
      <div aria-live="polite">{getStatus()}</div>
      <div className="board">
        {Array(9)
          .fill(null)
          .map((_, index) => index)
          .map((cellIndex) => {
            const turn = xPlaying ? "X" : "O";
            return (
              <Cell
                key={cellIndex}
                disabled={board[cellIndex] || winner}
                index={cellIndex}
                mark={board[cellIndex]}
                turn={turn}
                onClick={() => {
                  const newBoard = board.slice();
                  newBoard[cellIndex] = turn;
                  setBoard(newBoard);
                  setXPlaying(!xPlaying);
                }}
              />
            );
          })}
      </div>
      <button
        onClick={() => {
          if (winner == null) {
            const confirm = window.confirm(
              "Are you sure you want to reset the game?"
            );
            if (!confirm) {
              return;
            }
          }
          onReset();
        }}
      >
        Reset
      </button>
    </div>
  );
}
