import * as Grid from "./grid";

export function insertPiece(piece, grid, midGrid) {
  const insertPos =
    midGrid - Math.ceil((piece.shape[0].length - piece.padding.x) / 2);
  const newPiece = {
    ...piece,
    coord: { x: insertPos, y: 0 - piece.padding.y },
  };

  if (!Grid.canPutLayer(grid, newPiece)) {
    return null;
  }

  const gridCopy = Grid.writePieceInGrid(grid, newPiece);
  return [gridCopy, newPiece];
}

export function moveDown(grid, piece) {
  const newPiece = {
    ...piece,
    coord: { ...piece.coord, y: piece.coord.y + 1 },
  };

  const cleanGrid = Grid.clearPieceFromGrid(grid);
  if (!Grid.canPutLayer(cleanGrid, newPiece)) {
    return null;
  }

  const newGrid = Grid.writePieceInGrid(cleanGrid, newPiece);
  return [newGrid, newPiece];
}

function rotation(piece) {
  return piece[0].map((_, colIndex) =>
    piece.map((row) => row[colIndex]).reverse(),
  );
}

function getPadding(shape) {
  const getPaddingTop = () => {
    for (let row = 0; row < shape.length; row++) {
      if (!shape[row].every((col) => col === 0)) {
        return row;
      }
    }
  };

  const getPaddingLeft = () => {
    for (let col = 0; col < shape[0].length; col++) {
      if (!shape.every((_, rowIndex) => shape[rowIndex][col] === 0)) {
        return col;
      }
    }
  };

  return { x: getPaddingLeft(), y: getPaddingTop() };
}

export function rotatePiece(piece, grid) {
  const newShape = rotation(piece.shape);
  const newPadding = getPadding(newShape);
  const newPiece = {
    ...piece,
    shape: newShape,
    padding: newPadding,
    dim: { width: piece.dim.height, height: piece.dim.width },
  };

  const cleanGrid = Grid.clearPieceFromGrid(grid);
  if (!Grid.canPutLayer(cleanGrid, newPiece)) {
    return null;
  }

  const newGrid = Grid.writePieceInGrid(cleanGrid, newPiece);
  return [newGrid, newPiece];
}
