import Player from "models/player";
import { logerror, loginfo } from "utils/log";
import { pushPlayer, popPlayer } from "store/players";
import { PLAYER } from "./../../../config/actions/player";
import eventEmitter from "listeners";
import event from "listeners/events";

export const handlerCreatePlayer = async (socket, { name }) => {
  const socketId = socket.id;
  const player = new Player({ name, socketId });
  const response = await pushPlayer(player);
  socket.emit(PLAYER.RESPONSE, response);

  if (response.type === "success") {
    eventEmitter.emit(event.players.change, {
      socket,
    });
    loginfo("A new player named", player.name, "has been created!");
  }
};

export const handlerDeletePlayer = async (socket, { socketId }) => {
  eventEmitter.emit(event.player.disconnect, {
    socket,
  });
  loginfo("Player with socketId", socketId, "has been deleted!");
};
