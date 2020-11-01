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
    await setGame(game);

    eventEmitter.emit(event.game.started, {
      lobbyId,
      game,
    });
  }
};

export const handlerSendScore = async (socket, { gameId, playerId, score }) => {
  await updateScore(gameId, playerId, score);
  eventEmitter.emit(event.game.score, {
    socket,
    playerId,
    lobbyId,
    score,
  });
};

export const handlerSendBoard = (socket, { lobbyId, playerId, boardGame }) => {
  eventEmitter.emit(event.game.board, {
    socket,
    playerId,
    lobbyId,
    boardGame,
  });
};

export const handlerSendPenalty = (
  socket,
  { lobbyId, playerId, nbLinePenalty },
) => {
  eventEmitter.emit(event.game.penalty, {
    socket,
    playerId,
    lobbyId,
    nbLinePenalty,
  });
};

export const handlerSendLose = (socket, { lobbyId, playerId }) => {
  eventEmitter.emit(event.game.lose, {
    socket,
    playerId,
    lobbyId,
  });
};
