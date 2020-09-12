import Player from "models/player";

const players = {};

export const getPlayers = () => {
  return players;
};

export const getPlayer = (id) => {
  return players?.[id];
};

export const getPlayerId = (socketId) => {
  const id = Object.keys(players).map((key) => {
    if (players[key].socketId === socketId) return key;
  });
  return id;
};

export const pushPlayer = (player) => {
  players[player.id] = player;
};

export const popPlayer = (id) => {
  delete players[id];
};
