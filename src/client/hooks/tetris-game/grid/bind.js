import { CURRENT_PIECE, COMBO } from "../constants";
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

  while (Check.isNotAnEmptyRow(grid[row])) {
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
  const newGrid = grid.map((row) =>
    row.map((col) => (col === CURRENT_PIECE ? piece.color : col)),
  );
  const [newGridAfterScore, additionalScore] = removeCompletedRows(newGrid);
  return [newGridAfterScore, additionalScore];
}

export default bind;
