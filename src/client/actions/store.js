export const SET_PLAYER_RESPONSE = "SET_PLAYER_RESPONSE";
export const SET_PLAYER = "SET_PLAYER";
export const SET_PLAYERS = "SET_PLAYERS";
export const SET_LOBBIES = "SET_LOBBIES";
export const SET_LOBBIES_RESPONSE = "SET_LOBBIES_RESPONSE";
export const SET_LOBBY = "SET_LOBBY";
export const SET_LOBBY_RESPONSE = "SET_LOBBY_RESPONSE";
export const ADD_MESSAGE = "ADD_MESSAGE";
export const RESET_MESSAGES = "RESET_MESSAGES";
export const SET_NEXT_PIECES = "SET_NEXT_PIECES";
export const SET_GAME_STARTED = "SET_GAME_STARTED";
export const SET_SCORE = "SET_SCORE";
export const SET_BOARD = "SET_BOARD";
export const SET_LOSER = "SET_LOSER";
export const SET_WINNER = "SET_WINNER";
export const SET_PENALTY = "SET_PENALTY";

export const setPlayerResponse = (playerResponse) => ({
  type: SET_PLAYER_RESPONSE,
  playerResponse: playerResponse,
});

export const setPlayer = (player) => ({
  type: SET_PLAYER,
  player: player,
});

export const setPlayers = (players) => ({
  type: SET_PLAYERS,
  players: players,
});

export const setLobbies = (lobbies) => ({
  type: SET_LOBBIES,
  lobbies: lobbies,
});

export const setLobbiesResponse = (lobbiesResponse) => ({
  type: SET_LOBBIES_RESPONSE,
  lobbiesResponse: lobbiesResponse,
});

export const setLobby = (lobby) => ({
  type: SET_LOBBY,
  lobby: lobby,
});

export const setLobbyResponse = (lobbyResponse) => ({
  type: SET_LOBBY_RESPONSE,
  lobbyResponse: lobbyResponse,
});

export const addMessage = (message) => ({
  type: ADD_MESSAGE,
  message: message,
});

export const resetMessages = () => ({
  type: RESET_MESSAGES,
});

export const setNextPieces = (pieces) => ({
  type: SET_NEXT_PIECES,
  pieces: pieces,
});

export const setGameStarted = (game) => ({
  type: SET_GAME_STARTED,
  game: game,
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
