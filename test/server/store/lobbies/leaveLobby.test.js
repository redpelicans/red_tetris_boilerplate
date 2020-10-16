import redismock from "redis-mock";
import {
  quitRedis,
  setRedis,
  setComplexObjectToRedis,
  getComplexObjectFromRedis,
  deleteKeyFromRedis,
} from "storage";
import Response from "models/response";
import { LOBBY } from "../../../../src/config/actions/lobby";
import { leaveLobby } from "storage/lobbies";

beforeAll(() => {
  setRedis(redismock.createClient());
});

afterAll(() => {
  quitRedis();
});

beforeEach(() => {
  deleteKeyFromRedis("lobbies");
});

test("leaveLobby() should return a Success response", async () => {
  const lobbies = {
    1: {
      id: "1",
      name: "test",
      owner: {},
      maxPlayer: 4,
      players: [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }],
    },
    2: {
      id: "2",
      name: "test2",
      owner: {},
      maxPlayer: 4,
      players: [{ id: "5" }],
    },
  };
  await setComplexObjectToRedis("lobbies", lobbies);

  expect(await leaveLobby("1", "1")).toEqual(
    Response.success(LOBBY.UNSUBSCRIBE, {}),
  );
});

test("leaveLobby() should return an Error response `Lobby doesn't exists`", async () => {
  const lobbies = {
    1: {
      id: "1",
      name: "test",
      owner: {},
      maxPlayer: 4,
      players: [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }],
    },
    2: {
      id: "2",
      name: "test2",
      owner: {},
      maxPlayer: 4,
      players: [{ id: "5" }],
    },
  };
  await setComplexObjectToRedis("lobbies", lobbies);

  expect(await leaveLobby("1", "3")).toEqual(
    Response.error(LOBBY.UNSUBSCRIBE, "Lobby doesn't exists!"),
  );
});

test("leaveLobby() should return a Success response and remove lobby", async () => {
  const lobbies = {
    1: {
      id: "1",
      name: "test",
      owner: {},
      maxPlayer: 4,
      players: [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }],
    },
    2: {
      id: "2",
      name: "test2",
      owner: { socketId: "dd", id: "5" },
      maxPlayer: 4,
      players: [{ socketId: "dd", id: "5" }],
    },
  };
  await setComplexObjectToRedis("lobbies", lobbies);

  expect(await leaveLobby("5", "2")).toEqual(
    Response.success(LOBBY.UNSUBSCRIBE, {}),
  );
});

test("leaveLobby() should return an Error response `last but not owner`", async () => {
  const lobbies = {
    1: {
      id: "1",
      name: "test",
      owner: {},
      maxPlayer: 4,
      players: [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }],
    },
    2: {
      id: "2",
      name: "test2",
      owner: { socketId: "dd", id: "2" },
      maxPlayer: 4,
      players: [{ socketId: "dd", id: "5" }],
    },
  };
  await setComplexObjectToRedis("lobbies", lobbies);

  expect(await leaveLobby("5", "2")).toEqual(
    Response.error(
      LOBBY.UNSUBSCRIBE,
      "You are the last player but not the owner there is a problem!",
    ),
  );
});

test("leaveLobby() should return a Success response and change owner", async () => {
  const lobbies = {
    1: {
      id: "1",
      name: "test",
      owner: {},
      maxPlayer: 4,
      players: [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }],
    },
    2: {
      id: "2",
      name: "test2",
      owner: { socketId: "ddw", id: "6" },
      maxPlayer: 4,
      players: [
        { socketId: "ddw", id: "6" },
        { socketId: "ddq", id: "5" },
        { socketId: "dda", id: "7" },
      ],
    },
  };
  await setComplexObjectToRedis("lobbies", lobbies);

  expect(await leaveLobby("6", "2")).toEqual(
    Response.success(LOBBY.UNSUBSCRIBE, {}),
  );

  const lobbiesFinal = await getComplexObjectFromRedis("lobbies", lobbies);
  expect(lobbiesFinal[2].owner.id).toEqual("5");
});

test("leaveLobby() should return Error response `lobby doesn't exists` no lobbies", async () => {
  const player = {
    id: "123",
    name: "123",
    socketId: "testSocketId2",
  };

  expect(await leaveLobby("6", "2")).toEqual(
    Response.error(LOBBY.UNSUBSCRIBE, "Lobby doesn't exists!"),
  );
});
