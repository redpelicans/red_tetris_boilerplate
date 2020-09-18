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

  if (lobby?.owner?.id !== ownerId) {
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

  const players = lobby.players;
  const newPlayers = players.filter((player) => {
    return player.id !== playerId;
  });

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
