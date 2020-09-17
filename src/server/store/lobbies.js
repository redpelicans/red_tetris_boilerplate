import Lobby from "models/lobby";
import { getComplexObjectFromRedis, setComplexObjectToRedis } from "store";

export const pushLobby = async (lobby) => {
  let lobbies = (await getComplexObjectFromRedis("lobbies")) || {};
  lobbies[lobby.id] = lobby;
  await setComplexObjectToRedis("lobbies", lobbies);
  console.log("lobby", lobby.name, "added");
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
