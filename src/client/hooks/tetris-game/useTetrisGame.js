import React from "react";
import * as Grid from "./grid";
import * as Piece from "./pieces";
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
import {
  INTERVAL_MS,
  MOVE_LEFT,
  MOVE_RIGHT,
  DEFAULT_REPEAT_TIMEOUT,
} from "./constants";

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
    const newObj = Piece.insertion(piece, grid, midGrid);
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
      ["ArrowDown", "ArrowLeft", "ArrowRight", "ArrowUp", "Space"].includes(
        action.code,
      )
    ) {
      autoMoveTimer.stop();
      if (action.code === "ArrowDown") {
        doSoftDrop();
      } else if (action.code === "ArrowLeft") {
        movePieceLateral(MOVE_LEFT);
      } else if (action.code === "ArrowRight") {
        movePieceLateral(MOVE_RIGHT);
      } else if (action.code === "ArrowUp") {
        rotatePieceClockwise();
      } else if (action.code === "Space") {
        doHardDrop();
      }
    }
  }

  function movePieceLateral(direction) {
    const newObj = Piece.lateralMove(state.grid, state.currentPiece, direction);

    if (!isEmpty(newObj)) {
      const [newGrid, newPiece] = newObj;
      dispatch(updateGrid(newGrid));
      dispatch(updateCurrentPiece(newPiece));
    }
  }

  function doHardDrop() {
    const newObj = Piece.hardDrop(state.grid, state.currentPiece);

    if (isEmpty(newObj)) {
      dispatch(setPlayerIsAlive(false));
    } else {
      const [newGrid, score] = newObj;
      dispatch(updateGrid(newGrid));
      dispatch(pullCurrentPiece());
      dispatch(addScore(score));
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
    const newObj = Piece.softDrop(state.grid, state.currentPiece);

    if (isEmpty(newObj)) {
      const [newGrid, additionalScore] = Grid.bind(
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
    const newObj = Piece.rotation(state.currentPiece, state.grid);

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
