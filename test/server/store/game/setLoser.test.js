import redismock from "redis-mock";
import { setRedis, quitRedis, deleteKeyFromRedis } from "storage";
import { setLoser, setGame, getGame } from "storage/game";
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

describe("setLoser function", () => {
  test("Should set player to loser", async () => {
    await setGame(game1mock);
    const game1 = await getGame(game1mock.id);
    expect(game1.players[0].loser).toBe(false);
    expect(game1.players[1].loser).toBe(false);

    await setLoser(game1mock.id, game1mock.players[0].player.id);
    const game2 = await getGame(game1mock.id);
    expect(game2.players[0].loser).toBe(true);
    expect(game2.players[1].loser).toBe(false);
  });

  test("Should return null : no game", async () => {
    expect(
      await setLoser(game1mock.id, game1mock.players[0].player.id),
    ).toBeNull();
  });
});
