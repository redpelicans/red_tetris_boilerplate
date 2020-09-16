import { shallowCopy } from "helpers/functional";

const FREE = 0;
const CURRENT_PIECE = 1;

export function isPartOfPiece(element) {
  return element === CURRENT_PIECE;
}

export function isFree(grid, row, col) {
  return grid[row][col] === FREE;
}

export function isBottomLine(grid, row) {
  return row === grid.length - 1;
}

export function isBorderBottom(grid, row) {
  return row === grid.length;
}

export function canPutLayer(grid, piece) {
  const { shape, padding, coord, dim } = piece;

  if (coord.y + dim.height > grid.length) {
    return false;
  }

  const colLength = shape[0].length;
  const rowLength = shape.length;

  for (let col = padding.x; col < colLength; col++) {
    for (let row = padding.y; row < rowLength; row++) {
      if (
        isPartOfPiece(shape[row][col]) &&
        (isBorderBottom(grid, coord.y + row) ||
          !isFree(grid, coord.y + row, coord.x + col))
      ) {
        return false;
      }
    }
  }
  return true;
}

export function bindPieceToGrid(grid, piece) {
  return grid.map((row) =>
    row.map((col) => (col === CURRENT_PIECE ? piece.color : col)),
  );
}

export function clearPieceFromGrid(grid) {
  return grid.map((row) =>
    row.map((col) => (col === CURRENT_PIECE ? FREE : col)),
  );
}

export function writePieceInGrid(grid, piece) {
  const { shape, padding, coord } = piece;
  const newGrid = shallowCopy(grid);

  const colLength = shape[0].length;
  const rowLength = shape.length;

  for (let col = padding.x; col < colLength; col++) {
    for (let row = padding.y; row < rowLength; row++) {
      if (isPartOfPiece(shape[row][col])) {
        newGrid[coord.y + row][coord.x + col] = CURRENT_PIECE;
      }
    }
  }
  return newGrid;
}
