import { CURRENT_PIECE, FREE } from "../constants";

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

export function isNotAnEmptyRow(row) {
  return row.some((value) => value !== 0);
}

export function isACompleteRow(row) {
  return row.every((value) => value !== 0);
}

export function canPutLayer(grid, piece) {
  const { shape, padding, coord, dim } = piece;

  if (coord.y + dim.height > grid.length) {
    return false;
  }

  const colLength = padding.x + dim.width;
  const rowLength = padding.y + dim.height;

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
