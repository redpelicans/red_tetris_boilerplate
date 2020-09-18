import { EventEmitter } from "events";
import event from "listeners/events";
import { getComplexObjectFromRedis } from "store";
import { LOBBIES } from "../../config/actions/lobbies";
import { LOBBY } from "../../config/actions/lobby";
import { PLAYERS } from "../../config/actions/players";
import GROUP_DOMAIN, { GROUP } from "../../config/actions/group";
import { getLobby, clearPlayerFromLobbies } from "store/lobbies";
import { popPlayer, getPlayerId } from "store/players";

const eventEmitter = new EventEmitter();

// Lobbies
eventEmitter.on(event.lobbies.change, async ({ socket, self = true }) => {
  const lobbies = await getComplexObjectFromRedis("lobbies");

  socket.broadcast.to(GROUP.LOBBIES).emit(LOBBIES.PUBLISH, lobbies);
  if (self) {
    socket.emit(LOBBIES.PUBLISH, lobbies);
  }
});

// Lobby
eventEmitter.on(
  event.lobby.change,
  async ({ socket, lobbyId, self = true }) => {
    const lobby = (await getLobby(lobbyId)) ?? {};
    socket.broadcast
      .to(`${GROUP_DOMAIN}:${lobbyId}`)
      .emit(LOBBY.PUBLISH, lobby);
    if (self) {
      socket.emit(LOBBY.PUBLISH, lobby);
    }
  },
);

// Players
eventEmitter.on(event.players.change, async ({ socket, self = true }) => {
  const players = await getComplexObjectFromRedis("players");

  socket.broadcast.emit(PLAYERS.PUBLISH, players);
  if (self) {
    socket.emit(PLAYERS.PUBLISH, players);
  }
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
  const playerId = await getPlayerId(socket.id);
  const lobbyId = await clearPlayerFromLobbies(playerId);
  if (lobbyId) {
    socket.leave(`${GROUP_DOMAIN}:${lobbyId}`);
    eventEmitter.emit(event.lobbies.change, {
      socket,
      self: false,
    });
    eventEmitter.emit(event.lobby.change, {
      socket,
      lobbyId,
      self: false,
    });
  }

  await popPlayer(playerId);
  eventEmitter.emit(event.players.change, {
    socket,
    self: false,
  });
});

export default eventEmitter;
