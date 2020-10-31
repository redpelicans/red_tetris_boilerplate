import { getComplexObjectFromRedis, setComplexObjectToRedis } from "storage";

export const setGame = async (game) => {
  return await setComplexObjectToRedis(`game-${game.id}`, game);
};

export const getGame = async (id) => {
  return (await getComplexObjectFromRedis(`game-${id}`)) ?? {};
};

export const updateScore = async (gameId, playerId, score) => {
  const game = await getGame(gameId);
  if (Object.keys(game).length === 0) return null;
  const newPlayers = [];
  game.players.forEach((element) => {
    if (element.player.id === playerId) element.score = score;
    newPlayers.push(element);
  });
  game.players = newPlayers;
  return await setGame(game);
};

export const setLoser = async (gameId, playerId) => {
  const game = await getGame(gameId);
  if (Object.keys(game).length === 0) return null;
  const newPlayers = [];
  game.players.forEach((element) => {
    if (element.player.id === playerId) element.loser = true;
    newPlayers.push(element);
  });
  game.players = newPlayers;
  return await setGame(game);
};

export const checkForWinner = async (gameId) => {
  const game = await getGame(gameId);
  if (Object.keys(game).length === 0) return null;

  const players = game.players;

  const playersRemaining = nbPlayersRemaining(players);
  const winner =
    playersRemaining === 1
      ? isWinnerLastPlayer(players)
      : playersRemaining === 0
      ? getHighestScorePlayer(players)
      : null;

  return winner;
};

const nbPlayersRemaining = (players) => {
  return players.filter((el) => el.loser === false).length;
};

const isWinnerLastPlayer = (players) => {
  // handle same score?
  const winner = players.find((el) => el.loser === false);
  const test = players.some(
    (el) => el.player.id != winner.id && el.score > winner.score,
  );
  if (test) {
    return null;
  } else {
    return winner;
  }
};

const getHighestScorePlayer = (players) => {
  return players.reduce((acc, el) => {
    if (!acc || el.score > acc.score) return (acc = el);
    return acc;
  }, null);
};
