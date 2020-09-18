import { getComplexObjectFromRedis, setComplexObjectToRedis } from "store";
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
  const res = checkPlayerNameAvailability(players, player.name);
  if (res) {
    return Response.error(PLAYER.CREATE, "playerName already exists!");
  }

  players[player.id] = player;
  await setComplexObjectToRedis("players", players);
  return Response.success(PLAYER.CREATE, player);
};

export const popPlayer = async (id) => {
  let players = (await getComplexObjectFromRedis("players")) ?? {};
  delete players[id];
  await setComplexObjectToRedis("players", players);
};

const checkPlayerNameAvailability = (players, name) => {
  return Object.keys(players).some((key) => players[key].name === name);
};
