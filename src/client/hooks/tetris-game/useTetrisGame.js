import React from "react";
import * as Grid from "./grid";
import * as Piece from "./pieces";
import { isEmpty } from "helpers/common";
import { divideBy } from "helpers/currying";
import { GameContext } from "store";
import { pullCurrentPiece, updateGrid, addScore } from "actions/game";
import useAutoMove from "./useAutoMove";
import {
  INTERVAL_MS,
  MOVE_LEFT,
  MOVE_RIGHT,
  KEYBOARD_ACTIONS,
} from "constants/tetris";
import useTetrisState from "./useTetrisState";
import usePrevious from "hooks/usePrevious";
import WorkerTimer from "./timer.worker.js";

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

  const [tick, setTick] = React.useState(0);

  const [worker] = React.useState(new WorkerTimer());
  React.useEffect(() => {
    worker.postMessage({ type: "SET_TIMER", delay: gravityInterval });
    worker.onmessage = ({ data }) => {
      console.log(data);
      setTick((oldTick) => oldTick + 1);
    };
  }, []);

  React.useEffect(() => {
    if (!state.currentPiece.coord || isEmpty(state.currentPiece.shape)) {
      return;
    }
    gravity();
  }, [tick]);

  const previousY = usePrevious(state.currentPiece);

  const gravityInterval = React.useMemo(() => {
    const divideByThree = divideBy(3);
    let interval = INTERVAL_MS;

    for (let i = 0; i < state.level; i++) {
      interval = interval - divideByThree(interval);
    }

    return interval;
  }, [state.level]);

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
      if (
        // state.currentPiece.coord.y > previousY?.coord?.y ||
        // state.currentPiece.coord.y <= 0
        autoMoveTimer.state === 0
      ) {
        autoMoveTimer.start(gravityInterval);

        return () => {
          console.log(autoMoveTimer.state);
          if (
            // (state.currentPiece.coord.y > previousY?.coord?.y ||
            //   state.currentPiece.coord.y <= 0) &&
            autoMoveTimer.state === 1
          ) {
            autoMoveTimer.stop();
          }
        };
      }
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

  const [allowAction, setAllowAction] = React.useState(true);

  // Dispatcher to Tetris Actions
  function movePiece(action) {
    if (!state.alive) {
      return;
    }

    autoMoveTimer.pause();
    if (action.code === "ArrowDown") {
      doSoftDrop();
    } else if (action.code === "ArrowLeft") {
      movePieceLateral(MOVE_LEFT);
    } else if (action.code === "ArrowRight") {
      movePieceLateral(MOVE_RIGHT);
    } else if (action.code === "ArrowUp" && allowAction) {
      setAllowAction(false);
      rotatePiece();
    } else if (action.code === "Space") {
      doHardDrop();
    }
    autoMoveTimer.resume();
  }

  function reallowAction() {
    setAllowAction(true);
  }

  // Tetris Actions
  function movePieceLateral(direction) {
    const newObj = Piece.lateralMove(state.grid, state.currentPiece, direction);

    updateStateAfterMove(newObj);
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

    updateStateAfterMove(newObj);
  }

  return { movePiece, reallowAction };
}

export default useTetrisGame;
