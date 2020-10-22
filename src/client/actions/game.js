export const SET_PLAYER_IS_ALIVE = "SET_PLAYER_IS_ALIVE";
export const SET_SCORE = "SET_SCORE";
export const INCREASE_SPEED_RATE = "INCREASE_SPEED_RATE";
export const INCREASE_ROWS_REMOVED = "INCREASE_ROWS_REMOVED";

export const setPlayerIsAlive = (alive) => ({
  type: SET_PLAYER_IS_ALIVE,
  alive,
});

export const addScore = (score) => ({
  type: SET_SCORE,
  score,
});

export const inscreaseRowsRemoved = (nbRowsRemoved) => ({
  type: INCREASE_ROWS_REMOVED,
  increment: nbRowsRemoved,
});
