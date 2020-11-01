import { logerror, loginfo } from "utils/log";
import { deleteKeyFromRedis } from "storage";
import { startGame, getLobby } from "storage/lobbies";
import { GAME } from "../../../config/actions/game";
import Game from "models/game";
import eventEmitter from "listeners";
import event from "listeners/events";
import {
  setGame,
  updateScore,
  checkForWinner,
  setLoser,
} from "../../storage/game";

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
