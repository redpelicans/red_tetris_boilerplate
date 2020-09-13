export function isFree(grid, row, col) {
  return [0, 1].includes(grid[row + 1][col]);
}

export function isBottomLine(grid, row) {
  return row === grid.length - 1;
}
