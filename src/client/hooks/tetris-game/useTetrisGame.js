import React from "react";
import { insertPiece, moveDown } from "./pieces";

/*
 ** This custom hook is used to manage the game board.
 ** It exposed the following:
 **  - tetrisGrid: An actualized version of the game board;
 **  - insertNewPiece: A method to insert a new tetromino in the board.
 **  - movePieceDown: A method to move the current piece one row down.
 */
function useTetrisGame(cols = 10, rows = 20) {
  // The board game and its initialization
  const [tetrisGrid, setTetrisGrid] = React.useState([]);
  React.useEffect(() => {
    try {
      const initGrid = createGrid(cols, rows);
      setTetrisGrid(initGrid);
    } catch (err) {
      console.error(err);
    }
  }, []);

  // Methods
  const insertPosition = React.useMemo(() => getInsertPosition(cols), [cols]);
  const insertNewPiece = (piece) => {
    const newGrid = insertPiece(piece, tetrisGrid, insertPosition);
    setTetrisGrid(newGrid);
  };

  const movePieceDown = () => {
    const newGrid = moveDown(tetrisGrid, cols);
    setTetrisGrid(newGrid);
  };

  return { tetrisGrid, insertNewPiece, movePieceDown };
}

export default useTetrisGame;

function createGrid(col, row) {
  if (col < 10 || row < 10) {
    throw new Error("X or Y dimension shouldn't be under 10");
  }
  return Array.from(Array(row), () => new Array(col).fill(0));
}

function getInsertPosition(colLength) {
  return Math.floor(colLength / 2) - 1;
}
