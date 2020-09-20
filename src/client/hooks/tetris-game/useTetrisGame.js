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
  increaseSpeedRate,
} from "actions/game";
import useAutoMove from "./useAutoMove";
import { INTERVAL_MS, MOVE_LEFT, MOVE_RIGHT } from "./constants";

/*
 ** This custom hook is used to manage the game board.
 ** It exposed the following:
 **  - movePiece: A dispatcher to all possible actions;
 */
function useTetrisGame(cols = 10, rows = 20) {
  const { state, dispatch } = React.useContext(GameContext);
  const autoMoveTimer = useAutoMove(gravity);

  React.useEffect(() => {
    const initGrid = Grid.create(cols, rows);
    dispatch(updateGrid(initGrid));
  }, []);

  const gravityInterval = React.useMemo(() => INTERVAL_MS / state.speedRate, [
    state.speedRate,
  ]);

  // Methods
  function insertNewPiece(piece, grid = state.grid) {
    const newObj = Piece.insertion(piece, grid);
    if (newObj) {
      const [newGrid, newPiece] = newObj;
      const newGridWithShadow = Piece.shadow(newGrid, newPiece);
      dispatch(updateGrid(newGridWithShadow));
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
      autoMoveTimer.start(gravityInterval);

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
      const newGridWithShadow = Piece.shadow(newGrid, newPiece);
      dispatch(updateGrid(newGridWithShadow));
      dispatch(updateCurrentPiece(newPiece));
    }
  }

  function doHardDrop() {
    const newObj = Piece.hardDrop(state.grid, state.currentPiece);

    if (isEmpty(newObj)) {
      dispatch(setPlayerIsAlive(false));
    } else {
      const [newGrid, score, nbRowsRemoved] = newObj;
      dispatch(updateGrid(newGrid));
      dispatch(pullCurrentPiece());
      dispatch(addScore(score));
      dispatch(increaseSpeedRate(nbRowsRemoved));
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
      const [newGrid, additionalScore, nbRowsRemoved] = Grid.bind(
        state.grid,
        state.currentPiece,
      );
      dispatch(updateGrid(newGrid));
      dispatch(pullCurrentPiece());
      dispatch(addScore(additionalScore));
      dispatch(increaseSpeedRate(nbRowsRemoved));
    } else {
      const [newGrid, newPiece] = newObj;
      const newGridWithShadow = Piece.shadow(newGrid, newPiece);
      dispatch(updateGrid(newGridWithShadow));
      dispatch(updateCurrentPiece(newPiece));
      hasMoved = true;
    }
    return hasMoved;
  }

  function rotatePieceClockwise() {
    const newObj = Piece.rotation(state.currentPiece, state.grid);

    if (isEmpty(newObj)) {
      autoMoveTimer.start(gravityInterval);
    } else {
      const [newGrid, newPiece] = newObj;
      const newGridWithShadow = Piece.shadow(newGrid, newPiece);
      dispatch(updateGrid(newGridWithShadow));
      dispatch(updateCurrentPiece(newPiece));
    }
  }

  return { movePiece };
}

export default useTetrisGame;
