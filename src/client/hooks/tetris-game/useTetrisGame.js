import React from "react";
import useCurrentPiece from "./useCurrentPiece";
import { insertPiece, moveDown, putTetromino } from "./pieces";
import { isEmpty } from "helpers/functional";
import { GameContext } from "store";
import { putColor, popPiece } from "actions/pieces";
import MOCK_TETROMINOES from "mocks/Tetrominoes";

/*
 ** This custom hook is used to manage the game board.
 ** It exposed the following:
 **  - tetrisGrid: An actualized version of the game board;
 **  - insertNewPiece: A method to insert a new tetromino in the board.
 **  - movePieceDown: A method to move the current piece one row down.
 */
function useTetrisGame(cols = 10, rows = 20) {
  const { state, dispatch } = React.useContext(GameContext);
  const [currentPiece, updateCurrentPiece] = useCurrentPiece();
  // const currentPiece = React.useRef(null);

  // The board game and its initialization
  const [tetrisGrid, setTetrisGrid] = React.useState(() => {
    try {
      return createGrid(cols, rows);
    } catch (err) {
      console.error(err);
      return createGrid(10, 20);
    }
  });

  const midGrid = React.useMemo(() => getMidGrid(cols), [cols]);

  // Methods
  const insertNewPiece = (piece, grid = tetrisGrid) => {
    const newGrid = insertPiece(piece, grid, midGrid);
    setTetrisGrid(newGrid);
  };

  React.useEffect(() => {
    if (state.nextPieces.length === 4) {
      updateCurrentPiece();
      // console.log(currentPiece, state.nextPieces);
      insertNewPiece(currentPiece.current.shape);
    }
  }, [state.nextPieces]);

  const movePieceDown = () => {
    let newGrid = moveDown(tetrisGrid, cols, rows);
    // console.log(newGrid);
    if (isEmpty(newGrid)) {
      newGrid = putTetromino(currentPiece.current, tetrisGrid);
      updateCurrentPiece();
      insertNewPiece(currentPiece.current.shape, newGrid);
    } else {
      setTetrisGrid(newGrid);
    }
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

function getMidGrid(colLength) {
  return Math.floor(colLength / 2);
}

// Function for test env
function fetchFromMock(n) {
  if (MOCK_TETROMINOES.length < n) {
    console.log("END OF TETROMINOES");
  }

  return MOCK_TETROMINOES.splice(0, n);
}
