export const SET_PLAYER_RESPONSE = "SET_PLAYER_RESPONSE";
export const SET_PLAYER = "SET_PLAYER";
export const SET_PLAYERS = "SET_PLAYERS";
export const SET_LOBBIES = "SET_LOBBIES";
export const SET_LOBBIES_RESPONSE = "SET_LOBBIES_RESPONSE";
export const SET_LOBBY = "SET_LOBBY";
export const SET_LOBBY_RESPONSE = "SET_LOBBY_RESPONSE";
export const ADD_MESSAGE = "ADD_MESSAGE";
export const RESET_MESSAGES = "RESET_MESSAGES";
export const SET_GAME_STARTED = "SET_GAME_STARTED";

export const setPlayerResponse = (playerResponse) => ({
  type: SET_PLAYER_RESPONSE,
  playerResponse,
});

export const setPlayer = (player) => ({
  type: SET_PLAYER,
  player,
});

export const setPlayers = (players) => ({
  type: SET_PLAYERS,
  players,
});

export const setLobbies = (lobbies) => ({
  type: SET_LOBBIES,
  lobbies,
});

export const setLobbiesResponse = (lobbiesResponse) => ({
  type: SET_LOBBIES_RESPONSE,
  lobbiesResponse,
});

export const setLobby = (lobby) => ({
  type: SET_LOBBY,
  lobby,
});

export const setLobbyResponse = (lobbyResponse) => ({
  type: SET_LOBBY_RESPONSE,
  lobbyResponse,
});

export const addMessage = (message) => ({
  type: ADD_MESSAGE,
  message,
});

export const resetMessages = () => ({
  type: RESET_MESSAGES,
});

export const setGameStarted = (game) => ({
  type: SET_GAME_STARTED,
  game,
});
