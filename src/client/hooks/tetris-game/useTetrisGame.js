import React from "react";
import { insertPiece, moveDown, putTetromino } from "./pieces";
import { isEmpty } from "helpers/functional";
import { GameContext } from "store";
import { updateCurrentPiece } from "actions/pieces";
import useAutoMove from "./useAutoMove";

const INTERVAL_MS = 1250;

/*
 ** This custom hook is used to manage the game board.
 ** It exposed the following:
 **  - tetrisGrid: An actualized version of the game board;
 **  - insertNewPiece: A method to insert a new tetromino in the board.
 **  - movePieceDown: A method to move the current piece one row down.
 */
function useTetrisGame(cols = 10, rows = 20) {
  const { state, dispatch } = React.useContext(GameContext);
  const autoMoveTimer = useAutoMove(movePieceDown);

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
  function insertNewPiece(piece, grid = tetrisGrid) {
    const newGrid = insertPiece(piece, grid, midGrid);
    setTetrisGrid(newGrid);
  }

  React.useEffect(() => {
    if (state.currentPiece.shape.length > 0) {
      insertNewPiece(state.currentPiece.shape);
      autoMoveTimer.start(INTERVAL_MS);
    }
  }, [state.currentPiece]);

  // At start only
  React.useEffect(() => {
    if (state.nextPieces.length === 4) {
      dispatch(updateCurrentPiece());
    }
  }, [state.nextPieces]);

  function movePiece(action) {
    autoMoveTimer.stop();
    if (action === "DOWN") {
      movePieceDown();
    }
    autoMoveTimer.start(INTERVAL_MS);
  }

  function movePieceDown() {
    let newGrid = moveDown(tetrisGrid, cols, rows);
    if (isEmpty(newGrid)) {
      autoMoveTimer.stop();
      newGrid = putTetromino(state.currentPiece, tetrisGrid);
      setTetrisGrid(newGrid);
      dispatch(updateCurrentPiece());
    } else {
      setTetrisGrid(newGrid);
    }
  }

  return { tetrisGrid, insertNewPiece, movePiece };
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
