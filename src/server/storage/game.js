import { getComplexObjectFromRedis, setComplexObjectToRedis } from "storage";

export const setGame = async (game) => {
  await setComplexObjectToRedis(`game-${game.id}`, game);
};

export const getGame = async (id) => {
  const game = (await getComplexObjectFromRedis(`game-${id}`)) ?? {};
  return game;
};

export const updateScore = async (gameId, playerId, score) => {
  const game = await getGame(gameId);
  if (Object.keys(game).length === 0) {
    return null;
  }
  const newPlayers = [];
  game.players.forEach((element) => {
    if (element.player.id === playerId) {
      element.score = score;
    }
    newPlayers.push(element);
  });
  game.players = newPlayers;
  return await setGame(game);
};

export const setLoser = async (gameId, playerId) => {
  const game = await getGame(gameId);
  if (Object.keys(game).length === 0) {
    return null;
  }
  const newPlayers = [];
  game.players.forEach((element) => {
    if (element.player.id === playerId) {
      element.loser = true;
    }
    newPlayers.push(element);
  });
  game.players = newPlayers;
  return await setGame(game);
};

export const hasLost = async (gameId, playerId) => {
  const game = await getGame(gameId);
  if (Object.keys(game).length === 0) {
    return null;
  }
  const element = game.players.find(
    (element) => element.player.id === playerId,
  );
  return element?.loser;
};

export const checkForWinner = async (gameId) => {
  const game = await getGame(gameId);
  if (Object.keys(game).length === 0) {
    return null;
  }

  const players = game.players;

  const playersRemaining = nbPlayersRemaining(players);
  if (playersRemaining === 1) {
    return isWinnerLastPlayer(players);
  } else if (playersRemaining === 0) {
    console.log("HEY");
    console.log(getHighestScorePlayer(players));

    return getHighestScorePlayer(players);
  }
  return null;
};

const nbPlayersRemaining = (players) => {
  const nbPlayers = players.filter((el) => el.loser === false).length;
  return nbPlayers;
};

const isWinnerLastPlayer = (players) => {
  const winner = players.find((el) => el.loser === false);
  const test = players.some(
    (el) => el.player.id !== winner.id && el.score > winner.score,
  );
  if (test) {
    return null;
  }
  return winner;
};

const getHighestScorePlayer = (players) => {
  let winner = players[0];
  for (let i = 1; i < players.length; ++i) {
    if (players[i].score > winner.score) {
      winner = players[i];
    }
  }
  return winner;
};
