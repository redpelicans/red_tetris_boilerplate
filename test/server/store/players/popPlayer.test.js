import redismock from "redis-mock";
import { popPlayer, pushPlayer, getPlayers } from "storage/players";
import { quitRedis, setRedis, deleteKeyFromRedis } from "storage";
import Player from "models/player";
import { player1mock, player2mock } from "../../mocks";

beforeAll(() => {
  setRedis(redismock.createClient());
});

afterAll(() => {
  deleteKeyFromRedis("players");
  quitRedis();
});

describe("popPlayer function", () => {
  test("No players, should return false", async () => {
    expect(await popPlayer("1")).toEqual(false);
  });

  test("Should pop player1", async () => {
    const player1 = new Player(player1mock);
    await pushPlayer(player1);
    const player2 = new Player(player2mock);
    await pushPlayer(player2);

    let players = await getPlayers();
    expect(players[player1.id]).toEqual(player1);
    expect(players[player2.id]).toEqual(player2);

    expect(await popPlayer(player1.id)).toEqual(true);
    players = await getPlayers();
    expect(players[player1.id]).toEqual(undefined);
    expect(players[player2.id]).toEqual(player2);
  });

  test("player doesn't exist, should return false", async () => {
    expect(await popPlayer("1")).toEqual(false);
  });
});
