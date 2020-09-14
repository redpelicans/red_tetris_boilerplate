export const INIT_SOCKET = "INIT_SOCKET";
export const SET_PLAYER_RESPONSE = "SET_PLAYER_RESPONSE";

export const initSocket = (socket) => ({
  type: INIT_SOCKET,
  socket: socket,
});

export const setPlayerResponse = (playerResponse) => ({
  type: SET_PLAYER_RESPONSE,
  playerResponse: playerResponse,
});
