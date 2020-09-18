import Response from "models/response";
import { logerror, loginfo } from "utils/log";
import { getPlayer } from "store/players";
import { joinLobby, leaveLobby, getLobby } from "store/lobbies";
import { LOBBY } from "./../../../config/actions/lobby";
import { LOBBIES } from "./../../../config/actions/lobbies";
import { getComplexObjectFromRedis } from "store";
import { GROUP } from "./../../../config/actions/group";

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
        // get info to everyone
        const lobbies = await getComplexObjectFromRedis("lobbies");
        socket.broadcast.to(GROUP.LOBBIES).emit(LOBBIES.PUBLISH, { lobbies });
        socket.emit(LOBBIES.PUBLISH, { lobbies });
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
    case 4:
      {
        const response = Response.error(
          LOBBY.SUBSCRIBE,
          "The lobby is full!",
          {},
        );
        loginfo("The lobby is full!", lobbyId);
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
  const res = await leaveLobby(playerId, lobbyId);

  switch (res) {
    case 0:
      {
        socket.leave("group:" + lobbyId);
        loginfo("Player", playerId, "left lobby", lobbyId);
        const response = Response.success(LOBBY.UNSUBSCRIBE, {});
        socket.emit(LOBBY.RESPONSE, { response });
        const lobby = await getLobby(lobbyId);
        socket.broadcast.to("group:" + lobbyId).emit(LOBBY.PUBLISH, { lobby });
        // give info to everyone
        const lobbies = await getComplexObjectFromRedis("lobbies");
        socket.broadcast.to(GROUP.LOBBIES).emit(LOBBIES.PUBLISH, { lobbies });
        socket.emit(LOBBIES.PUBLISH, { lobbies });
      }
      break;
    default: {
      const response = Response.error(
        LOBBY.UNSUBSCRIBE,
        "There was an error!",
        {},
      );
      loginfo("Error leaving lobby", name);
      socket.emit(LOBBY.RESPONSE, { response });
    }
  }
};
