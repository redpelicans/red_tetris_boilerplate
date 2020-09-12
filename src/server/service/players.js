import Player from "models/player";

const players = {};

export const getPlayers = () => {
  return players;
};

export const getPlayer = (id) => {
  return players?.[id];
};

export const getPlayerId = (socketId) => {
  const playerId = Object.keys(players).find(
    (key) => players[key].socketId === socketId,
  );
  return playerId;
};

export const pushPlayer = (player) => {
  players[player.id] = player;
};

export const popPlayer = (id) => {
  delete players[id];
};
