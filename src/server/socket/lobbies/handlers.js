import Lobby from "models/lobby";
import { logerror, loginfo } from "utils/log";
import { pushLobby, popLobby } from "store/lobbies";
import { LOBBIES } from "../../../config/actions/lobbies";
import GROUP_DOMAIN, { GROUP } from "../../../config/actions/group";
import eventEmitter from "listeners";
import event from "listeners/events";

export const handlerAddLobby = async (
  socket,
  { hash, name, maxPlayer, owner },
) => {
  const lobby = new Lobby({ hash, name, maxPlayer, owner });
  const response = await pushLobby(lobby, socket.id);
  socket.emit(LOBBIES.RESPONSE, response);

  if (response.type === "success") {
    socket.join(`${GROUP_DOMAIN}:${lobby.id}`);

    eventEmitter.emit(event.lobbies.change, {
      socket,
    });
  }
};

export const handlerDeleteLobby = async (socket, { lobbyId, ownerId }) => {
  const response = await popLobby(lobbyId, ownerId);
  socket.emit(LOBBIES.RESPONSE, response);

  if (response.type === "success") {
    eventEmitter.emit(event.lobby.change, {
      socket,
      lobbyId,
    });

    eventEmitter.emit(event.lobbies.change, {
      socket,
    });
  }
};

export const handlerSubscribeLobbies = async (socket) => {
  socket.join(GROUP.LOBBIES);

  eventEmitter.emit(event.lobbies.subscribe, {
    socket,
  });
};

export const handlerUnsubscribeLobbies = async (socket) => {
  socket.leave(GROUP.LOBBIES);
};
