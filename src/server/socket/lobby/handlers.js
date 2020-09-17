import Response from "models/response";
import { logerror, loginfo } from "utils/log";
import { getPlayer } from "store/players";
import { joinLobby, leaveLobby, getLobby } from "store/lobbies";
import { LOBBY } from "./../../../config/actions/lobby";

export const handlerSubscribeLobby = async (socket, { playerId, lobbyId }) => {
  const player = await getPlayer(playerId);
  const res = await joinLobby(player, lobbyId);

  switch (res) {
    case 0:
      {
        socket.join("group:" + lobbyId);
        loginfo("Player", player.name, "joined lobby", lobbyId);

        const lobby = await getLobby(lobbyId);
        const response = Response.success(LOBBY.SUBSCRIBE, lobby);
        socket.emit(LOBBY.RESPONSE, { response });
        socket.broadcast.to("group:" + lobbyId).emit(LOBBY.PUBLISH, { lobby });
      }
      break;
    case 1:
      {
        const response = Response.error(
          LOBBY.SUBSCRIBE,
          "You already are an owner of another lobby!",
          {},
        );
        loginfo("You are already an owner of another lobby!", lobbyId);
        socket.emit(LOBBY.RESPONSE, { response });
      }
      break;
    case 2:
      {
        const response = Response.error(
          LOBBY.SUBSCRIBE,
          "You already are in another lobby!",
          {},
        );
        loginfo("You are already in another lobby!", lobbyId);
        socket.emit(LOBBY.RESPONSE, { response });
      }
      break;
    case 3:
      {
        const response = Response.error(
          LOBBY.SUBSCRIBE,
          "Lobby doesn't exists!",
          {},
        );
        loginfo("Lobby doesn't exists!", lobbyId);
        socket.emit(LOBBY.RESPONSE, { response });
      }
      break;
    default: {
      const response = Response.error(
        LOBBY.SUBSCRIBE,
        "There was an error!",
        {},
      );
      loginfo("Error joining lobby", name);
      socket.emit(LOBBY.RESPONSE, { response });
    }
  }
};

export const handlerUnsubscribeLobby = async (
  socket,
  { playerId, lobbyId },
) => {
  const player = await getPlayer(playerId);
  await leaveLobby(player, lobbyId);
  loginfo("Player", player.name, "left lobby", lobbyId);
  socket.leave("group:" + lobbyId);
};
