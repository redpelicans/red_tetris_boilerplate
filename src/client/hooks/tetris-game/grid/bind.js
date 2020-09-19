import { COMBO } from "../constants";
import * as Check from "./checks";

function dropDownAllFollowingRows(grid, row) {
  for (let i = row; i > 0; i--) {
    grid[i] = grid[i - 1];
  }

  // Recreate the first row -- else it would be the same ref as the second
  grid[0] = Array(grid[0].length).fill(0);
}

function removeCompletedRows(grid) {
  let linesRemoved = 0;
  let row = grid.length - 1;

  while (row >= 0 && Check.isNotAnEmptyRow(grid[row])) {
    if (Check.isACompleteRow(grid[row])) {
      dropDownAllFollowingRows(grid, row);
      linesRemoved++;
    } else {
      row--;
    }
  }

  const additionalScore = COMBO[linesRemoved];

  return [grid, additionalScore];
}

function bind(grid, piece) {
  const { shape, padding, coord } = piece;

  const colLength = shape[0].length;
  const rowLength = shape.length;

  for (let col = padding.x; col < colLength; col++) {
    for (let row = padding.y; row < rowLength; row++) {
      if (Check.isPartOfPiece(shape[row][col])) {
        grid[coord.y + row][coord.x + col] = piece.color;
      }
    }
  }

  const [newGridAfterScore, additionalScore] = removeCompletedRows(grid);
  return [newGridAfterScore, additionalScore];
}

export default bind;
