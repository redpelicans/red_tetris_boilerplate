import Lobby from "models/lobby";
import Response from "models/response";
import { logerror, loginfo } from "utils/log";
import { pushLobby } from "service/players";
import { LOBBY } from "./../../../config/actions/lobby";

export const handlerLobby = async (socket, { name }) => {
  // const socketId = socket.id;
  // const player = new Player({ name, socketId });
  // pushPlayer(player);
  // const response = Response.success(PLAYER.CREATE, player);
  // loginfo("Player", response.payload.name, "created!");
  // socket.emit(PLAYER.RESPONSE, { response });
};
