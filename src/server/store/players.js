import Player from "models/player";
import { getComplexObjectFromRedis, setComplexObjectToRedis } from "store";

export const getPlayer = async (id) => {
  const players = await getComplexObjectFromRedis("players");
  return players?.[id];
};

export const getPlayerId = async (socketId) => {
  const players = await getComplexObjectFromRedis("players");
  if (players === null) return null;
  const playerId = Object.keys(players).find(
    (key) => players[key].socketId === socketId,
  );
  return playerId;
};

export const pushPlayer = async (player) => {
  let players = await getComplexObjectFromRedis("players");
  if (players === null) players = {};
  players[player.id] = player;
  const res = await setComplexObjectToRedis("players", players);
};

export const popPlayer = async (id) => {
  const players = await getComplexObjectFromRedis("players");
  if (players === null) return null;
  delete players[id];
  const res = await setComplexObjectToRedis("players", players);
};
