import redismock from "redis-mock";
import { getLobby, pushLobby } from "storage/lobbies";
import { quitRedis, setRedis, deleteKeyFromRedis } from "storage";
import { lobby1mock } from "../../mocks";

beforeAll(() => {
  setRedis(redismock.createClient());
});

afterAll(() => {
  deleteKeyFromRedis("lobbies");
  quitRedis();
});

describe("getLobby function", () => {
  test("No lobbies, should return null", async () => {
    expect(await getLobby("1")).toEqual(null);
  });

  test("lobby1 added, should return a Lobby", async () => {
    await pushLobby(lobby1mock, lobby1mock.owner.socketId);

    expect(await getLobby(lobby1mock.id)).toEqual(lobby1mock);
  });

  test("lobby2 not added, should return null", async () => {
    expect(await getLobby("2")).toBe(null);
  });
});
