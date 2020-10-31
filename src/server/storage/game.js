import { getComplexObjectFromRedis, setComplexObjectToRedis } from "storage";
import Response from "models/response";
import { PLAYER } from "../../config/actions/player";
import { LOBBIES } from "../../config/actions/lobbies";
import { LOBBY } from "../../config/actions/lobby";
import { GAME } from "../../config/actions/game";
import { getLobby } from "./lobbies";

// export const getGames = async () => {
//   return (await getComplexObjectFromRedis(`games`)) ?? {};
// };

export const getGame = async (id) => {
  return (await getComplexObjectFromRedis(`game-${id}`)) ?? {};
};

export const setGame = async (game) => {
  return await setComplexObjectToRedis(`game-${game.id}`, game);
};

export const updateScore = async (gameId, playerId, score) => {
  const game = await getGame(gameId);
  if (game === {}) return null;
  const newPlayers = [];
  game.players.forEach((element) => {
    if (element.player.id === playerId) element.score = score;
    newPlayers.push(element);
  });
  game.players = newPlayers;
  return await setComplexObjectToRedis(`game-${game.id}`, game);
};

export const setLoser = async (gameId, playerId) => {
  const game = await getGame(gameId);
  if (game === {}) return null;
  const newPlayers = [];
  game.players.forEach((element) => {
    if (element.player.id === playerId) element.loser = true;
    newPlayers.push(element);
  });
  game.players = newPlayers;
  return await setComplexObjectToRedis(`game-${game.id}`, game);
};
