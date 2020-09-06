import Player from "models/player";

const players = [];

export const pushPlayer = (player) => {
  players.push(player);
};

export const getPlayers = () => {
  return players;
};

export const getPlayer = (id) => {
  const player = players.filter(function (el) {
    return el.id === id;
  });
  return player;
};
