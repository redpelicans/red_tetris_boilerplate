import { logerror, loginfo } from "utils/log";
import { getPlayer } from "storage/players";
import {
  joinLobby,
  leaveLobby,
  readyLobby,
  startGame,
  getLobby,
} from "storage/lobbies";
import { LOBBY } from "../../../config/actions/lobby";
import GROUP_DOMAIN from "../../../config/actions/group";
import eventEmitter from "listeners";
import event from "listeners/events";
import Game from "models/game";
import { setGame } from "../../storage/game";

export const handlerSubscribeLobby = async (socket, { lobbyId, playerId }) => {
  const player = await getPlayer(playerId);
  const response = await joinLobby(player, lobbyId);
  socket.emit(LOBBY.RESPONSE, response);

  if (response.type === "success") {
    socket.join(`${GROUP_DOMAIN}:lobby-${lobbyId}`);

    eventEmitter.emit(event.lobby.change, {
      socket,
      lobbyId,
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
  const response = await leaveLobby(lobbyId, playerId);
  socket.emit(LOBBY.RESPONSE, response);

  if (response.type === "success") {
    socket.leave(`${GROUP_DOMAIN}:lobby-${lobbyId}`);

    eventEmitter.emit(event.lobby.change, {
      socket,
      lobbyId,
    });

    eventEmitter.emit(event.lobbies.change, {
      socket,
    });
  }
};

export const handlerReadyLobby = async (socket, { lobbyId, playerId }) => {
  const response = await readyLobby(playerId, lobbyId);
  socket.emit(LOBBY.RESPONSE, response);

  if (response.type === "success") {
    // socket.leave(`${GROUP_DOMAIN}:${lobbyId}`);

    eventEmitter.emit(event.lobby.change, {
      socket,
      lobbyId,
    });

    // eventEmitter.emit(event.lobbies.change, {
    //   socket,
    // });
  }
};

export const handlerStartGame = async (socket, { lobbyId, ownerId }) => {
  const response = await startGame(ownerId, lobbyId);
  socket.emit(LOBBY.RESPONSE, response);

  if (response.type === "success") {
    eventEmitter.emit(event.lobby.change, {
      socket,
      lobbyId,
    });

    // unsub from group:lobbies?

    eventEmitter.emit(event.lobbies.change, {
      socket,
    });

    const lobby = await getLobby(lobbyId);
    const game = new Game({
      name: lobby.name,
      owner: lobby.owner,
      players: lobby.players,
    });
    await setGame(game);

    eventEmitter.emit(event.game.started, {
      lobbyId,
      game,
    });
  }
};
