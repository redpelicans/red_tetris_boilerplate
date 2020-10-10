import { pushPlayer } from "storage/players";
import {
  quitRedis,
  deleteKeyFromRedis,
  setComplexObjectToRedis,
} from "storage";
import runRedis from "storage";
import Response from "models/response";
import { PLAYER } from "../../../../src/config/actions/player";

test("pushPlayer() should return a Success response", async () => {
  runRedis();

  const player = {
    id: "4",
    name: "test4",
    socketId: "si4",
  };

  expect(await pushPlayer(player)).toEqual(
    Response.success(PLAYER.CREATE, player),
  );

  await deleteKeyFromRedis("players");
  quitRedis();
});

test("pushPlayer() should return an Error response `Invalid username`", async () => {
  runRedis();

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

  await deleteKeyFromRedis("players");
  quitRedis();
});

test("pushPlayer() should return an Error response `Username already exists!`", async () => {
  runRedis();

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

  await deleteKeyFromRedis("players");
  quitRedis();
});
