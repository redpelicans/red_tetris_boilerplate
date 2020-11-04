import { EventEmitter } from "events";
import event from "listeners/events";
import { getComplexObjectFromRedis } from "storage";
import { LOBBIES } from "../../config/actions/lobbies";
import { LOBBY } from "../../config/actions/lobby";
import { PLAYERS } from "../../config/actions/players";
import { MESSAGE } from "../../config/actions/message";
import { GAME } from "../../config/actions/game";
import GROUP_DOMAIN, { GROUP } from "../../config/actions/group";
import { getLobby, clearPlayerFromLobbies } from "storage/lobbies";
import { popPlayer, getPlayerId } from "storage/players";
import { io } from "socket";

const eventEmitter = new EventEmitter();

// Lobbies change
eventEmitter.on(event.lobbies.change, async ({ socket }) => {
  const lobbies = await getComplexObjectFromRedis("lobbies");

  io.in(GROUP.LOBBIES).emit(LOBBIES.PUBLISH, lobbies);
});

// Lobby change
eventEmitter.on(event.lobby.change, async ({ socket, lobbyId }) => {
  const lobby = (await getLobby(lobbyId)) ?? {};
  io.in(`${GROUP_DOMAIN}:lobby-${lobbyId}`).emit(LOBBY.PUBLISH, lobby);

  if (Object.keys(lobby).length === 0) {
    eventEmitter.emit(event.room.clear, {
      room: `${GROUP_DOMAIN}:lobby-${lobbyId}`,
    });
  }
});

// Players change
eventEmitter.on(event.players.change, async ({ socket }) => {
  const players = await getComplexObjectFromRedis("players");
  // to check
  // socket.emit(PLAYERS.PUBLISH, players);
  io.in(GROUP.LOBBIES).emit(PLAYERS.PUBLISH, players);
});

// Lobbies Subscribe
eventEmitter.on(event.lobbies.subscribe, async ({ socket }) => {
  const players = await getComplexObjectFromRedis("players");
  socket.emit(PLAYERS.PUBLISH, players);

  const lobbies = await getComplexObjectFromRedis("lobbies");
  socket.emit(LOBBIES.PUBLISH, lobbies);
});

// Player disconnect
eventEmitter.on(event.player.disconnect, async ({ socket }) => {
  socket.leave(GROUP.LOBBIES);
  const playerId = await getPlayerId(socket.id);
  const lobbyId = await clearPlayerFromLobbies(playerId);
  if (lobbyId) {
    socket.leave(`${GROUP_DOMAIN}:lobby-${lobbyId}`);
    eventEmitter.emit(event.lobby.change, {
      socket,
      lobbyId,
    });
    eventEmitter.emit(event.lobbies.change, {
      socket,
    });
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
  io.in(room).clients(function (error, clients) {
    if (clients.length > 0) {
      clients.forEach(function (socket_id) {
        io.sockets.sockets[socket_id].leave(room);
      });
    }
  });
});

// Join based on room
eventEmitter.on(event.room.join, async ({ roomIn, roomTo }) => {
  io.in(roomIn).clients(function (error, clients) {
    if (clients.length > 0) {
      clients.forEach(function (socket_id) {
        io.sockets.sockets[socket_id].join(roomTo);
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
  socket.broadcast
    .to(`${GROUP_DOMAIN}:game-${gameId}`)
    .emit(GAME.GET_SCORE, { playerId, score });
});

// Game Board Change
eventEmitter.on(event.game.board, ({ socket, playerId, gameId, boardGame }) => {
  socket.broadcast
    .to(`${GROUP_DOMAIN}:game-${gameId}`)
    .emit(GAME.GET_BOARD, { playerId, boardGame });
});

// Game Penalty
eventEmitter.on(
  event.game.penalty,
  ({ socket, playerId, gameId, nbLinePenalty }) => {
    socket.broadcast
      .to(`${GROUP_DOMAIN}:game-${gameId}`)
      .emit(GAME.GET_PENALTY, { playerId, nbLinePenalty });
  },
);

// Game Lose
eventEmitter.on(event.game.lose, ({ socket, playerId, gameId }) => {
  socket.broadcast
    .to(`${GROUP_DOMAIN}:game-${gameId}`)
    .emit(GAME.GET_LOSE, { playerId });
});

// Game Winner
eventEmitter.on(event.game.winner, ({ winner, gameId }) => {
  io.in(`${GROUP_DOMAIN}:game-${gameId}`).emit(GAME.WINNER, { winner });
  eventEmitter.emit(event.room.clear, {
    room: `${GROUP_DOMAIN}:game-${gameId}`,
  });
});

// // Lobby Leaver
// // TODO
// eventEmitter.on(event.game.leaver, ({ socketId }) => {
//   socket.broadcast
//     .to(`${GROUP_DOMAIN}:lobby-${lobbyId}`)
//     .emit(LOBBY.LEAVER, { socketId });
// });

export default eventEmitter;
