import React from "react";
import * as Grid from "./grid";
import * as Piece from "./pieces";
import { isEmpty } from "helpers/common";
import { GameContext } from "store";
import { pullCurrentPiece, updateGrid, addScore } from "actions/game";
import useAutoMove from "./useAutoMove";
import {
  INTERVAL_MS,
  MOVE_LEFT,
  MOVE_RIGHT,
  KEYBOARD_ACTIONS,
} from "./constants";
import useTetrisState from "./useTetrisState";

/*
 ** This custom hook is used to manage the game board.
 ** It exposed the following:
 **  - movePiece: A dispatcher to all possible actions;
 */
function useTetrisGame(cols = 10, rows = 20) {
  const { state, dispatch } = React.useContext(GameContext);
  const {
    updateStateAfterMove,
    updateStateAfterBind,
    setGameOver,
  } = useTetrisState();
  const autoMoveTimer = useAutoMove(gravity);

  const gravityInterval = React.useMemo(() => INTERVAL_MS / state.speedRate, [
    state.speedRate,
  ]);

  // On component did mount
  React.useEffect(() => {
    const initGrid = Grid.create(cols, rows);
    dispatch(updateGrid(initGrid));
  }, []);

  // On new piece
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

  // Methods
  function insertNewPiece(piece, grid = state.grid) {
    const newObj = Piece.insertion(piece, grid);
    if (newObj) {
      updateStateAfterMove(newObj);
      return true;
    }
    const newGrid = Piece.forceInsertion(piece, grid);
    setGameOver(newGrid);
    return false;
  }

  // Dispatcher to Tetris Actions
  function movePiece(action) {
    if (!state.alive) {
      return;
    }

    if (KEYBOARD_ACTIONS.includes(action.code)) {
      autoMoveTimer.stop();
      if (action.code === "ArrowDown") {
        doSoftDrop();
      } else if (action.code === "ArrowLeft") {
        movePieceLateral(MOVE_LEFT);
      } else if (action.code === "ArrowRight") {
        movePieceLateral(MOVE_RIGHT);
      } else if (action.code === "ArrowUp") {
        rotatePiece();
      } else if (action.code === "Space") {
        doHardDrop();
      }
    }
  }

  // Tetris Actions
  function movePieceLateral(direction) {
    const newObj = Piece.lateralMove(state.grid, state.currentPiece, direction);

    if (!isEmpty(newObj)) {
      updateStateAfterMove(newObj);
    }
  }

  function doHardDrop() {
    const newObj = Piece.hardDrop(state.grid, state.currentPiece);

    if (isEmpty(newObj)) {
      setGameOver(null);
    } else {
      updateStateAfterBind(newObj);
    }
  }

  function doSoftDrop() {
    const hasMoved = gravity();

    if (hasMoved) {
      dispatch(addScore(1));
    }
  }

  function gravity() {
    let newObj = Piece.softDrop(state.grid, state.currentPiece);

    if (isEmpty(newObj)) {
      newObj = Grid.bind(state.grid, state.currentPiece);
      updateStateAfterBind(newObj);
      return false;
    }
    updateStateAfterMove(newObj);
    return true;
  }

  function rotatePiece() {
    const newObj = Piece.rotation(state.currentPiece, state.grid);

    if (isEmpty(newObj)) {
      autoMoveTimer.start(gravityInterval);
    } else {
      updateStateAfterMove(newObj);
    }
  }

  return { movePiece };
}

export default useTetrisGame;
