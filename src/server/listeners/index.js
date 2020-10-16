import { EventEmitter } from "events";
import event from "listeners/events";
import { getComplexObjectFromRedis } from "storage";
import { LOBBIES } from "../../config/actions/lobbies";
import { LOBBY } from "../../config/actions/lobby";
import { PLAYERS } from "../../config/actions/players";
import { MESSAGE } from "../../config/actions/message";
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
eventEmitter.on(event.message.new, async ({ socket, messageObject }) => {
  io.in(GROUP.LOBBIES).emit(MESSAGE.PUBLISH, messageObject);
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

export default eventEmitter;
