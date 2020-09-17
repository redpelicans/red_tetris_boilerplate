import Response from "models/response";
import { logerror, loginfo } from "utils/log";
import { getPlayer } from "store/players";
import { joinLobby, leaveLobby } from "store/lobbies";
import { LOBBY } from "./../../../config/actions/lobby";

export const handlerSubscribeLobby = async (socket, { playerId, lobbyId }) => {
  const player = await getPlayer(playerId);
  joinLobby(player, lobbyId);
  loginfo("Player", player.name, "joined lobby", lobbyId);
  socket.join("group:" + lobbyId);

  const lobby = getLobby(lobbyId);
  const response = Response.success(LOBBY.SUBSCRIBE, lobby);
  socket.emit(LOBBY.RESPONSE, { response });
};

export const handlerUnsubscribeLobby = async (
  socket,
  { playerId, lobbyId },
) => {
  const player = await getPlayer(playerId);
  leaveLobby(player, lobbyId);
  loginfo("Player", player.name, "left lobby", lobbyId);
  socket.leave("group:" + lobbyId);
};
