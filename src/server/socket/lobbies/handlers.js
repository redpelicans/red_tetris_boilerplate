import Lobby from "models/lobby";
import Response from "models/response";
import { logerror, loginfo } from "utils/log";
import { getLobbies, pushLobby, popLobby } from "service/lobbies";
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

  // send all lobbies
  const lobbies = getLobbies();
  socket.broadcast.emit(LOBBIES.PUBLISH, { lobbies });
  socket.emit(LOBBIES.PUBLISH, { lobbies });
};

export const handlerDeleteLobby = async (socket, { lobbyId, ownerId }) => {
  // const lobby = new Lobby({ hash, name, maxPlayer, owner });
  const res = popLobby(lobbyId, ownerId);
  // const response = Response.success(LOBBIES.DELETE, null);
  if (res) {
    loginfo("Lobby with id", lobbyId, "deleted!");
    // send all lobbies
    const lobbies = getLobbies();
    socket.broadcast.emit(LOBBIES.PUBLISH, { lobbies });
    socket.emit(LOBBIES.PUBLISH, { lobbies });
  } else {
    loginfo("Cannot delete with lobby id", lobbyId, "and ownerId", ownerId);
  }
  // socket.emit(LOBBIES.RESPONSE, { response });
};

export const handlerGetLobbies = async (socket) => {
  const response = getLobbies();
  loginfo(response);
  socket.emit(LOBBIES.PUBLISH, { response });
};
