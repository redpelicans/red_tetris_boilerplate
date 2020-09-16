export function isPartOfPiece(element) {
  return element === 1;
}

export function isFree(grid, row, col) {
  return [0, 1].includes(grid[row][col]);
}

export function isBottomLine(grid, row) {
  return row === grid.length - 1;
}

export function isBorderBottom(grid, row) {
  return row === grid.length;
}

export function canPutLayer(grid, piece) {
  const { shape, padding, coord } = piece;

  const colLength = shape[0].length - padding.x;
  const rowLength = shape.length - padding.y;

  for (let col = padding.x; col < colLength; col++) {
    for (let row = padding.y; row < rowLength; row++) {
      if (isPartOfPiece(shape[row][col])) {
        if (isBorderBottom(grid, coord.y + row)) {
          return false;
        }
        if (!isFree(grid, coord.y + row, coord.x + col)) {
          return false;
        }
      }
    }
  }
  return true;
}
