import Lobby from "models/lobby";
import Response from "models/response";
import { logerror, loginfo } from "utils/log";
import { pushLobby } from "service/lobbies";
import { LOBBIES } from "./../../../config/actions/lobbies";

export const handlerAddLobby = async (
  socket,
  { hash, name, maxPlayer, owner },
) => {
  const lobby = new Lobby({ hash, name, maxPlayer, owner });
  pushLobby(lobby);
  const response = Response.success(LOBBIES.ADD, lobby);
  loginfo("Lobby", response.payload.name, "created!");
  socket.emit(LOBBIES.RESPONSE, { response });
};
