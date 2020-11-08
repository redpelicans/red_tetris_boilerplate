import socketIOClient from "socket.io-client";
import { PLAYER } from "../../../config/actions/player";
import { LOBBY } from "../../../config/actions/lobby";
import { LOBBIES } from "../../../config/actions/lobbies";
import { PIECE } from "../../../config/actions/piece";
import { MESSAGE } from "../../../config/actions/message";
import { PLAYERS } from "../../../config/actions/players";
import { GAME } from "../../../config/actions/game";

const host = process.env.REACT_APP_BACK_HOST || "0.0.0.0";
const port = process.env.REACT_APP_BACK_PORT || "3004";
const endpoint = `${host}:${port}`;

export const socket = socketIOClient(endpoint);

import {
  setPlayerResponse,
  setPlayers,
  setLobbies,
  setLobbiesResponse,
  setLobby,
  setLobbyResponse,
  addMessage,
  setGameStarted,
} from "actions/store";

import {
  setScore,
  setBoard,
  setLoser,
  setWinner,
  setPenalty,
  setNextPieces,
} from "actions/game";

export function setupSocketPlayer(dispatch) {
  socket.on(PLAYER.RESPONSE, (data) => {
    dispatch(setPlayerResponse(data));
  });
}

export function setupSocketRooms(dispatch) {
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

export function setupSocketGame(dispatch) {
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

  socket.on(GAME.GET_PENALTY, (data) => {
    dispatch(setPenalty(data));
  });
}

// export function initSocket() {
//   return socketIOClient(endpoint);
// }
