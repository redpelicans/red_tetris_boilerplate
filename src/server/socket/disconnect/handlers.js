import { popPlayer, getPlayerId } from "store/players";
import { getComplexObjectFromRedis } from "store";
import { logerror, loginfo } from "utils/log";
import eventEmitter from "listeners";
import event from "listeners/events";

export const handlerOnDisconnect = async (socket, reason) => {
  loginfo(socket.id, "disconnect with reason", reason);
  if (reason === "io server disconnect") {
    /* the disconnection was initiated by the server, you need to reconnect manually */
    socket.connect();
  }
  /* else the socket will automatically try to reconnect */

  console.log("Looking for player with socketId", socket.id);
  const playerId = await getPlayerId(socket.id);
  console.log("I got playerId", playerId);
  await popPlayer(playerId);

  eventEmitter.emit(event.players.change, {
    socket,
  });
};
