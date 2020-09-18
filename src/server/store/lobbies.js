import { LOBBIES } from "../../config/actions/lobbies";
import { LOBBY } from "../../config/actions/lobby";

import { getComplexObjectFromRedis, setComplexObjectToRedis } from "store";
import Response from "models/response";

export const getLobby = async (id) => {
  const lobbies = await getComplexObjectFromRedis("lobbies");
  return lobbies?.[id];
};

export const pushLobby = async (lobby, socketId) => {
  const lobbies = (await getComplexObjectFromRedis("lobbies")) ?? {};

  const alreadyOnLobby = checkIfPlayerIsOnLobbyBySocket(lobbies, socketId);
  if (alreadyOnLobby) {
    return Response.error(LOBBIES.ADD, "You already have an active lobby !");
  }

  const nameTaken = checkIfLobbyNameTaken(lobbies, lobby.name);
  if (nameTaken) {
    return Response.error(LOBBIES.ADD, "lobbyName is not available!");
  }

  lobbies[lobby.id] = lobby;
  await setComplexObjectToRedis("lobbies", lobbies);
  return Response.success(LOBBIES.ADD, lobby);
};

export const popLobby = async (lobbyId, ownerId) => {
  const lobbies = (await getComplexObjectFromRedis("lobbies")) ?? {};

  const lobby = lobbies?.[lobbyId];
  if (!lobby) {
    return Response.error(LOBBIES.DELETE, "Lobby doesn't exists!");
  }

  const owner = isOwner(lobby, ownerId);
  if (!owner) {
    return Response.error(
      LOBBIES.DELETE,
      "You are not the owner of this lobby!",
    );
  }

  delete lobbies[lobbyId];
  await setComplexObjectToRedis("lobbies", lobbies);
  // to check payload
  return Response.success(LOBBIES.DELETE, {});
};

export const joinLobby = async (player, lobbyId) => {
  const lobbies = (await getComplexObjectFromRedis("lobbies")) ?? {};

  const alreadyOnLobby = checkIfPlayerIsOnLobby(lobbies, player.id);
  if (alreadyOnLobby) {
    return Response.error(LOBBY.SUBSCRIBE, "You already are in another lobby!");
  }

  const lobby = lobbies?.[lobbyId];
  if (!lobby) {
    return Response.error(LOBBY.SUBSCRIBE, "Lobby doesn't exists!");
  }

  const lobbyFull = checkIfLobbyIsFull(lobby);
  if (lobbyFull) {
    return Response.error(LOBBY.SUBSCRIBE, "The lobby is full!");
  }

  lobby.players.push(player);
  lobbies[lobbyId] = lobby;
  await setComplexObjectToRedis("lobbies", lobbies);

  return Response.success(LOBBY.SUBSCRIBE, lobby);
};

export const leaveLobby = async (playerId, lobbyId) => {
  const lobbies = (await getComplexObjectFromRedis("lobbies")) ?? {};

  const lobby = lobbies?.[lobbyId];
  if (!lobby) {
    return Response.error(LOBBY.UNSUBSCRIBE, "Lobby doesn't exists!");
  }

  const lastPlayer = isLastPlayerInLobby(lobby);
  if (lastPlayer) {
    const response = await popLobby(lobbyId, playerId);
    if (response.type === "success") {
      return Response.success(LOBBY.UNSUBSCRIBE, {});
    } else {
      // Mouais?
      return Response.error(
        LOBBY.UNSUBSCRIBE,
        "You are the last player but not the owner there is a problem!",
      );
    }
  }

  const owner = isOwner(lobby, playerId);
  if (owner) {
    lobby.owner = getNextOwner(lobby.players, playerId);
    // dispatch the info?
  }

  const newPlayers = deletePlayerFromPlayers(lobby.players, playerId);

  lobby.players = newPlayers;
  lobbies[lobbyId] = lobby;
  await setComplexObjectToRedis("lobbies", lobbies);

  return Response.success(LOBBY.UNSUBSCRIBE, {});
};

const checkIfLobbyNameTaken = (lobbies, name) => {
  const res = Object.keys(lobbies).some((key) => lobbies[key].name === name);
  return res;
};

const checkIfLobbyIsFull = (lobby) => {
  const maxPlayer = lobby?.maxPlayer;
  const nbPlayers = lobby.players.length;
  return maxPlayer <= nbPlayers;
};

const checkIfPlayerIsOnLobby = (lobbies, playerId) => {
  const res = Object.keys(lobbies).some((key) =>
    lobbies[key].players.some((player) => player.id === playerId),
  );
  return res;
};

const checkIfPlayerIsOnLobbyBySocket = (lobbies, socketId) => {
  const res = Object.keys(lobbies).some((key) =>
    lobbies[key].players.some((player) => player.socketId === socketId),
  );
  return res;
};

const isOwner = (lobby, playerId) => {
  return lobby?.owner?.id === playerId;
};

const isLastPlayerInLobby = (lobby) => {
  return lobby?.players.length <= 1;
};

const deletePlayerFromPlayers = (players, playerId) => {
  return players.filter((player) => player.id !== playerId);
};

const getNextOwner = (players, playerId) => {
  return players.find((player) => player.id !== playerId);
};

const checkIfOwnerHasLobby = (lobbies, socketId) => {
  const res = Object.keys(lobbies).some(
    (key) => lobbies[key]?.owner?.socketId === socketId,
  );
  return res;
};

const checkIfPlayerIsOwner = (lobbies, playerId) => {
  const res = Object.keys(lobbies).some(
    (key) => lobbies[key]?.owner?.id === playerId,
  );
  return res;
};
