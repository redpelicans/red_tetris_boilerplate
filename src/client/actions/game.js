export const FETCH_PIECES = "FETCH_PIECES";
export const PULL_CURRENT_PIECE_FROM_NEXT_PIECES =
  "PULL_CURRENT_PIECE_FROM_NEXT_PIECES";
export const UPDATE_GRID = "UPDATE_GRID";
export const UPDATE_CURRENT_PIECE = "UPDATE_CURRENT_PIECE";
export const SET_PLAYER_IS_ALIVE = "SET_PLAYER_IS_ALIVE";
export const SET_SCORE = "SET_SCORE";
export const INCREASE_SPEED_RATE = "INCREASE_SPEED_RATE";

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

export const updateCurrentPiece = (newPiece) => ({
  type: UPDATE_CURRENT_PIECE,
  newPiece,
});

export const setPlayerIsAlive = (alive) => ({
  type: SET_PLAYER_IS_ALIVE,
  alive,
});

export const addScore = (score) => ({
  type: SET_SCORE,
  score,
});

export const increaseSpeedRate = (nbRowsRemoved) => ({
  type: INCREASE_SPEED_RATE,
  increment: nbRowsRemoved * 0.025,
});
