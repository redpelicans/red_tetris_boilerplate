import redismock from "redis-mock";
import { pushPlayer } from "storage/players";
import {
  quitRedis,
  setComplexObjectToRedis,
  setRedis,
  deleteKeyFromRedis,
} from "storage";
import Response from "models/response";
import { PLAYER } from "../../../../src/config/actions/player";

beforeAll(() => {
  setRedis(redismock.createClient());
});

afterAll(() => {
  quitRedis();
});

beforeEach(() => {
  deleteKeyFromRedis("players");
});

test("pushPlayer() should return a Success response", async () => {
  const player = {
    id: "4",
    name: "test4",
    socketId: "si4",
  };

  expect(await pushPlayer(player)).toEqual(
    Response.success(PLAYER.CREATE, player),
  );
});

test("pushPlayer() should return an Error response `Invalid username`", async () => {
  const player = {
    id: "4",
    name: "test4?",
    socketId: "si4",
  };

  expect(await pushPlayer(player)).toEqual(
    Response.error(PLAYER.CREATE, "Invalid username!"),
  );

  player.name = "cc";
  expect(await pushPlayer(player)).toEqual(
    Response.error(PLAYER.CREATE, "Invalid username!"),
  );

  player.name = "ccdwdwadawdawdawdawdawdawdw";
  expect(await pushPlayer(player)).toEqual(
    Response.error(PLAYER.CREATE, "Invalid username!"),
  );

  player.name = "";
  expect(await pushPlayer(player)).toEqual(
    Response.error(PLAYER.CREATE, "Invalid username!"),
  );
});

test("pushPlayer() should return an Error response `Username already exists!`", async () => {
  const players = {
    5: {
      id: "5",
      name: "test5",
      socketId: "si5",
    },
    6: {
      id: "6",
      name: "test6",
      socketId: "si6",
    },
  };
  await setComplexObjectToRedis("players", players);

  const player = {
    id: "8",
    name: "test6",
    socketId: "si6",
  };

  expect(await pushPlayer(player, "si6")).toEqual(
    Response.error(PLAYER.CREATE, "Username already exists!"),
  );
});
