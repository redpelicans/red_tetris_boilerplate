import { logerror, loginfo } from "utils/log";
import { startGame, getLobby } from "storage/lobbies";
import { GAME } from "../../../config/actions/game";
import Game from "models/game";
import eventEmitter from "listeners";
import event from "listeners/events";
import { setGame } from "../../storage/game";

export const handlerStartGame = async (socket, { lobbyId, ownerId }) => {
  const response = await startGame(ownerId, lobbyId);
  socket.emit(GAME.RESPONSE, response);

  if (response.type === "success") {
    eventEmitter.emit(event.lobby.change, {
      socket,
      lobbyId,
    });

    // unsub from group:lobbies?

    eventEmitter.emit(event.lobbies.change, {
      socket,
    });

    const lobby = await getLobby(lobbyId);
    const game = new Game({
      name: lobby.name,
      owner: lobby.owner,
      players: lobby.players,
    });
    setGame(game);

    eventEmitter.emit(event.game.started, {
      lobbyId,
      game,
    });
  }
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
