import redismock from "redis-mock";
import { setRedis, quitRedis, deleteKeyFromRedis } from "storage";
import { checkForWinner, setGame } from "storage/game";
import { game1mock } from "../../mocks";
import { deepCopy } from "helpers/functional";

beforeAll(() => {
  setRedis(redismock.createClient());
});

afterAll(() => {
  quitRedis();
});

beforeEach(() => {
  deleteKeyFromRedis(`game-${game1mock.id}`);
});

describe("checkForWinner function", () => {
  test("Should return null : 2 players still playing", async () => {
    const game = deepCopy(game1mock);
    await setGame(game);

    expect(await checkForWinner(game.id)).toBeNull();
  });

  test("Should return null : 1 player still playing but low score", async () => {
    const game = deepCopy(game1mock);
    game.players[0].loser = true;
    game.players[0].score = 200;
    game.players[1].score = 100;
    await setGame(game);

    expect(await checkForWinner(game.id)).toBeNull();
  });

  test("Should return winner : 1 playing and best score", async () => {
    const game = deepCopy(game1mock);
    game.players[0].loser = true;
    game.players[0].score = 100;
    game.players[1].score = 200;
    await setGame(game);

    expect(await checkForWinner(game.id)).toEqual(game.players[1]);
  });

  test("Should return winner : no players playing, best score", async () => {
    const game = deepCopy(game1mock);
    game.players[0].loser = true;
    game.players[1].loser = true;
    game.players[0].score = 100;
    game.players[1].score = 200;
    await setGame(game);

    expect(await checkForWinner(game.id)).toEqual(game.players[1]);
  });
});
