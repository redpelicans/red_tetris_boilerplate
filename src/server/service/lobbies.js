import Lobby from "models/lobby";

const lobbies = {};

export const getLobbies = () => {
  return lobbies;
};

export const pushLobby = (lobby) => {
  lobbies[lobby.id] = lobby;
  console.log(lobbies);
};

export const popLobby = (lobbyId, ownerId) => {
  const lobby = lobbies[lobbyId];
  if (lobby.owner.id !== ownerId) return false;
  delete lobbies[lobbyId];
  return true;
};

export const joinLobby = (player, lobbyId) => {
  const lobby = lobbies[lobbyId];
  lobby.players.push(player);
  lobbies[lobbyId] = lobby;
};

export const leaveLobby = (playerId, lobbyId) => {
  const players = lobbies[lobbyId].players;
  const newPlayers = players.map((player) => {
    return player.id !== playerId;
  });
  lobbies[lobbyId].players = newPlayers;
};
