import redismock from "redis-mock";
import {
  setRedis,
  quitRedis,
  setComplexObjectToRedis,
  deleteKeyFromRedis,
} from "storage";
import Response from "models/response";
import { LOBBIES } from "../../../../src/config/actions/lobbies";
import { pushLobby } from "storage/lobbies";

beforeAll(() => {
  setRedis(redismock.createClient());
});

afterAll(() => {
  quitRedis();
});

beforeEach(() => {
  deleteKeyFromRedis("lobbies");
});

test("pushLobby() should return a Success response", async () => {
  const lobby = {
    id: "123",
    name: "123",
    owner: {},
    players: [{}],
  };

  expect(await pushLobby(lobby, "testSocketId12")).toEqual(
    Response.success(LOBBIES.ADD, lobby),
  );
});

test("pushLobby() should return an Error `already on another lobby` response", async () => {
  const lobby = {
    id: "2",
    name: "test2",
    owner: {},
    players: [{ socketId: "testSocketId" }],
  };

  const lobbies = {
    1: {
      id: "1",
      name: "test",
      owner: {},
      players: [{ socketId: "testSocketId" }],
    },
  };
  await setComplexObjectToRedis("lobbies", lobbies);

  expect(await pushLobby(lobby, "testSocketId")).toEqual(
    Response.error(LOBBIES.ADD, "You already have an active lobby !"),
  );
});

test("pushLobby() should return an Error `lobbyName not available` response", async () => {
  const lobby = {
    id: "2",
    name: "test",
    owner: {},
    players: [{ socketId: "testSocketId" }],
  };

  const lobbies = {
    1: {
      id: "1",
      name: "test",
      owner: {},
      players: [{ socketId: "testSocketId2" }],
    },
  };
  await setComplexObjectToRedis("lobbies", lobbies);

  expect(await pushLobby(lobby, "testSocketId")).toEqual(
    Response.error(LOBBIES.ADD, "lobbyName is not available!"),
  );
});
