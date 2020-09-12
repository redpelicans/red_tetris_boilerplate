import Lobby from "models/lobby";
import Response from "models/response";
import { logerror, loginfo } from "utils/log";
import { getLobbies, pushLobby, popLobby } from "service/lobbies";
import { LOBBIES } from "./../../../config/actions/lobbies";
import { GROUP } from "./../../../config/actions/group";

export const handlerAddLobby = async (
  socket,
  { hash, name, maxPlayer, owner },
) => {
  const lobby = new Lobby({ hash, name, maxPlayer, owner });
  pushLobby(lobby);
  const response = Response.success(LOBBIES.ADD, lobby);
  loginfo("Lobby", response.payload.name, "created!");
  socket.join("group:" + lobby.id);
  socket.emit(LOBBIES.RESPONSE, { response });

  const lobbies = getLobbies();
  socket.broadcast.to(GROUP.LOBBIES).emit(LOBBIES.PUBLISH, { lobbies });
  socket.emit(LOBBIES.PUBLISH, { lobbies });
};

export const handlerDeleteLobby = async (socket, { lobbyId, ownerId }) => {
  const res = popLobby(lobbyId, ownerId);
  if (res) {
    loginfo("Lobby with id", lobbyId, "deleted!");
    const lobbies = getLobbies();
    socket.broadcast.to(GROUP.LOBBIES).emit(LOBBIES.PUBLISH, { lobbies });
    socket.leave("group:" + lobby.id);
    // make everyone leave?
    socket.emit(LOBBIES.PUBLISH, { lobbies });
  } else {
    loginfo("Cannot delete with lobby id", lobbyId, "and ownerId", ownerId);
  }
};

export const handlerSubscribeLobbies = async (socket) => {
  socket.join(GROUP.LOBBIES);
  loginfo(socket.id, "joined group:lobbies");

  const lobbies = getLobbies();
  const response = Response.success(LOBBIES.SUBSCRIBE, lobbies);
  socket.emit(LOBBIES.RESPONSE, { response });
};

export const handlerUnsubscribeLobbies = async (socket) => {
  socket.leave(GROUP.LOBBIES);
  loginfo(socket.id, "left group:lobbies");
};
