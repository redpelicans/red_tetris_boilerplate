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
