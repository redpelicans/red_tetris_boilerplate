import Lobby from "models/lobby";
import Response from "models/response";
import { logerror, loginfo } from "utils/log";
import { pushLobby, popLobby } from "store/lobbies";
import { LOBBIES } from "./../../../config/actions/lobbies";
import { LOBBY } from "./../../../config/actions/lobby";

import { GROUP } from "./../../../config/actions/group";
import { getComplexObjectFromRedis } from "store";

export const handlerAddLobby = async (
  socket,
  { hash, name, maxPlayer, owner },
) => {
  const lobby = new Lobby({ hash, name, maxPlayer, owner });
  const res = await pushLobby(lobby, socket.id);
  switch (res) {
    case 0:
      {
        const response = Response.success(LOBBIES.ADD, lobby);
        loginfo("Lobby", response.payload.name, "created!");
        socket.join("group:" + lobby.id);
        socket.emit(LOBBIES.RESPONSE, { response });

        /* Sending all lobbies */
        const lobbies = await getComplexObjectFromRedis("lobbies");
        socket.broadcast.to(GROUP.LOBBIES).emit(LOBBIES.PUBLISH, { lobbies });
        socket.emit(LOBBIES.PUBLISH, { lobbies });
      }
      break;
    case 1:
      {
        const response = Response.error(
          LOBBIES.ADD,
          "You already have an active lobby!",
          {},
        );
        loginfo("You already have an active lobby!", name);
        socket.emit(LOBBIES.RESPONSE, { response });
      }
      break;
    case 2:
      {
        const response = Response.error(
          LOBBIES.ADD,
          "lobbyName is not available!",
          {},
        );
        loginfo("lobbyName is not available!", name);
        socket.emit(LOBBIES.RESPONSE, { response });
      }
      break;
    default: {
      const response = Response.error(LOBBIES.ADD, "There was an error!", {});
      loginfo("Error creating lobby", name);
      socket.emit(LOBBIES.RESPONSE, { response });
    }
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
    socket.leave("group:" + lobbyId);
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
