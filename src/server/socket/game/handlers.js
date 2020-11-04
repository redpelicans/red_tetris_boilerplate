import { logerror, loginfo } from "utils/log";
import { deleteKeyFromRedis } from "storage";
import eventEmitter from "listeners";
import event from "listeners/events";
import { updateScore, checkForWinner, setLoser } from "../../storage/game";

export const handlerSendScore = async (socket, { gameId, playerId, score }) => {
  await updateScore(gameId, playerId, score);
  eventEmitter.emit(event.game.score, {
    socket,
    playerId,
    gameId,
    score,
  });
  checkWinner(gameId);
};

export const handlerSendBoard = (socket, { gameId, playerId, boardGame }) => {
  eventEmitter.emit(event.game.board, {
    socket,
    playerId,
    gameId,
    boardGame,
  });
};

export const handlerSendPenalty = (
  socket,
  { gameId, playerId, nbLinePenalty },
) => {
  eventEmitter.emit(event.game.penalty, {
    socket,
    playerId,
    gameId,
    nbLinePenalty,
  });
};

export const handlerSendLose = async (socket, { gameId, playerId }) => {
  await setLoser(gameId, playerId);
  eventEmitter.emit(event.game.lose, {
    socket,
    playerId,
    gameId,
  });
  checkWinner(gameId);
};

const checkWinner = async (gameId) => {
  const winner = await checkForWinner(gameId);

  if (winner) {
    eventEmitter.emit(event.game.winner, {
      gameId,
      winner,
    });
    // delete game object?
    deleteKeyFromRedis(`game-${gameId}`);
  }
};
