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

/*
 ** This custom hook is used to manage the game board.
 ** It exposed the following:
 **  - movePiece: A dispatcher to all possible actions;
 */
function useTetrisGame(grid, setGrid) {
  const { state, dispatch } = React.useContext(GameContext);
  const [coord, setCoord] = React.useState(null);

  const {
    updateStateAfterMove,
    updateStateAfterBind,
    setGameOver,
  } = useTetrisState(setGrid);

  const gravityInterval = useGravity();

  const handleTimerWorkerMessage = React.useCallback(() => {
    if (!state.currentPiece.coord || isEmpty(state.currentPiece.shape)) {
      return;
    }

    gravity();
  }, [state.currentPiece.coord, state.currentPiece.shape]);

  const timerWorker = useWorker(WorkerTimer, handleTimerWorkerMessage);

  React.useEffect(() => {
    if (state.alive === false) {
      timerWorker.postMessage({ type: "STOP_TIMER" });
    }
  }, [state.alive]);

  React.useEffect(() => {
    if (timerWorker) {
      timerWorker.postMessage({ type: "STOP_TIMER" });
      timerWorker.postMessage({ type: "SET_TIMER", delay: gravityInterval });
    }
  }, [gravityInterval, timerWorker]);

  // On new piece
  React.useEffect(() => {
    if (!isEmpty(state.currentPiece.shape)) {
      insertNewPiece(state.currentPiece, grid);
    }
  }, [state.currentPiece.id]);

  // At start only
  React.useEffect(() => {
    if (state.nextPieces.length === 4) {
      dispatch(pullCurrentPiece());
    }
  }, [state.nextPieces]);

  // Methods
  function insertNewPiece(piece, grid = grid) {
    const newObj = Piece.insertion(piece, grid);
    if (newObj) {
      setCoord(newObj[1].coord);
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
    let newPiece = null;
    const cleanGrid = Grid.clear(grid);

    setCoord((oldCoord) => {
      newPiece = {
        ...state.currentPiece,
        coord: { ...oldCoord, x: oldCoord.x + direction },
      };
      if (canMove(cleanGrid, newPiece)) {
        return newPiece.coord;
      }
      newPiece = null;
      return oldCoord;
    });

    if (newPiece !== null) {
      const newGrid = Piece.lateralMove(cleanGrid, newPiece);
      updateStateAfterMove([newGrid, newPiece]);
    }
  }

  function doHardDrop() {
    const newObj = Piece.hardDrop(grid, state.currentPiece);

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
    let newPiece = null;
    const cleanGrid = Grid.clear(grid);

    setCoord((oldCoord) => {
      newPiece = {
        ...state.currentPiece,
        coord: { ...oldCoord, y: oldCoord.y + 1 },
      };
      if (canMove(cleanGrid, newPiece)) {
        return newPiece.coord;
      }
      newPiece = null;
      return oldCoord;
    });

    if (newPiece === null) {
      const newObj = Grid.bind(cleanGrid, state.currentPiece);
      updateStateAfterBind(newObj);
      return false;
    }
    const newGrid = Piece.softDrop(cleanGrid, newPiece);
    updateStateAfterMove([newGrid, newPiece]);
    return true;
  }

  function rotatePiece() {
    const newObj = Piece.rotation(state.currentPiece, grid);

    if (!isEmpty(newObj)) {
      updateStateAfterMove(newObj);
    }
  }

  return { movePiece };
}

export default useTetrisGame;

function canMove(grid, piece) {
  return Grid.Check.canPutLayer(grid, piece);
}
