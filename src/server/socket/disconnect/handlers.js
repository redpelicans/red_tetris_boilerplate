import { logerror, loginfo } from "utils/log";
import eventEmitter from "listeners";
import event from "listeners/events";
import { clearPlayerFromLobbies } from "storage/lobbies";

export const handlerOnDisconnect = async (socket, reason) => {
  loginfo(socket.id, "disconnect with reason", reason);
  if (reason === "io server disconnect") {
    socket.connect();
  }

  eventEmitter.emit(event.player.disconnect, {
    socket,
  });

  loginfo("Player with socketId", socket.id, "disconnected!");
};
