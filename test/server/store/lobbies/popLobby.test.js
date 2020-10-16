import redismock from "redis-mock";
import {
  quitRedis,
  setRedis,
  setComplexObjectToRedis,
  deleteKeyFromRedis,
} from "storage";
import Response from "models/response";
import { LOBBIES } from "../../../../src/config/actions/lobbies";
import { popLobby } from "storage/lobbies";

beforeAll(() => {
  setRedis(redismock.createClient());
});

afterAll(() => {
  quitRedis();
});

beforeEach(() => {
  deleteKeyFromRedis("lobbies");
});

test("popLobby() should return a Success response", async () => {
  const lobbies = {
    1: {
      id: "1",
      name: "test",
      owner: { id: "ownerId" },
      players: [{ socketId: "testSocketId" }],
    },
  };
  await setComplexObjectToRedis("lobbies", lobbies);

  expect(await popLobby("1", "ownerId")).toEqual(
    Response.success(LOBBIES.DELETE, {}),
  );
});

test("popLobby() should return an Error response `lobby doesn't exists`", async () => {
  const lobbies = {
    2: {
      id: "2",
      name: "test",
      owner: { id: "ownerId" },
      players: [{ socketId: "testSocketId" }],
    },
  };
  await setComplexObjectToRedis("lobbies", lobbies);

  expect(await popLobby("1", "ownerId")).toEqual(
    Response.error(LOBBIES.DELETE, "Lobby doesn't exists!"),
  );
});

test("popLobby() should return an Error response `You are not the owner`", async () => {
  const lobbies = {
    1: {
      id: "1",
      name: "test",
      owner: { id: "testID" },
      players: [{ socketId: "testSocketId" }],
    },
  };
  await setComplexObjectToRedis("lobbies", lobbies);

  expect(await popLobby("1", "ownerId")).toEqual(
    Response.error(LOBBIES.DELETE, "You are not the owner of this lobby!"),
  );
});

test("popLobby() should return Error response `lobby doesn't exists` no lobbies", async () => {
  expect(await popLobby("1", "ownerId")).toEqual(
    Response.error(LOBBIES.DELETE, "Lobby doesn't exists!"),
  );
});
