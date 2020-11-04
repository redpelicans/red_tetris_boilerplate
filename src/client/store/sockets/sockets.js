import socketIOClient from "socket.io-client";
import { PLAYER } from "../../../config/actions/player";
import { LOBBY } from "../../../config/actions/lobby";
import { LOBBIES } from "../../../config/actions/lobbies";
import { PIECE } from "../../../config/actions/piece";
import { MESSAGE } from "../../../config/actions/message";
import { PLAYERS } from "../../../config/actions/players";
import { GAME } from "../../../config/actions/game";

import {
  setPlayerResponse,
  setPlayers,
  setLobbies,
  setLobbiesResponse,
  setLobby,
  setLobbyResponse,
  addMessage,
  setNextPieces,
  setGameStarted,
  setScore,
  setBoard,
  setLoser,
  setWinner,
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

  socket.on(LOBBY.STARTED, (data) => {
    dispatch(setGameStarted(data));
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

  socket.on(GAME.GET_SCORE, (data) => {
    dispatch(setScore(data));
  });

  socket.on(GAME.GET_BOARD, (data) => {
    dispatch(setBoard(data));
  });

  socket.on(GAME.GET_LOSE, (data) => {
    dispatch(setLoser(data));
  });

  socket.on(GAME.WINNER, (data) => {
    dispatch(setWinner(data));
  });
}

export function initSocket() {
  return socketIOClient(endpoint);
}
