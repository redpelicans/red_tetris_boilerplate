export const FETCH_PIECES = "FETCH_PIECES";
export const PULL_CURRENT_PIECE_FROM_NEXT_PIECES =
  "PULL_CURRENT_PIECE_FROM_NEXT_PIECES";
export const UPDATE_GRID = "UPDATE_GRID";

export const pushNewPiece = (newPieces) => ({
  type: FETCH_PIECES,
  newPieces,
});

export const updateCurrentPiece = () => ({
  type: PULL_CURRENT_PIECE_FROM_NEXT_PIECES,
});

export const updateGrid = (newGrid) => ({
  type: UPDATE_GRID,
  newGrid,
});
