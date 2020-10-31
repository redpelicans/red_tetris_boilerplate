import { logerror, loginfo } from "utils/log";
import { startGame } from "storage/lobbies";
import { GAME } from "../../../config/actions/game";
import eventEmitter from "listeners";
import event from "listeners/events";

export const handlerStartGame = async (socket, { lobbyId, playerId }) => {
  const response = await startGame(playerId, lobbyId);
  socket.emit(GAME.RESPONSE, response);

  // if (response.type === "success") {
  //   eventEmitter.emit(event.lobby.change, {
  //     socket,
  //     lobbyId,
  //   });
  // }
};

export const handlerSendBoard = (socket, { lobbyId, boardGame }) => {
  eventEmitter.emit(event.game.board, {
    socket,
    lobbyId,
    boardGame,
  });
};

export const handlerSendPenalty = (socket, { lobbyId, nbLinePenalty }) => {
  eventEmitter.emit(event.game.penalty, {
    socket,
    lobbyId,
    nbLinePenalty,
  });
};

// TODO
export const handlerSendScore = (socket, { lobbyId, score }) => {
  eventEmitter.emit(event.game.score, {
    socket,
    lobbyId,
    score,
  });
};

// TODO
export const handlerSendLose = (socket, { lobbyId }) => {
  eventEmitter.emit(event.game.lose, {
    socket,
    lobbyId,
  });
};
