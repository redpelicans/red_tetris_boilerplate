import {
  SHADOW_PIECE,
  CURRENT_PIECE,
  FREE,
  BLOCKED_PIECE,
} from "constants/tetris";

export function isPartOfPiece(element) {
  return element === CURRENT_PIECE;
}

export function isPartOfShadowPiece(element) {
  return element === SHADOW_PIECE;
}

export function isFree(element) {
  return element === FREE;
}

export function isBlocked(element) {
  return element === BLOCKED_PIECE;
}

export function isBottomLine(grid, row) {
  return row === grid.length - 1;
}

export function isBottomBorder(grid, row) {
  return row === grid.length;
}

export function isAnEmptyRow(row) {
  return row.every((value) => isFree(value) || isPartOfShadowPiece(value));
}

export function isNotAnEmptyRow(row) {
  return row.some((value) => !isFree(value) && !isPartOfShadowPiece(value));
}

export function isACompleteRow(row) {
  return row.every(
    (value) =>
      !isFree(value) && !isPartOfShadowPiece(value) && !isBlocked(value),
  );
}

function isPieceInArrayBoundaries(grid, piece) {
  const { coord, padding, dim } = piece;

  if (coord.x + padding.x < 0) {
    return false;
  }

  if (coord.y + padding.y < 0) {
    return false;
  }

  if (coord.y + dim.height + padding.y > grid.length) {
    return false;
  }

  if (coord.x + dim.width + padding.x > grid[0].length) {
    return false;
  }

  return true;
}

export function canPutLayer(grid, piece) {
  const { shape, padding, coord, dim } = piece;

  if (!isPieceInArrayBoundaries(grid, piece)) {
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

export function distanceFromTop(grid) {
  let distance = 0;

  for (let row = 0; row < grid.length && isAnEmptyRow(grid[row]); row++) {
    distance++;
  }
  return distance;
}
