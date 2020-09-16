import React from "react";
import { insertPiece, moveDown, putTetromino } from "./pieces";
import { isEmpty } from "helpers/functional";
import { GameContext } from "store";
import { updateCurrentPiece, updateGrid } from "actions/game";
import useAutoMove from "./useAutoMove";
import useEventListener from "../useEventListener";

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
  useEventListener("keydown", movePiece);

  React.useEffect(() => {
    const initGrid = createGrid(cols, rows);
    dispatch(updateGrid(initGrid));
  }, []);

  const midGrid = React.useMemo(() => getMidGrid(cols), [cols]);

  // Methods
  function insertNewPiece(piece, grid = state.grid) {
    const newGrid = insertPiece(piece, grid, midGrid);
    dispatch(updateGrid(newGrid));
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
    if (action.key === "ArrowDown") {
      movePieceDown();
    }
    autoMoveTimer.start(INTERVAL_MS);
  }

  function movePieceDown() {
    let newGrid = moveDown(state.grid, cols, rows);

    if (isEmpty(newGrid)) {
      autoMoveTimer.stop();
      newGrid = putTetromino(state.currentPiece, state.grid);
      dispatch(updateGrid(newGrid));
      dispatch(updateCurrentPiece());
    } else {
      dispatch(updateGrid(newGrid));
    }
  }

  return { movePiece };
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
