import { getComplexObjectFromRedis, setComplexObjectToRedis } from "storage";
import Response from "models/response";
import { PLAYER } from "../../config/actions/player";

export const getGame = async (id) => {
  return (await getComplexObjectFromRedis(`game-${id}`)) ?? {};
};
