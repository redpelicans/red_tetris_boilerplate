import Lobby from "models/lobby";
import Response from "models/response";
import { logerror, loginfo } from "utils/log";
import { pushLobby, popLobby } from "store/lobbies";
import { LOBBIES } from "./../../../config/actions/lobbies";
import { LOBBY } from "./../../../config/actions/lobby";

import GROUP_DOMAIN, { GROUP } from "./../../../config/actions/group";
import { getComplexObjectFromRedis } from "store";

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
  const res = await popLobby(lobbyId, ownerId);
  // NV TO DO
  if (res) {
    loginfo("Lobby with id", lobbyId, "deleted!");
    // check if needed
    const response = Response.success(LOBBIES.DELETE, {});
    socket.emit(LOBBIES.RESPONSE, { response });

    const lobbies = await getComplexObjectFromRedis("lobbies");
    // get everyone out and refresh
    socket.broadcast.to("group:" + lobbyId).emit(LOBBY.PUBLISH, { lobby: {} });
    socket.emit(LOBBY.PUBLISH, { lobby: {} });

    socket.broadcast.to(GROUP.LOBBIES).emit(LOBBIES.PUBLISH, { lobbies });
    socket.leave(`${GROUP_DOMAIN}:${lobbyId}`);
    /* Make everyone leave? */
    socket.emit(LOBBIES.PUBLISH, { lobbies });
  } else {
    // do error mgmnt
    const response = Response.error(
      LOBBIES.DELETE,
      "You cannot delete this lobby!",
      {},
    );
    socket.emit(LOBBIES.RESPONSE, { response });
    loginfo("Cannot delete with lobby id", lobbyId, "and ownerId", ownerId);
  }
};

export const handlerSubscribeLobbies = async (socket) => {
  socket.join(GROUP.LOBBIES);
  loginfo(socket.id, "joined group:lobbies");

  // const lobbies = await getComplexObjectFromRedis("lobbies");
  // const response = Response.success(LOBBIES.SUBSCRIBE, lobbies);
  // socket.emit(LOBBIES.RESPONSE, { response });
};

export const handlerUnsubscribeLobbies = async (socket) => {
  socket.leave(GROUP.LOBBIES);
  loginfo(socket.id, "left group:lobbies");
};
