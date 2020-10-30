import { logerror, loginfo } from "utils/log";
import { getPlayer } from "storage/players";
import { joinLobby, leaveLobby } from "storage/lobbies";
import { LOBBY } from "../../../config/actions/lobby";
import GROUP_DOMAIN from "../../../config/actions/group";
import eventEmitter from "listeners";
import event from "listeners/events";

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
