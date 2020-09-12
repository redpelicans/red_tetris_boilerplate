import { deepCopy } from "helpers/functional";
import { isFree, isBottomLine } from "./grid";

// TODO: check if the piece can be inserted
export function insertPiece(piece, grid, insertPos) {
  const gridCopy = deepCopy(grid);

  piece[0].map((_, colIdx) =>
    piece.map(
      (_, rowIdx) =>
        (gridCopy[rowIdx][insertPos + colIdx] = piece[rowIdx][colIdx]),
    ),
  );
  return gridCopy;
}

function isPartOfPiece(element) {
  return element === 1;
}

function canMove(grid, colLength) {
  let canMoveDown = true;

  for (let col = 0; col < colLength; col++) {
    for (let row = 0; row < grid.length; row++) {
      if (
        isPartOfPiece(grid[row][col]) &&
        (isBottomLine(grid, row) || !isFree(grid, row, col))
      ) {
        canMoveDown = false;
      }
    }
  }
  return canMoveDown;
}

export function moveDown(grid, colLength) {
  const gridCopy = deepCopy(grid);

  if (!canMove(gridCopy, colLength)) {
    return null;
  }

  for (let col = 0; col < colLength; col++) {
    for (let row = gridCopy.length - 1; row >= 0; row--) {
      if (isPartOfPiece(gridCopy[row][col])) {
        gridCopy[row][col] = 0;
        gridCopy[row + 1][col] = 1;
      }
    }
  }
  return gridCopy;
}
