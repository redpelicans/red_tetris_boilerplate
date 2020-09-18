import { logerror, loginfo } from "utils/log";
import { getPlayer } from "store/players";
import { joinLobby, leaveLobby } from "store/lobbies";
import { LOBBY } from "../../../config/actions/lobby";
import GROUP_DOMAIN from "../../../config/actions/group";
import eventEmitter from "listeners";
import event from "listeners/events";

export const handlerSubscribeLobby = async (socket, { playerId, lobbyId }) => {
  const player = await getPlayer(playerId);
  const response = await joinLobby(player, lobbyId);
  socket.emit(LOBBY.RESPONSE, { response });

  if (response.type === "success") {
    socket.join(`${GROUP_DOMAIN}:${lobbyId}`);

    eventEmitter.emit(event.lobby.change, {
      socket,
      lobbyId,
      self: false,
    });

    eventEmitter.emit(event.lobbies.change, {
      socket,
    });
  }
};

export const handlerUnsubscribeLobby = async (
  socket,
  { playerId, lobbyId },
) => {
  const response = await leaveLobby(playerId, lobbyId);
  socket.emit(LOBBY.RESPONSE, { response });

  if (response.type === "success") {
    socket.leave(`${GROUP_DOMAIN}:${lobbyId}`);

    eventEmitter.emit(event.lobby.change, {
      socket,
      lobbyId,
      self: false,
    });

    eventEmitter.emit(event.lobbies.change, {
      socket,
    });
  }
};
