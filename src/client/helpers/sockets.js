import socketIOClient from "socket.io-client";
import { PLAYER } from "../../config/actions/player";
import { LOBBY } from "../../config/actions/lobby";
import { LOBBIES } from "../../config/actions/lobbies";
import { PIECE } from "../../config/actions/piece";

import {
  setPlayerResponse,
  setPlayers,
  setLobbies,
  setLobbiesResponse,
  setLobby,
} from "actions/store";

const endpoint = "http://0.0.0.0:3004";

export function setupSocket(socket, dispatch) {
  socket.on(PLAYER.RESPONSE, (data) => {
    dispatch(setPlayerResponse(data.response));
  });
  socket.on(LOBBIES.PUBLISH, (data) => {
    dispatch(setLobbies(data.lobbies));
  });
  socket.on(LOBBIES.RESPONSE, (data) => {
    dispatch(setLobbiesResponse(data.response));
  });
  socket.on(LOBBY.RESPONSE, (data) => {
    dispatch(setLobbyResponse(data.response));
  });
  socket.on(LOBBY.PUBLISH, (data) => {
    dispatch(setLobby(data.lobby));
  });
  socket.on("players:publish", (data) => {
    dispatch(setPlayers(data.players));
  });
  socket.on(PIECE.SEND, (data) => {});
}

export function initSocket() {
  const socket = socketIOClient(endpoint);
  return socket;
}
