import Player from "models/player";

const players = [];

export const pushPlayer = (player) => {
  players.push(player);
};

export const getPlayers = () => {
  return players;
};
