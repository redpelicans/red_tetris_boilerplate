export const SET_PLAYER_IS_ALIVE = "SET_PLAYER_IS_ALIVE";
export const SET_GAME = "SET_GAME";
export const SET_SCORE = "SET_SCORE";
export const SET_BOARD = "SET_BOARD";
export const SET_LOSER = "SET_LOSER";
export const SET_WINNER = "SET_WINNER";
export const SET_PENALTY = "SET_PENALTY";
export const SET_NEXT_PIECES = "SET_NEXT_PIECES";

export const setPlayerIsAlive = (alive) => ({
  type: SET_PLAYER_IS_ALIVE,
  alive,
});

export const setGame = (game) => ({
  type: SET_GAME,
  game,
});

export const setScore = (payload) => ({
  type: SET_SCORE,
  score: payload.score,
  playerId: payload.playerId,
});

export const setBoard = (payload) => ({
  type: SET_BOARD,
  board: payload.boardGame,
  playerId: payload.playerId,
});

export const setLoser = (payload) => ({
  type: SET_LOSER,
  playerId: payload.playerId,
});

export const setWinner = (payload) => ({
  type: SET_WINNER,
  winner: payload.winner,
});

export const setPenalty = (payload) => ({
  type: SET_PENALTY,
  nbLinePenalty: payload.nbLinePenalty,
  playerId: payload.playerId,
});

export const setNextPieces = (pieces) => ({
  type: SET_NEXT_PIECES,
  pieces,
});
