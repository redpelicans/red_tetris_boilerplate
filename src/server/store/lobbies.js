import Lobby from "models/lobby";
import { getComplexObjectFromRedis, setComplexObjectToRedis } from "store";

export const getLobby = async (id) => {
  const lobbies = await getComplexObjectFromRedis("lobbies");
  console.log("I found lobby", lobbies?.[id]);
  return lobbies?.[id];
};

export const pushLobby = async (lobby, socketId) => {
  const lobbies = (await getComplexObjectFromRedis("lobbies")) || {};
  console.log(lobbies);
  const hasLobby = checkIfOwnerHasLobby(lobbies, socketId);
  if (hasLobby) return 1;
  const alreadyOnLobby = checkIfPlayerIsOnLobbyBySocket(lobbies, socketId);
  if (alreadyOnLobby) return 1;
  const nameTaken = checkIfLobbyNameTaken(lobbies, lobby.name);
  if (nameTaken) return 2;
  lobbies[lobby.id] = lobby;
  await setComplexObjectToRedis("lobbies", lobbies);
  return 0;
};

export const popLobby = async (lobbyId, ownerId) => {
  const lobbies = (await getComplexObjectFromRedis("lobbies")) || {};
  const lobby = lobbies[lobbyId];
  if (lobby?.owner?.id !== ownerId) return false;
  delete lobbies[lobbyId];
  await setComplexObjectToRedis("lobbies", lobbies);
  console.log("lobby", lobbyId, "deleted");
  return true;
};

export const joinLobby = async (player, lobbyId) => {
  const lobbies = (await getComplexObjectFromRedis("lobbies")) || {};
  // const alreadyOwner = checkIfPlayerIsOwner(lobbies, player.id);
  // if (alreadyOwner) return 1;
  const alreadyOnLobby = checkIfPlayerIsOnLobby(lobbies, player.id);
  if (alreadyOnLobby) return 2;
  const lobby = lobbies?.[lobbyId];
  if (!lobby) return 3;
  const lobbyFull = checkIfLobbyIsFull(lobby);
  if (lobbyFull) return 4;
  lobby.players.push(player);
  lobbies[lobbyId] = lobby;
  await setComplexObjectToRedis("lobbies", lobbies);
  console.log("player", player.name, "joined", lobby.name);
  return 0;
};

export const leaveLobby = async (playerId, lobbyId) => {
  console.log("playerId", playerId);

  const lobbies = (await getComplexObjectFromRedis("lobbies")) || {};
  const players = lobbies[lobbyId].players;
  const newPlayers = players.filter((player) => {
    return player.id !== playerId;
  });
  console.log("newPlayers", newPlayers);
  const lobby = lobbies?.[lobbyId];
  if (!lobby) return 1;
  lobby.players = newPlayers;
  lobbies[lobbyId] = lobby;
  await setComplexObjectToRedis("lobbies", lobbies);
  console.log("player", playerId, "left", lobbies[lobbyId].name);
  return 0;
};

const checkIfOwnerHasLobby = (lobbies, socketId) => {
  const res = Object.keys(lobbies).some(
    (key) => lobbies[key]?.owner?.socketId === socketId,
  );
  return res;
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

const checkIfPlayerIsOwner = (lobbies, playerId) => {
  const res = Object.keys(lobbies).some(
    (key) => lobbies[key]?.owner?.id === playerId,
  );
  return res;
};
