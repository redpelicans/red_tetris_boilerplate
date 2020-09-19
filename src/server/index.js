import runHttpServer from "httpserver";
import runSocketIo from "socket";
import runRedis from "store";

runRedis();
const httpServer = runHttpServer();
export const io = runSocketIo(httpServer);
