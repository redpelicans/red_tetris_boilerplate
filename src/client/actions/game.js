export const FETCH_PIECES = "FETCH_PIECES";
export const PULL_CURRENT_PIECE_FROM_NEXT_PIECES =
  "PULL_CURRENT_PIECE_FROM_NEXT_PIECES";
export const UPDATE_GRID = "UPDATE_GRID";

export const pushNewPiece = (newPieces) => ({
  type: FETCH_PIECES,
  newPieces,
});

let autoIncrementId = 0;
export const pullCurrentPiece = () => ({
  type: PULL_CURRENT_PIECE_FROM_NEXT_PIECES,
  id: autoIncrementId++,
});

export const updateGrid = (newGrid) => ({
  type: UPDATE_GRID,
  newGrid,
});
