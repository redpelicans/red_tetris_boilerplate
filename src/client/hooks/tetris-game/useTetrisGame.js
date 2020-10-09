import React from "react";
import * as Grid from "./grid";
import * as Piece from "./pieces";
import { isEmpty } from "helpers/common";
import { GameContext } from "store";
import { pullCurrentPiece, addScore } from "actions/game";
import { MOVE_LEFT, MOVE_RIGHT } from "constants/tetris";
import useTetrisState from "./useTetrisState";
import WorkerTimer from "worker/timer.worker.js";
import useWorker from "hooks/useWorker";
import useGravity from "./useGravity";
import useNewGrid from "./useNewGrid";

/*
 ** This custom hook is used to manage the game board.
 ** It exposed the following:
 **  - movePiece: A dispatcher to all possible actions;
 */
function useTetrisGame(cols = 10, rows = 20) {
  const { state, dispatch } = React.useContext(GameContext);

  useNewGrid(cols, rows);

  const {
    updateStateAfterMove,
    updateStateAfterBind,
    setGameOver,
  } = useTetrisState();

  const gravityInterval = useGravity();

  const handleMessage = React.useCallback(() => {
    if (!state.currentPiece.coord || isEmpty(state.currentPiece.shape)) {
      return;
    }

    gravity();
  }, [state.currentPiece.coord, state.currentPiece.shape]);

  const worker = useWorker(WorkerTimer, handleMessage);

  React.useEffect(() => {
    if (state.alive === false) {
      worker.postMessage({ type: "STOP_TIMER" });
    }
  }, [state.alive]);

  React.useEffect(() => {
    if (worker) {
      worker.postMessage({ type: "STOP_TIMER" });
      worker.postMessage({ type: "SET_TIMER", delay: gravityInterval });
    }
  }, [gravityInterval, worker]);

  // On new piece
  React.useEffect(() => {
    if (!isEmpty(state.currentPiece.shape)) {
      insertNewPiece(state.currentPiece);
    }
  }, [state.currentPiece.id]);

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

    switch (action.code) {
      case "ArrowDown":
        return doSoftDrop();
      case "ArrowLeft":
        return movePieceLateral(MOVE_LEFT);
      case "ArrowRight":
        return movePieceLateral(MOVE_RIGHT);
      case "ArrowUp":
        return rotatePiece();
      case "Space":
        return doHardDrop();
      default:
        return;
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

    if (!isEmpty(newObj)) {
      updateStateAfterMove(newObj);
    }
  }

  return { movePiece };
}

export default useTetrisGame;
