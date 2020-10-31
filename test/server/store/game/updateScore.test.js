import redismock from "redis-mock";
import { setRedis, quitRedis, deleteKeyFromRedis } from "storage";
import { updateScore, setGame, getGame } from "storage/game";
import { game1mock } from "../../mocks";

beforeAll(() => {
  setRedis(redismock.createClient());
});

afterAll(() => {
  quitRedis();
});

beforeEach(() => {
  deleteKeyFromRedis(`game-${game1mock.id}`);
});

describe("updateScore function", () => {
  test("Should set new score", async () => {
    await setGame(game1mock);
    const game1 = await getGame(game1mock.id);
    expect(game1.players[0].score).toEqual(0);
    expect(game1.players[1].score).toEqual(0);

    await updateScore(game1mock.id, game1mock.players[0].player.id, 200);
    const game2 = await getGame(game1mock.id);
    expect(game2.players[0].score).toEqual(200);
    expect(game2.players[1].score).toEqual(0);
  });

  test("Should return null : no game", async () => {
    expect(
      await updateScore(game1mock.id, game1mock.players[0].player.id, 200),
    ).toEqual(null);
  });
});
