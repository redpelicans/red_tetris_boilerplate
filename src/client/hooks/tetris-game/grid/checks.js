import { SHADOW_PIECE, CURRENT_PIECE, FREE } from "constants/tetris";

export function isPartOfPiece(element) {
  return element === CURRENT_PIECE;
}

export function isPartOfShadowPiece(element) {
  return element === SHADOW_PIECE;
}

export function isFree(element) {
  return element === FREE;
}

export function isBottomLine(grid, row) {
  return row === grid.length - 1;
}

export function isBottomBorder(grid, row) {
  return row === grid.length;
}

export function isNotAnEmptyRow(row) {
  return row.some((value) => value !== FREE && value !== SHADOW_PIECE);
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
      const [x, y] = [coord.x + col, coord.y + row];

      if (
        isPartOfPiece(shape[row][col]) &&
        (isBottomBorder(grid, y) || !isFree(grid[y][x]))
      ) {
        return false;
      }
    }
  }
  return true;
}
