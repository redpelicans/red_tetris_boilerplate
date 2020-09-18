import { EventEmitter } from "events";
import event from "listeners/events";
import { getComplexObjectFromRedis } from "store";
import { GROUP } from "../../config/actions/group";
import { LOBBIES } from "../../config/actions/lobbies";

const eventEmitter = new EventEmitter();

// Lobbies
eventEmitter.on(event.lobbies.change, async ({ socket }) => {
  const lobbies = await getComplexObjectFromRedis("lobbies");

  socket.broadcast.to(GROUP.LOBBIES).emit(LOBBIES.PUBLISH, { lobbies });
  socket.emit(LOBBIES.PUBLISH, { lobbies });
});

export default eventEmitter;
