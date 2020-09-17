import Player from "models/player";
import { getComplexObjectFromRedis, setComplexObjectToRedis } from "store";

export const getPlayer = async (id) => {
  const players = await getComplexObjectFromRedis("players");
  console.log("I found player", players?.[id]);
  return players?.[id];
};

export const getPlayerId = async (socketId) => {
  const players = await getComplexObjectFromRedis("players");
  if (players == null) return null;
  const playerId = Object.keys(players).find(
    (key) => players[key].socketId === socketId,
  );
  console.log("I found id", playerId);
  return playerId;
};

export const pushPlayer = async (player) => {
  const players = (await getComplexObjectFromRedis("players")) || {};
  const res = checkNameAvailability(player.name, players);
  if (res) {
    players[player.id] = player;
    await setComplexObjectToRedis("players", players);
    console.log("player", player.name, "added");
    return true;
  } else {
    return false;
  }
};

export const popPlayer = async (id) => {
  let players = (await getComplexObjectFromRedis("players")) || {};
  delete players[id];
  await setComplexObjectToRedis("players", players);
  console.log("player", id, "deleted");
};

const checkNameAvailability = (name, players) => {
  const playerName = Object.keys(players).find(
    (key) => players[key].name === name,
  );
  return playerName ? false : true;
};
