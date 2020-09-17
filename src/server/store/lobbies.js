import Lobby from "models/lobby";
import { getComplexObjectFromRedis, setComplexObjectToRedis } from "store";

export const pushLobby = async (lobby, socketId) => {
  const lobbies = (await getComplexObjectFromRedis("lobbies")) || {};
  const lobbyAvailable = checkIfOwnerHasNoLobby(lobbies, socketId);
  if (!lobbyAvailable) return 1;
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
  const lobby = lobbies[lobbyId];
  lobby.players.push(player);
  lobbies[lobbyId] = lobby;
  await setComplexObjectToRedis("lobbies", lobbies);
  console.log("player", player.name, "joined", lobby.name);
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
  const lobby = Object.keys(lobbies).find(
    (key) => lobbies[key]?.owner?.socketId === socketId,
  );
  return lobby ? false : true;
};

const checkLobbyNameAvailability = (lobbies, name) => {
  const lobbyName = Object.keys(lobbies).find(
    (key) => lobbies[key].name === name,
  );
  return lobbyName ? false : true;
};
