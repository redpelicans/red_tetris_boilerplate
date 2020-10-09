import runRedis from "../../../../src/server/store";
import {
  quitRedis,
  deleteKeyFromRedis,
  setComplexObjectToRedis,
} from "../../../../src/server/store";
import Response from "models/response";
import { LOBBIES } from "../../../../src/config/actions/lobbies";
import { popLobby } from "store/lobbies";

test("popLobby() should return a Success response", async () => {
  runRedis();

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

  await deleteKeyFromRedis("lobbies");
  quitRedis();
});

test("popLobby() should return an Error response `lobby doesn't exists`", async () => {
  runRedis();

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

  await deleteKeyFromRedis("lobbies");
  quitRedis();
});

test("popLobby() should return an Error response `You are not the owner`", async () => {
  runRedis();

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

  await deleteKeyFromRedis("lobbies");
  quitRedis();
});

// test("pushLobby() should return an Error `already on another lobby` response", async () => {
//   runRedis();

//   const lobby = {
//     id: "2",
//     name: "test2",
//     owner: {},
//     players: [{ socketId: "testSocketId" }],
//   };

//   const lobbies = {
//     1: {
//       id: "1",
//       name: "test",
//       owner: {},
//       players: [{ socketId: "testSocketId" }],
//     },
//   };
//   await setComplexObjectToRedis("lobbies", lobbies);

//   expect(await pushLobby(lobby, "testSocketId")).toEqual(
//     Response.error(LOBBIES.ADD, "You already have an active lobby !"),
//   );

//   await deleteKeyFromRedis("lobbies");
//   quitRedis();
// });

// test("pushLobby() should return an Error `lobbyName not available` response", async () => {
//   runRedis();

//   const lobby = {
//     id: "2",
//     name: "test",
//     owner: {},
//     players: [{ socketId: "testSocketId" }],
//   };

//   const lobbies = {
//     1: {
//       id: "1",
//       name: "test",
//       owner: {},
//       players: [{ socketId: "testSocketId2" }],
//     },
//   };
//   await setComplexObjectToRedis("lobbies", lobbies);

//   expect(await pushLobby(lobby, "testSocketId")).toEqual(
//     Response.error(LOBBIES.ADD, "lobbyName is not available!"),
//   );

//   await deleteKeyFromRedis("lobbies");
//   quitRedis();
// });
