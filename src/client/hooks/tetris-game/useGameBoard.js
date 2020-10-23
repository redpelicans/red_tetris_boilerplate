import React from "react";
import * as Grid from "./grid";
import * as Insert from "./pieces/insertion";
import * as Shadow from "./pieces/shadow";
import * as SoftDrop from "./pieces/softDrop";
import * as HardDrop from "./pieces/hardDrop";
import * as Rotation from "./pieces/rotation";
import * as LatMove from "./pieces/lateralMove";

const initialState = {
  grid: [],
  piece: {
    id: null,
    shape: [],
    color: "",
    padding: { x: 0, y: 0 },
    coord: { x: 0, y: 0 },
    dim: { height: 0, width: 0 },
  },
};

/*
 ** This hook manage relations between pieces and grid
 */

function useGameBoard(
  cols,
  rows,
  gameOver,
  pullNextPiece,
  addScore,
  addRemovedLines,
) {
  const [gameBoard, setGameBoard] = React.useState(() => ({
    ...initialState,
    grid: Grid.create(cols, rows),
  }));
  const pieceId = React.useRef(0);

  React.useEffect(() => {
    const pieceFromStash = pullNextPiece();

    setGameBoard({
      ...gameBoard,
      piece: { ...pieceFromStash, id: pieceId.current++ },
    });
  }, []);

  React.useEffect(() => {
    if (gameBoard.piece.id !== null) {
      insertNewPiece();
    }
  }, [gameBoard.piece.id]);

  const insertNewPiece = React.useCallback(() => {
    const newPiece = Insert.getNewPiece(gameBoard.piece, gameBoard.grid);

    if (canPut(gameBoard.grid, newPiece)) {
      const newGrid = Insert.default(newPiece, gameBoard.grid);
      const newGridWithShadow = Shadow.default(newGrid, newPiece);
      setGameBoard({ ...gameBoard, grid: newGridWithShadow, piece: newPiece });
    } else {
      const newGrid = Insert.force(newPiece, gameBoard.grid);
      setGameBoard({ ...gameBoard, grid: newGrid, piece: newPiece });
      gameOver();
    }
  }, [gameBoard.piece.id]);

  const moveLateral = React.useCallback((direction) => {
    setGameBoard((oldState) => {
      const cleanGrid = Grid.clear(oldState.grid);
      const newPiece = LatMove.getNewPiece(oldState.piece, direction);

      if (canPut(cleanGrid, newPiece)) {
        const newGrid = LatMove.default(cleanGrid, newPiece);
        const newGridWithShadow = Shadow.default(newGrid, newPiece);
        return { ...oldState, grid: newGridWithShadow, piece: newPiece };
      }

      return oldState;
    });
  }, []);

  const moveDown = React.useCallback(
    (manuallyTriggered) => {
      setGameBoard((oldState) => {
        const cleanGrid = Grid.clear(oldState.grid);
        const newPiece = SoftDrop.getNewPiece(oldState.piece);

        if (canPut(cleanGrid, newPiece)) {
          const newGrid = SoftDrop.default(cleanGrid, newPiece);
          const newGridWithShadow = Shadow.default(newGrid, newPiece);
          if (manuallyTriggered) {
            addScore(1);
          }

          return { ...oldState, grid: newGridWithShadow, piece: newPiece };
        }

        const newGrid = Grid.bind(
          cleanGrid,
          oldState.piece,
          addScore,
          addRemovedLines,
        );
        const nextPiece = pullNextPiece();
        return {
          ...oldState,
          grid: newGrid,
          piece: { ...nextPiece, id: pieceId.current++ },
        };
      });
    },
    [gameBoard.piece.id],
  );

  const dropDown = React.useCallback(() => {
    setGameBoard((oldState) => {
      const cleanGrid = Grid.clear(oldState.grid);
      const newPiece = HardDrop.getNewPiece(cleanGrid, oldState.piece);

      if (canPut(cleanGrid, newPiece)) {
        addScore((newPiece.coord.y - oldState.piece.coord.y) * 2);

        const newGrid = Grid.bind(
          cleanGrid,
          newPiece,
          addScore,
          addRemovedLines,
        );
        const nextPiece = pullNextPiece();
        return {
          ...oldState,
          grid: newGrid,
          piece: { ...nextPiece, id: pieceId.current++ },
        };
      }
      return oldState;
    });
  }, [gameBoard.piece.id]);

  const rotation = React.useCallback(() => {
    setGameBoard((oldState) => {
      if (!("coord" in oldState.piece)) {
        return oldState;
      }

      const cleanGrid = Grid.clear(oldState.grid);
      const newPiece = Rotation.getNewPiece(oldState.piece, cleanGrid);

      if (newPiece && canPut(cleanGrid, newPiece)) {
        const newGrid = Rotation.default(newPiece, cleanGrid);
        const newGridWithShadow = Shadow.default(newGrid, newPiece);
        return { ...oldState, grid: newGridWithShadow, piece: newPiece };
      }

      return oldState;
    });
  }, []);

  return {
    grid: gameBoard.grid,
    piece: gameBoard.piece,
    insertNewPiece,
    moveLateral,
    moveDown,
    dropDown,
    rotation,
  };
}

export default useGameBoard;

function canPut(grid, piece) {
  return Grid.Check.canPutLayer(grid, piece);
}
