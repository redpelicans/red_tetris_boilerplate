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
  io.in(`${GROUP_DOMAIN}:${lobbyId}`).emit(LOBBY.PUBLISH, lobby);

  if (lobby === {}) {
    eventEmitter.emit(event.room.clear, {
      room: `${GROUP_DOMAIN}:${lobbyId}`,
    });
  }
});

// Players change
eventEmitter.on(event.players.change, async ({ socket }) => {
  const players = await getComplexObjectFromRedis("players");
  socket.emit(PLAYERS.PUBLISH, players);
  // io.in(GROUP.LOBBIES).emit(PLAYERS.PUBLISH, players);
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
    socket.leave(`${GROUP_DOMAIN}:${lobbyId}`);
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
  io.in(`${GROUP_DOMAIN}:${lobbyId}`).emit(MESSAGE.PUBLISH, messageObject);
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

// Game Started
eventEmitter.on(event.game.started, ({ lobbyId, game }) => {
  io.in(`${GROUP_DOMAIN}:${lobbyId}`).emit(GAME.STARTED, game);
});

// Game Board Change
eventEmitter.on(event.game.board, ({ socket, lobbyId, boardGame }) => {
  const socketId = socket.id;
  socket.broadcast
    .to(`${GROUP_DOMAIN}:${lobbyId}`)
    .emit(GAME.GET_BOARD, { socketId, boardGame });
});

// Game Penalty
eventEmitter.on(event.game.penalty, ({ socket, lobbyId, nbLinePenalty }) => {
  const socketId = socket.id;
  socket.broadcast
    .to(`${GROUP_DOMAIN}:${lobbyId}`)
    .emit(GAME.GET_PENALTY, { socketId, nbLinePenalty });
});

// Game Penalty
// TODO
eventEmitter.on(event.game.score, ({ socket, lobbyId, score }) => {
  const socketId = socket.id;
  socket.broadcast
    .to(`${GROUP_DOMAIN}:${lobbyId}`)
    .emit(GAME.GET_SCORE, { socketId, score });
});

// Game Lose
// TODO
eventEmitter.on(event.game.lose, ({ socket, lobbyId }) => {
  const socketId = socket.id;
  socket.broadcast
    .to(`${GROUP_DOMAIN}:${lobbyId}`)
    .emit(GAME.GET_LOSE, { socketId });
});

// Game Winner
// TODO
eventEmitter.on(event.game.winner, ({ socket, score }) => {
  const socketId = socket.id;
  // socket.broadcast
  //   .to(`${GROUP_DOMAIN}:${lobbyId}`)
  //   .emit(GAME.WINNER, { socketId, score });
  io.in(`${GROUP_DOMAIN}:${lobbyId}`).emit(GAME.WINNER, { socketId, score });
});

// Lobby Leaver
// TODO
eventEmitter.on(event.game.leaver, ({ socketId }) => {
  socket.broadcast
    .to(`${GROUP_DOMAIN}:${lobbyId}`)
    .emit(LOBBY.LEAVER, { socketId });
});

export default eventEmitter;
