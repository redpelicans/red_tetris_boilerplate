import Player from "models/player";
import Response from "models/response";
import { logerror, loginfo } from "utils/log";
import { players } from "store";
import { PLAYER } from "./../../../config/actions/player";

export const handlerCreatePlayer = async (socket, { name }) => {
  const socketId = socket.id;
  const player = new Player({ name, socketId });
  players.push(player);
  const response = Response.success(PLAYER.CREATE, player);
  loginfo("Player", response.payload.name, "created!");
  socket.emit(PLAYER.RES, { response });
};
