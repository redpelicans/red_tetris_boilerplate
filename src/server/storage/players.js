import { getComplexObjectFromRedis, setComplexObjectToRedis } from "storage";
import Response from "models/response";
import { PLAYER } from "../../config/actions/player";

export const getPlayer = async (id) => {
  const players = await getComplexObjectFromRedis("players");
  return players?.[id];
};

export const getPlayerId = async (socketId) => {
  const players = await getComplexObjectFromRedis("players");
  if (!players) {
    return null;
  }
  return Object.keys(players).find((key) => players[key].socketId === socketId);
};

export const pushPlayer = async (player) => {
  const players = (await getComplexObjectFromRedis("players")) ?? {};

  const valid = isValid(player.name);
  if (!valid) {
    return Response.error(PLAYER.CREATE, "Invalid username!");
  }

  const available = isAvailable(players, player.name);
  if (!available) {
    return Response.error(PLAYER.CREATE, "Username already exists!");
  }

  players[player.id] = player;
  await setComplexObjectToRedis("players", players);
  return Response.success(PLAYER.CREATE, player);
};

export const popPlayer = async (id) => {
  let players = (await getComplexObjectFromRedis("players")) ?? {};
  if (!players?.[id]) return null;
  delete players[id];
  await setComplexObjectToRedis("players", players);
};

const isAvailable = (players, username) => {
  return !Object.keys(players).some((key) => players[key].name === username);
};

const isValid = (username) => {
  return RegExp("^[a-z0-9_-]{3,16}$").test(username);
};
