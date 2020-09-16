import React from "react";
import { insertPiece, moveDown, putTetromino } from "./pieces";
import { isEmpty } from "helpers/functional";
import { GameContext } from "store";
import {
  pullCurrentPiece,
  updateCurrentPiece,
  updateGrid,
  setPlayerIsAlive,
} from "actions/game";
import useAutoMove from "./useAutoMove";
import useEventListener from "../useEventListener";

const INTERVAL_MS = 500;

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
  useEventListener("keyup", movePiece);

  React.useEffect(() => {
    const initGrid = createGrid(cols, rows);
    dispatch(updateGrid(initGrid));
  }, []);

  const midGrid = React.useMemo(() => getMidGrid(cols), [cols]);

  // Methods
  function insertNewPiece(piece, grid = state.grid) {
    const newObj = insertPiece(piece, grid, midGrid);
    if (newObj) {
      const [newGrid, newPiece] = newObj;
      dispatch(updateGrid(newGrid));
      dispatch(updateCurrentPiece(newPiece));
      return true;
    }
    dispatch(setPlayerIsAlive(false));
    return false;
  }

  React.useEffect(() => {
    if (!isEmpty(state.currentPiece.shape)) {
      insertNewPiece(state.currentPiece);
    }
  }, [state.currentPiece.id]);

  // Set a new Timer after each move
  React.useEffect(() => {
    if (!isEmpty(state.currentPiece.shape) && state.currentPiece.coord) {
      autoMoveTimer.start(INTERVAL_MS);

      return () => autoMoveTimer.stop();
    }
  }, [state.currentPiece.coord]);

  // At start only
  React.useEffect(() => {
    if (state.nextPieces.length === 4) {
      dispatch(pullCurrentPiece());
    }
  }, [state.nextPieces]);

  function movePiece(action) {
    if (!state.alive) {
      return;
    }
    autoMoveTimer.stop();
    if (action === "DOWN" || action?.key === "ArrowDown") {
      movePieceDown();
    }
    autoMoveTimer.start(INTERVAL_MS);
  }

  function movePieceDown() {
    const newObj = moveDown(state.grid, cols, rows, state.currentPiece);

    if (isEmpty(newObj)) {
      autoMoveTimer.stop();
      const newGrid = putTetromino(state.currentPiece, state.grid);
      dispatch(updateGrid(newGrid));
      dispatch(pullCurrentPiece());
    } else {
      const [newGrid, newPiece] = newObj;
      dispatch(updateGrid(newGrid));
      dispatch(updateCurrentPiece(newPiece));
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
