import { popPlayer, getPlayerId } from "store/players";
import { logerror, loginfo } from "utils/log";
import eventEmitter from "listeners";
import event from "listeners/events";

export const handlerOnDisconnect = async (socket, reason) => {
  loginfo(socket.id, "disconnect with reason", reason);
  if (reason === "io server disconnect") {
    socket.connect();
  }

  const playerId = await getPlayerId(socket.id);
  await popPlayer(playerId);

  eventEmitter.emit(event.players.change, {
    socket,
  });
};
