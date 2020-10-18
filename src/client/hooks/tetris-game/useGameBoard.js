import React from "react";
import { deepCopy } from "helpers/functional";
import * as Grid from "./grid";
import * as Piece from "./pieces";

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

function useGameBoard(cols, rows, gameOver, pullNextPiece) {
  const [gameBoard, setGameBoard] = React.useState(() => ({
    ...initialState,
    grid: Grid.create(cols, rows),
  }));
  const pieceId = React.useRef(0);

  React.useEffect(() => {
    const pieceFromStash = pullNextPiece();

    setGameBoard({
      ...gameBoard,
      piece: { ...deepCopy(pieceFromStash), id: pieceId.current++ },
    });
  }, []);

  function insertNewPiece() {
    const newPiece = Piece.getNewInsertedPiece(gameBoard.piece, gameBoard.grid);

    if (canPut(gameBoard.grid, newPiece)) {
      const newGrid = Piece.insertion(newPiece, gameBoard.grid);
      const newPieceShadow = Piece.getNewShadowPiece(newGrid, newPiece);
      const newGridWithShadow = Piece.shadow(newGrid, newPieceShadow);
      setGameBoard({ ...gameBoard, grid: newGridWithShadow, piece: newPiece });
    } else {
      const newGrid = Piece.forceInsertion(newPiece, gameBoard.grid);
      setGameBoard({ ...gameBoard, grid: newGrid, piece: newPiece });
      gameOver();
    }
  }

  function moveLateral(direction) {
    setGameBoard((oldState) => {
      const cleanGrid = Grid.clear(oldState.grid);
      const newPiece = Piece.getNewLateralMovedPiece(oldState.piece, direction);

      if (canPut(cleanGrid, newPiece)) {
        const newGrid = Piece.lateralMove(cleanGrid, newPiece);
        const newGridWithShadow = Piece.shadow(newGrid, newPiece);
        return { ...oldState, grid: newGridWithShadow, piece: newPiece };
      }

      return oldState;
    });
  }

  function moveDown() {
    setGameBoard((oldState) => {
      const cleanGrid = Grid.clear(oldState.grid);
      const newPiece = Piece.getNewDownMovedPiece(oldState.piece);

      if (canPut(cleanGrid, newPiece)) {
        const newGrid = Piece.softDrop(cleanGrid, newPiece);
        const newGridWithShadow = Piece.shadow(newGrid, newPiece);
        return { ...oldState, grid: newGridWithShadow, piece: newPiece };
      }

      const newGrid = Grid.bind(cleanGrid, oldState.piece);
      const nextPiece = pullNextPiece();
      return {
        ...oldState,
        grid: newGrid,
        piece: { ...deepCopy(nextPiece), id: pieceId.current++ },
      };
    });
  }

  function dropDown() {
    setGameBoard((oldState) => {
      const cleanGrid = Grid.clear(oldState.grid);
      const newPiece = Piece.getNewDropPiece(cleanGrid, oldState.piece);

      if (canPut(cleanGrid, newPiece)) {
        const newGrid = Grid.bind(cleanGrid, newPiece);
        const nextPiece = pullNextPiece();
        return {
          ...oldState,
          grid: newGrid,
          piece: { ...deepCopy(nextPiece), id: pieceId.current++ },
        };
      }

      return oldState;
    });
  }

  function rotation() {
    setGameBoard((oldState) => {
      const cleanGrid = Grid.clear(oldState.grid);
      const newPiece = Piece.getNewRotatePiece(oldState.piece, cleanGrid);

      if (newPiece && canPut(cleanGrid, newPiece)) {
        const newGrid = Piece.rotation(newPiece, cleanGrid);
        const newGridWithShadow = Piece.shadow(newGrid, newPiece);
        return { ...oldState, grid: newGridWithShadow, piece: newPiece };
      }

      return oldState;
    });
  }

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
