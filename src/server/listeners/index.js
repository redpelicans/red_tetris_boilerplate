import { EventEmitter } from "events";
import event from "listeners/events";
import { getComplexObjectFromRedis } from "store";
import { getLobby } from "store/lobbies";
import GROUP_DOMAIN, { GROUP } from "../../config/actions/group";
import { LOBBIES } from "../../config/actions/lobbies";
import { LOBBY } from "../../config/actions/lobby";

const eventEmitter = new EventEmitter();

// Lobbies
eventEmitter.on(event.lobbies.change, async ({ socket }) => {
  const lobbies = await getComplexObjectFromRedis("lobbies");

  socket.broadcast.to(GROUP.LOBBIES).emit(LOBBIES.PUBLISH, { lobbies });
  socket.emit(LOBBIES.PUBLISH, { lobbies });
});

// Lobby
eventEmitter.on(event.lobby.change, async ({ socket, lobbyId }) => {
  const lobby = (await getLobby(lobbyId)) ?? {};
  socket.broadcast
    .to(`${GROUP_DOMAIN}:${lobbyId}`)
    .emit(LOBBY.PUBLISH, { lobby });
  socket.emit(LOBBY.PUBLISH, { lobby });
});

// Lobby
eventEmitter.on(event.players.change, async ({ socket }) => {
  const players = await getComplexObjectFromRedis("players");

  socket.broadcast.emit("players:publish", { players });
  socket.emit("players:publish", { players });
});

// Lobbies Subscribe
eventEmitter.on(event.lobbies.subscribe, async ({ socket }) => {
  const players = await getComplexObjectFromRedis("players");
  socket.emit("players:publish", { players });

  const lobbies = await getComplexObjectFromRedis("lobbies");
  socket.emit(LOBBIES.PUBLISH, { lobbies });
});

export default eventEmitter;
