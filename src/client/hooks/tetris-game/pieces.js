import { shallowCopy } from "helpers/functional";
import * as Grid from "./grid";

export function insertPiece(piece, grid, midGrid) {
  const gridCopy = shallowCopy(grid);
  const insertPos =
    midGrid - Math.ceil((piece.shape[0].length - piece.padding.x) / 2);
  const newPiece = {
    ...piece,
    coord: { x: insertPos, y: 0 - piece.padding.y },
  };
  const { shape, padding, coord } = newPiece;

  if (!Grid.canPutLayer(grid, newPiece)) {
    return null;
  }

  const colLength = shape[0].length - padding.x;
  const rowLength = shape.length - padding.y;
  for (let col = padding.x; col < colLength; col++) {
    for (let row = padding.y; row < rowLength; row++) {
      if (Grid.isPartOfPiece(shape[row][col])) {
        gridCopy[row - padding.y][coord.x + col - padding.x] = shape[row][col];
      }
    }
  }
  return [gridCopy, newPiece];
}

export function moveDown(grid, colLength, rowLength, piece) {
  const gridCopy = shallowCopy(grid);
  const newPiece = {
    ...piece,
    coord: { ...piece.coord, y: piece.coord.y + 1 },
  };

  const check = Grid.canPutLayer(gridCopy, newPiece);
  if (!check) {
    return null;
  }

  const upperRowLimit = piece.coord.y >= 0 ? piece.coord.y : 0;
  for (let col = piece.coord.x; col < colLength; col++) {
    for (let row = rowLength - 1; row >= upperRowLimit; row--) {
      if (Grid.isPartOfPiece(gridCopy[row][col])) {
        gridCopy[row][col] = 0;
        gridCopy[row + 1][col] = 1;
      }
    }
  }
  return [gridCopy, newPiece];
}

export function putTetromino(tetromino, grid) {
  const gridCopy = shallowCopy(grid);

  return gridCopy.map((row) =>
    row.map((col) => (col === 1 ? tetromino.color : col)),
  );
}

function rotate(piece) {
  return piece[0].map((_, colIndex) =>
    piece.map((row) => row[colIndex]).reverse(),
  );
}
