import redismock from "redis-mock";
import {
  setRedis,
  quitRedis,
  setComplexObjectToRedis,
  deleteKeyFromRedis,
} from "storage";
import { clearPlayerFromLobbies } from "storage/lobbies";

beforeAll(() => {
  setRedis(redismock.createClient());
});

afterAll(() => {
  quitRedis();
});

beforeEach(() => {
  deleteKeyFromRedis("lobbies");
});

test("clearPlayerFromLobbies() should return lobbyId and get success from leaveLobby", async () => {
  const lobbies = {
    1: {
      id: "1",
      name: "test",
      owner: { id: "2" },
      maxPlayer: 4,
      players: [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }],
    },
    2: {
      id: "2",
      name: "test2",
      owner: { id: "5" },
      maxPlayer: 4,
      players: [{ id: "5" }],
    },
  };
  await setComplexObjectToRedis("lobbies", lobbies);

  expect(await clearPlayerFromLobbies("1")).toEqual("1");
});

test("clearPlayerFromLobbies() should return null and get error from leaveLobby", async () => {
  const lobbies = {
    1: {
      id: "1",
      name: "test",
      owner: { id: "2" },
      maxPlayer: 4,
      players: [{ id: "12" }],
    },
    2: {
      id: "2",
      name: "test2",
      owner: { id: "5" },
      maxPlayer: 4,
      players: [{ id: "5" }],
    },
  };
  await setComplexObjectToRedis("lobbies", lobbies);

  expect(await clearPlayerFromLobbies("12")).toEqual(null);
});

test("clearPlayerFromLobbies() should return null", async () => {
  const lobbies = {
    1: {
      id: "1",
      name: "test",
      owner: { id: "2" },
      maxPlayer: 4,
      players: [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }],
    },
    2: {
      id: "2",
      name: "test2",
      owner: { id: "5" },
      maxPlayer: 4,
      players: [{ id: "5" }],
    },
  };
  await setComplexObjectToRedis("lobbies", lobbies);

  expect(await clearPlayerFromLobbies("12")).toEqual(null);
});

test("clearPlayerFromLobby() should return null no lobbies", async () => {
  expect(await clearPlayerFromLobbies("6")).toEqual(null);
});
