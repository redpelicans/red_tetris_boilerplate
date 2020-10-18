import React from "react";
import * as Grid from "./grid";
import * as Piece from "./pieces";
import { isEmpty } from "helpers/common";
import { GameContext } from "store";
import { pullCurrentPiece, addScore } from "actions/game";
import { MOVE_LEFT, MOVE_RIGHT } from "constants/tetris";
import WorkerTimer from "worker/timer.worker.js";
import useWorker from "hooks/useWorker";
import useGravity from "./useGravity";

/*
 ** This custom hook is used to manage the game board.
 ** It exposed the following:
 **  - movePiece: A dispatcher to all possible actions;
 */
function useTetrisGame(grid, piece, methods) {
  const { state, dispatch } = React.useContext(GameContext);

  const gravityInterval = useGravity();

  const handleTimerWorkerMessage = React.useCallback(() => {
    if (!piece.coord || isEmpty(piece.shape)) {
      return;
    }

    methods.moveDown();
  }, [piece.coord, piece.shape]);

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
    if (!isEmpty(piece.shape)) {
      methods.insertNewPiece();
    }
  }, [piece.id]);

  // At start only
  // React.useEffect(() => {
  //   if (state.nextPieces.length === 4) {
  //     methods.setNewPiece(state.nextPieces[0]);

  //     // old name for method, it now only remove first piece from nextPieces
  //     dispatch(pullCurrentPiece());
  //   }
  // }, [state.nextPieces]);

  // Methods
  function insertNewPiece(piece, grid = grid) {
    const newObj = Piece.insertion(piece, grid);
    if (newObj) {
      setPiece(newObj[1]);
      // setCoord(newObj[1].coord);
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
        return methods.moveDown();
      case "ArrowLeft":
        return methods.moveLateral(MOVE_LEFT);
      case "ArrowRight":
        return methods.moveLateral(MOVE_RIGHT);
      case "ArrowUp":
        return methods.rotation();
      case "Space":
        return methods.dropDown();
      default:
        return;
    }
  }

  // Tetris Actions
  function movePieceLateral(direction) {
    let newPiece = null;
    const cleanGrid = Grid.clear(grid);

    setPiece((oldPiece) => {
      newPiece = {
        ...oldPiece,
        coord: { ...oldPiece.coord, x: oldPiece.coord.x + direction },
      };
      if (canMove(cleanGrid, newPiece)) {
        return newPiece;
      }
      newPiece = null;
      return oldPiece;
    });

    if (newPiece !== null) {
      const newGrid = Piece.lateralMove(cleanGrid, newPiece);
      updateStateAfterMove([newGrid, newPiece]);
    }
  }

  function doHardDrop() {
    const newObj = Piece.hardDrop(grid, piece);

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

    setPiece((oldPiece) => {
      newPiece = {
        ...oldPiece,
        coord: { ...oldPiece.coord, y: oldPiece.coord.y + 1 },
      };
      if (canMove(cleanGrid, newPiece)) {
        return newPiece;
      }
      newPiece = null;
      return oldPiece;
    });

    if (newPiece === null) {
      const newObj = Grid.bind(cleanGrid, piece);
      updateStateAfterBind(newObj);
      return false;
    }
    const newGrid = Piece.softDrop(cleanGrid, newPiece);
    updateStateAfterMove([newGrid, newPiece]);
    return true;
  }

  function rotatePiece() {
    let newPiece = null;
    const cleanGrid = Grid.clear(grid);

    setPiece((oldPiece) => {
      const newShape = Piece.rotatePiece(oldPiece.shape);
      const newPadding = Piece.getPadding(newShape);
      const newDim = { width: oldPiece.dim.height, height: oldPiece.dim.width };

      newPiece = Piece.testMultiplePositions(
        { ...oldPiece, shape: newShape, padding: newPadding, dim: newDim },
        cleanGrid,
      );
      if (newPiece) {
        return newPiece;
      }
      newPiece = null;
      return oldPiece;
    });

    if (newPiece) {
      const newGrid = Piece.rotation(newPiece, cleanGrid);
      updateStateAfterMove([newGrid, newPiece]);
    }
  }

  return { movePiece };
}

export default useTetrisGame;

function canMove(grid, piece) {
  return Grid.Check.canPutLayer(grid, piece);
}
