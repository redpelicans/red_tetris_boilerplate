import { GAME } from "../../../config/actions/game";
import { PIECE } from "../../../config/actions/piece";

import {
  setScore,
  setBoard,
  setLoser,
  setWinner,
  setPenalty,
  setNextPieces,
} from "actions/game";

export function setupSocketGame(socket, dispatch) {
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

export function removeSocketGame(socket) {
  socket.off(PIECE.SEND);
  socket.off(GAME.GET_SCORE);
  socket.off(GAME.GET_BOARD);
  socket.off(GAME.GET_LOSE);
  socket.off(GAME.WINNER);
  socket.off(GAME.GET_PENALTY);
}
