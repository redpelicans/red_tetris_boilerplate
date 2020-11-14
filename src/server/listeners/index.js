import { EventEmitter } from "events";
import event from "listeners/events";
import { getComplexObjectFromRedis } from "storage";
import { LOBBIES } from "../../config/actions/lobbies";
import { LOBBY } from "../../config/actions/lobby";
import { PLAYERS } from "../../config/actions/players";
import { MESSAGE } from "../../config/actions/message";
import { GAME } from "../../config/actions/game";
import { PIECE } from "../../config/actions/piece";
import GROUP_DOMAIN, { GROUP } from "../../config/actions/group";
import {
  getLobby,
  clearPlayerFromLobbies,
  isLobbyPlaying,
} from "storage/lobbies";
import { popPlayer, getPlayerId } from "storage/players";
import { checkWinner } from "socket/game/handlers";
import { setLoser, hasLost } from "storage/game";
import { io } from "socket";

const eventEmitter = new EventEmitter();

// Lobbies change
eventEmitter.on(event.lobbies.change, async () => {
  const lobbies = await getComplexObjectFromRedis("lobbies");

  io.in(GROUP.LOBBIES).emit(LOBBIES.PUBLISH, lobbies);
});

// Lobby change
eventEmitter.on(event.lobby.change, async ({ lobbyId }) => {
  const lobby = (await getLobby(lobbyId)) ?? {};
  io.in(`${GROUP_DOMAIN}:lobby-${lobbyId}`).emit(LOBBY.PUBLISH, lobby);

  if (Object.keys(lobby).length === 0) {
    eventEmitter.emit(event.room.clear, {
      room: `${GROUP_DOMAIN}:lobby-${lobbyId}`,
    });
  }
});

// Players change
eventEmitter.on(event.players.change, async () => {
  const players = await getComplexObjectFromRedis("players");
  io.in(GROUP.LOBBIES).emit(PLAYERS.PUBLISH, players);
});

// Lobbies Subscribe
eventEmitter.on(event.lobbies.subscribe, async ({ socket }) => {
  const players = await getComplexObjectFromRedis("players");
  socket.emit(PLAYERS.PUBLISH, players);

  const lobbies = await getComplexObjectFromRedis("lobbies");
  socket.emit(LOBBIES.PUBLISH, lobbies);
});

eventEmitter.on(event.lobby.kicked, async ({ socketId, lobbyId }) => {
  io.sockets.connected[socketId].leave(`${GROUP_DOMAIN}:lobby-${lobbyId}`);
  io.sockets.connected[socketId].emit(LOBBY.KICKED);
});

// Player disconnect
eventEmitter.on(event.player.disconnect, async ({ socket }) => {
  socket.leave(GROUP.LOBBIES);
  const playerId = await getPlayerId(socket.id);
  const lobbyId = await clearPlayerFromLobbies(playerId);
  if (lobbyId) {
    const lobbyPlaying = await isLobbyPlaying(lobbyId);
    if (lobbyPlaying) {
      const loser = await hasLost(lobbyId, playerId);
      if (!loser) {
        await setLoser(lobbyId, playerId);
        eventEmitter.emit(event.game.lose, {
          socket,
          playerId,
          gameId: lobbyId,
        });
        checkWinner(lobbyId);
      }
    }
    socket.leave(`${GROUP_DOMAIN}:lobby-${lobbyId}`);
    eventEmitter.emit(event.lobby.change, {
      lobbyId,
    });
    eventEmitter.emit(event.lobbies.change);
  }

  await popPlayer(playerId);
  eventEmitter.emit(event.players.change, {
    socket,
  });
});

// Message new
eventEmitter.on(event.message.new, async ({ lobbyId, messageObject }) => {
  io.in(`${GROUP_DOMAIN}:lobby-${lobbyId}`).emit(
    MESSAGE.PUBLISH,
    messageObject,
  );
});

// Clear Room
eventEmitter.on(event.room.clear, async ({ room }) => {
  io.in(room).clients((error, clients) => {
    if (clients.length > 0) {
      clients.forEach((socketId) => {
        io.sockets.sockets[socketId].leave(room);
      });
    }
  });
});

// Join based on room
eventEmitter.on(event.room.join, async ({ roomIn, roomTo }) => {
  io.in(roomIn).clients((error, clients) => {
    if (clients.length > 0) {
      clients.forEach((socketId) => {
        io.sockets.sockets[socketId].join(roomTo);
      });
    }
  });
});

// Game Started
eventEmitter.on(event.game.started, ({ lobbyId, game }) => {
  io.in(`${GROUP_DOMAIN}:lobby-${lobbyId}`).emit(LOBBY.STARTED, game);
  eventEmitter.emit(event.room.join, {
    roomIn: `${GROUP_DOMAIN}:lobby-${lobbyId}`,
    roomTo: `${GROUP_DOMAIN}:game-${game.id}`,
  });
});

// Game Score Change
eventEmitter.on(event.game.score, ({ socket, playerId, gameId, score }) => {
  socket.broadcast.to(`${GROUP_DOMAIN}:game-${gameId}`).emit(GAME.GET_SCORE, {
    playerId,
    score,
  });
});

// Game Board Change
eventEmitter.on(event.game.board, ({ socket, playerId, gameId, boardGame }) => {
  socket.broadcast.to(`${GROUP_DOMAIN}:game-${gameId}`).emit(GAME.GET_BOARD, {
    playerId,
    boardGame,
  });
});

// Game Penalty
eventEmitter.on(
  event.game.penalty,
  ({ socket, playerId, gameId, nbLinePenalty }) => {
    socket.broadcast
      .to(`${GROUP_DOMAIN}:game-${gameId}`)
      .emit(GAME.GET_PENALTY, {
        playerId,
        nbLinePenalty,
      });
  },
);

// Game Lose
eventEmitter.on(event.game.lose, ({ socket, playerId, gameId }) => {
  socket.broadcast.to(`${GROUP_DOMAIN}:game-${gameId}`).emit(GAME.GET_LOSE, {
    playerId,
  });
});

// Game Winner
eventEmitter.on(event.game.winner, ({ winner, gameId }) => {
  io.in(`${GROUP_DOMAIN}:game-${gameId}`).emit(GAME.WINNER, {
    winner,
  });
  eventEmitter.emit(event.room.clear, {
    room: `${GROUP_DOMAIN}:game-${gameId}`,
  });
});

// Piece Send
eventEmitter.on(event.piece.send, ({ pieces, gameId }) => {
  io.in(`${GROUP_DOMAIN}:game-${gameId}`).emit(PIECE.SEND, pieces);
});

export default eventEmitter;
