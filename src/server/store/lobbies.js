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
  const lobbyAvailable = checkIfOwnerHasNoLobby(lobbies, socketId);
  if (!lobbyAvailable) return 1;
  const alreadyOnLobby = checkIfPlayerIsOnLobbyBySocket(lobbies, socketId);
  if (alreadyOnLobby) return 1;
  const nameAvailable = checkLobbyNameAvailability(lobbies, lobby.name);
  if (!nameAvailable) return 2;
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
  // check if lobby is full
  lobby.players.push(player);
  lobbies[lobbyId] = lobby;
  await setComplexObjectToRedis("lobbies", lobbies);
  console.log("player", player.name, "joined", lobby.name);
  return 0;
};

export const leaveLobby = async (playerId, lobbyId) => {
  const lobbies = (await getComplexObjectFromRedis("lobbies")) || {};
  const players = lobbies[lobbyId].players;
  const newPlayers = players.map((player) => player.id !== playerId);
  lobbies[lobbyId].players = newPlayers;
  await setComplexObjectToRedis("lobbies", lobbies);
  console.log("player", player.id, "left", lobbies[lobbyId].name);
};

const checkIfOwnerHasNoLobby = (lobbies, socketId) => {
  const res = Object.keys(lobbies).some(
    (key) => lobbies[key]?.owner?.socketId === socketId,
  );
  console.log("CHECK IF OWNER HAS NO LOBBY", res);
  return !res;
};

const checkLobbyNameAvailability = (lobbies, name) => {
  const res = Object.keys(lobbies).some((key) => lobbies[key].name === name);
  return !res;
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
