import redismock from "redis-mock";
import { getLobby, pushLobby } from "storage/lobbies";
import { quitRedis, setRedis, deleteKeyFromRedis } from "storage";

beforeAll(() => {
  setRedis(redismock.createClient());
});

afterAll(() => {
  quitRedis();
});

beforeEach(() => {
  deleteKeyFromRedis("lobbies");
});

test("getLobby() should return undefined", async () => {
  expect(await getLobby("56")).toEqual(undefined);
});

test("getLobby() should return a Lobby", async () => {
  const lobby = {
    id: "1",
    name: "test",
    owner: {},
    players: [{}],
  };

  await pushLobby(lobby, "testSocketId");
  expect(await getLobby("1")).toEqual(lobby);
});

test("getLobby() should return null", async () => {
  expect(await getLobby("222")).toBe(undefined);
});
