import redismock from "redis-mock";
import { setGame, getGame } from "storage/game";
import { quitRedis, setRedis, deleteKeyFromRedis } from "storage";
import { game1mock, game2mock } from "../../mocks";

beforeAll(() => {
  setRedis(redismock.createClient());
});

afterAll(() => {
  deleteKeyFromRedis(`game-${game1mock.id}`);
  quitRedis();
});

describe("getGame function", () => {
  test("No game, should return {}", async () => {
    expect(await getGame(game1mock.id)).toEqual({});
  });

  test("game1 added, should return a Game", async () => {
    await setGame(game1mock);

    expect(await getGame(game1mock.id)).toEqual(game1mock);
  });

  test("game2 not added, should return {}", async () => {
    expect(await getGame(game2mock.id)).toEqual({});
  });
});
