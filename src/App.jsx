import React, { useState } from "react";
import "./App.css";

const Square = ({ value, onClick, isWinning }) => (
  <button
    className={`square ${isWinning ? "winning" : ""} bg-gray-200`}
    onClick={onClick}
  >
    {value}
  </button>
);

const Board = ({ squares, onSquareClick, winningLine }) => (
  <div className="grid grid-cols-3 gap-4 text-center">
    {squares.map((value, index) => (
      <Square
        key={index}
        value={value}
        onClick={() => onSquareClick(index)}
        isWinning={winningLine.includes(index)}
      />
    ))}
  </div>
);

const App = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (index) => {
    if (squares[index] || calculateWinner(squares).winner) return;

    const newSquares = squares.slice();
    newSquares[index] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const { winner, line } = calculateWinner(squares);
  const status = winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? "It's a draw!"
    : `Next player: ${isXNext ? "X" : "O"}`;

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="bg-gray-400 h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold mb-3 text-center">Tic Tac Toe</h1>
        <div className="text-center text-xl mb-3 text-gray-700">{status}</div>
        <Board squares={squares} onSquareClick={handleClick} winningLine={line} />
        <div className="flex justify-center mt-4">
          <button
            onClick={resetGame}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Restart Game
          </button>
        </div>
      </div>
    </div>
  );
};

const calculateWinner = (squares) => {
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

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: [] };
};

export default App;
