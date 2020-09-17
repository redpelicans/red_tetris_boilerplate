import Lobby from "models/lobby";
import Response from "models/response";
import { logerror, loginfo } from "utils/log";
import { pushLobby, popLobby } from "store/lobbies";
import { LOBBIES } from "./../../../config/actions/lobbies";
import { GROUP } from "./../../../config/actions/group";
import { getComplexObjectFromRedis } from "store";

export const handlerAddLobby = async (
  socket,
  { hash, name, maxPlayer, owner },
) => {
  const lobby = new Lobby({ hash, name, maxPlayer, owner });
  await pushLobby(lobby);
  const response = Response.success(LOBBIES.ADD, lobby);
  loginfo("Lobby", response.payload.name, "created!");
  socket.join("group:" + lobby.id);
  socket.emit(LOBBIES.RESPONSE, { response });

  const lobbies = await getComplexObjectFromRedis("lobbies");
  socket.broadcast.emit(LOBBIES.PUBLISH, { lobbies });
  // socket.broadcast.to(GROUP.LOBBIES).emit(LOBBIES.PUBLISH, { lobbies });
  socket.emit(LOBBIES.PUBLISH, { lobbies });
};

export const handlerDeleteLobby = async (socket, { lobbyId, ownerId }) => {
  const res = await popLobby(lobbyId, ownerId);
  if (res) {
    loginfo("Lobby with id", lobbyId, "deleted!");
    const lobbies = await getComplexObjectFromRedis("lobbies");
    socket.broadcast.to(GROUP.LOBBIES).emit(LOBBIES.PUBLISH, { lobbies });
    socket.leave("group:" + lobby.id);
    /* Make everyone leave? */
    socket.emit(LOBBIES.PUBLISH, { lobbies });
  } else {
    loginfo("Cannot delete with lobby id", lobbyId, "and ownerId", ownerId);
  }
};

export const handlerSubscribeLobbies = async (socket) => {
  socket.join(GROUP.LOBBIES);
  loginfo(socket.id, "joined group:lobbies");

  const lobbies = await getComplexObjectFromRedis("lobbies");
  const response = Response.success(LOBBIES.SUBSCRIBE, lobbies);
  socket.emit(LOBBIES.RESPONSE, { response });
};

export const handlerUnsubscribeLobbies = async (socket) => {
  socket.leave(GROUP.LOBBIES);
  loginfo(socket.id, "left group:lobbies");
};
