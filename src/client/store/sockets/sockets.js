import socketIOClient from "socket.io-client";
import { PLAYER } from "../../../config/actions/player";
import { LOBBY } from "../../../config/actions/lobby";
import { LOBBIES } from "../../../config/actions/lobbies";
import { PIECE } from "../../../config/actions/piece";
import { MESSAGE } from "../../../config/actions/message";
import { PLAYERS } from "../../../config/actions/players";

import {
  setPlayerResponse,
  setPlayers,
  setLobbies,
  setLobbiesResponse,
  setLobby,
  setLobbyResponse,
  addMessage,
  setNextPieces,
} from "actions/store";

const endpoint = "http://0.0.0.0:3004";

export function setupSocket(socket, dispatch) {
  socket.on(LOBBIES.PUBLISH, (data) => {
    dispatch(setLobbies(data));
  });

  socket.on(LOBBIES.RESPONSE, (data) => {
    dispatch(setLobbiesResponse(data));
  });

  socket.on(LOBBY.RESPONSE, (data) => {
    dispatch(setLobbyResponse(data));
  });

  socket.on(LOBBY.PUBLISH, (data) => {
    dispatch(setLobby(data));
  });

  socket.on(PLAYERS.PUBLISH, (data) => {
    dispatch(setPlayers(data));
  });

  socket.on(MESSAGE.PUBLISH, (data) => {
    dispatch(addMessage(data));
  });

  socket.on(PIECE.SEND, (data) => {
    dispatch(setNextPieces(data));
  });
}

export function initSocket() {
  return socketIOClient(endpoint);
}
