import { LOBBY } from "../../../config/actions/lobby";
import { LOBBIES } from "../../../config/actions/lobbies";
import { MESSAGE } from "../../../config/actions/message";
import { PLAYERS } from "../../../config/actions/players";

import {
  setPlayers,
  setLobbies,
  setLobbiesResponse,
  setLobby,
  setLobbyResponse,
  addMessage,
  setGameStarted,
} from "actions/store";

export function setupSocketRooms(socket, dispatch) {
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

  socket.on(LOBBY.STARTED, (data) => {
    dispatch(setGameStarted(data));
  });

  socket.on(PLAYERS.PUBLISH, (data) => {
    dispatch(setPlayers(data));
  });

  socket.on(MESSAGE.PUBLISH, (data) => {
    dispatch(addMessage(data));
  });
}

export function removeSocketRooms(socket, dispatch) {
  socket.off(LOBBIES.PUBLISH);
  socket.off(LOBBIES.RESPONSE);
  socket.off(LOBBY.RESPONSE);
  socket.off(LOBBY.PUBLISH);
  socket.off(LOBBY.STARTED);
  socket.off(PLAYERS.PUBLISH);
  socket.off(MESSAGE.PUBLISH);
}
