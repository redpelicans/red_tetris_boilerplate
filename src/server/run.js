import runHttpServer, { quitHttpServer } from "httpserver";
import runSocketIo, { quitSocketIo } from "socket";
import runRedis, { quitRedis } from "storage";

const runServer = async () => {
  const httpServer = await runHttpServer();
  runSocketIo(httpServer);
  await runRedis();
};

export const killServer = async () => {
  quitRedis();
  await quitSocketIo();
  await quitHttpServer();
};

export default runServer;
