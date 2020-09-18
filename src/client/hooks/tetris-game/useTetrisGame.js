import React from "react";
import { bindPieceToGrid } from "./grid";
import { insertPiece, softDrop, rotatePiece, moveLateral } from "./pieces";
import { isEmpty } from "helpers/functional";
import { GameContext } from "store";
import {
  pullCurrentPiece,
  updateCurrentPiece,
  updateGrid,
  setPlayerIsAlive,
  addScore,
} from "actions/game";
import useAutoMove from "./useAutoMove";
import useEventListener from "hooks/useEventListener";
import useThrottle from "hooks/useThrottle";

const INTERVAL_MS = 750;
const MOVE_LEFT = -1;
const MOVE_RIGHT = 1;
const DEFAULT_REPEAT_TIMEOUT = 5;

/*
 ** This custom hook is used to manage the game board.
 ** It exposed the following:
 **  - tetrisGrid: An actualized version of the game board;
 **  - insertNewPiece: A method to insert a new tetromino in the board.
 **  - movePieceDown: A method to move the current piece one row down.
 */
function useTetrisGame(cols = 10, rows = 20) {
  const { state, dispatch } = React.useContext(GameContext);
  const autoMoveTimer = useAutoMove(gravity);
  const throttledMove = useThrottle(movePiece, DEFAULT_REPEAT_TIMEOUT);
  useEventListener("keydown", throttledMove);

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
  }, [state.currentPiece.coord, state.currentPiece.shape]);

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
    if (
      ["ArrowDown", "ArrowLeft", "ArrowRight", "ArrowUp"].includes(action.key)
    ) {
      autoMoveTimer.stop();
      if (action.key === "ArrowDown") {
        doSoftDrop();
      } else if (action.key === "ArrowLeft") {
        movePieceLeft();
      } else if (action.key === "ArrowRight") {
        movePieceRight();
      } else if (action.key === "ArrowUp") {
        rotatePieceClockwise();
      }
    }
  }

  function movePieceLeft() {
    const newObj = moveLateral(state.grid, state.currentPiece, MOVE_LEFT);

    if (!isEmpty(newObj)) {
      const [newGrid, newPiece] = newObj;
      dispatch(updateGrid(newGrid));
      dispatch(updateCurrentPiece(newPiece));
    }
  }

  function movePieceRight() {
    const newObj = moveLateral(state.grid, state.currentPiece, MOVE_RIGHT);

    if (!isEmpty(newObj)) {
      const [newGrid, newPiece] = newObj;
      dispatch(updateGrid(newGrid));
      dispatch(updateCurrentPiece(newPiece));
    }
  }

  function doSoftDrop() {
    const hasMoved = gravity();
    if (hasMoved) {
      dispatch(addScore(1));
    }
  }

  function gravity() {
    let hasMoved = false;
    const newObj = softDrop(state.grid, state.currentPiece);

    if (isEmpty(newObj)) {
      const [newGrid, additionalScore] = bindPieceToGrid(
        state.grid,
        state.currentPiece,
      );
      dispatch(updateGrid(newGrid));
      dispatch(pullCurrentPiece());
      dispatch(addScore(additionalScore));
    } else {
      const [newGrid, newPiece] = newObj;
      dispatch(updateGrid(newGrid));
      dispatch(updateCurrentPiece(newPiece));
      hasMoved = true;
    }
    return hasMoved;
  }

  function rotatePieceClockwise() {
    const newObj = rotatePiece(state.currentPiece, state.grid);

    if (isEmpty(newObj)) {
      autoMoveTimer.start(INTERVAL_MS);
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
