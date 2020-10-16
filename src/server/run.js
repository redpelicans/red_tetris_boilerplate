import runHttpServer, { quitHttpServer } from "httpserver";
import runSocketIo, { quitSocketIo } from "socket";
import runRedis, { quitRedis } from "storage";
import { promiseTimeout } from "utils/promise";

const runServer = async () => {
  try {
    const httpServer = await promiseTimeout(
      runHttpServer,
      "Failed to run runHttpServer within 5 seconds.",
    );
    runSocketIo(httpServer);
    await promiseTimeout(runRedis, "Failed to run runRedis within 5 seconds.");
  } catch (error) {
    console.log("Promise rejected:", error);
  }
};

export const killServer = async () => {
  quitRedis();
  await promiseTimeout(
    quitSocketIo,
    "Failed to run quitSocketIo within 5 seconds.",
  );
  await promiseTimeout(
    quitHttpServer,
    "Failed to run quitHttpServer within 5 seconds.",
  );
};

export default runServer;
