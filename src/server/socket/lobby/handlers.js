import Response from "models/response";
import { logerror, loginfo } from "utils/log";
import { getPlayer } from "service/players";
import { joinLobby } from "service/lobbies";
import { LOBBY } from "./../../../config/actions/lobby";

export const handlerJoinLobby = async (socket, { playerId, lobbyId }) => {
  const player = getPlayer(playerId);
  joinLobby(player, lobbyId);
  // const response = Response.success(PLAYER.CREATE, player);
  // loginfo("Player", response.payload.name, "created!");
  // socket.emit(PLAYER.RESPONSE, { response });
};
