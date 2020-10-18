import { COMBO_SCORE } from "constants/tetris";
import * as Check from "./checks";
import write from "./write";

function dropDownAllFollowingRows(grid, row) {
  for (let i = row; i > 0; i--) {
    grid[i] = grid[i - 1];
  }

  // Recreate the first row -- else it would be the same ref as the second
  grid[0] = Array(grid[0].length).fill(0);
}

function removeCompletedRows(grid, addScore, addRemovedLines) {
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

  if (linesRemoved > 0) {
    addRemovedLines(linesRemoved);
    addScore(COMBO_SCORE[linesRemoved]);
  }

  return grid;
}

function bind(grid, piece, addScore, addRemovedLines) {
  const newGrid = write(grid, piece, piece.color);
  removeCompletedRows(newGrid, addScore, addRemovedLines);
  return newGrid;
}

export default bind;
