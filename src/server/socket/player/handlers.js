import Player from "models/player";
import Response from "models/response";
import { logerror, loginfo } from "utils/log";
import { pushPlayer } from "service/players";
import { PLAYER } from "./../../../config/actions/player";

export const handlerCreatePlayer = async (socket, { name }) => {
  const socketId = socket.id;
  const player = new Player({ name, socketId });
  pushPlayer(player);
  const response = Response.success(PLAYER.CREATE, player);
  loginfo("Player", response.payload.name, "created!");
  socket.emit(PLAYER.RESPONSE, { response });
};
