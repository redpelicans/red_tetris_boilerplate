import Response from "models/response";
import { logerror, loginfo } from "utils/log";
import { getPlayer } from "service/players";
import { joinLobby, leaveLobby } from "service/lobbies";
import { LOBBY } from "./../../../config/actions/lobby";

export const handlerSubscribeLobby = async (socket, { playerId, lobbyId }) => {
  const player = getPlayer(playerId);
  joinLobby(player, lobbyId);
  socket.join("group:" + lobbyId);

  const lobby = getLobby(lobbyId);
  const response = Response.success(LOBBY.SUBSCRIBE, lobby);
  socket.emit(LOBBY.RESPONSE, { response });
};

export const handlerUnsubscribeLobby = async (
  socket,
  { playerId, lobbyId },
) => {
  const player = getPlayer(playerId);
  leaveLobby(player, lobbyId);
  socket.leave("group:" + lobbyId);
};
