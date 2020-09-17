import { shallowCopy } from "helpers/functional";

const FREE = 0;
const CURRENT_PIECE = 1;
const COMBO = {
  0: 0,
  1: 100,
  2: 300,
  3: 500,
  4: 800,
};

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

function removeCompletedRows(grid) {
  function isNotAnEmptyRow(row) {
    return row.some((value) => value !== 0);
  }

  function isACompleteRow(row) {
    return row.every((value) => value !== 0);
  }

  function dropDownAllFollowingRows(grid, row) {
    for (let i = row; i > 0; i--) {
      grid[i] = grid[i - 1];
    }

    // Recreate the first row -- else it would be the same ref as the second
    grid[0] = Array(grid[0].length).fill(0);
  }

  let linesRemoved = 0;
  let row = grid.length - 1;
  while (isNotAnEmptyRow(grid[row])) {
    if (isACompleteRow(grid[row])) {
      dropDownAllFollowingRows(grid, row);
      linesRemoved++;
    } else {
      row--;
    }
  }

  const additionalScore = COMBO[linesRemoved];

  return [grid, additionalScore];
}

export function bindPieceToGrid(grid, piece) {
  const newGrid = grid.map((row) =>
    row.map((col) => (col === CURRENT_PIECE ? piece.color : col)),
  );
  const [newGridAfterScore, additionalScore] = removeCompletedRows(newGrid);
  return [newGridAfterScore, additionalScore];
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
