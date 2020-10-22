import redismock from "redis-mock";
import { getPlayer, pushPlayer } from "storage/players";
import { quitRedis, setRedis, deleteKeyFromRedis } from "storage";
import Player from "models/player";
import { player1mock } from "../../mocks";

beforeAll(() => {
  setRedis(redismock.createClient());
});

afterAll(() => {
  deleteKeyFromRedis("players");
  quitRedis();
});

describe("getPlayer function", () => {
  test("No players, should return null", async () => {
    expect(await getPlayer("1")).toEqual(null);
  });

  test("player1 added, should return a Player", async () => {
    const player = new Player(player1mock);

    await pushPlayer(player);
    expect(await getPlayer(player.id)).toEqual(player);
  });

  test("player2 not added, should return null", async () => {
    expect(await getPlayer("2")).toBe(null);
  });
});
