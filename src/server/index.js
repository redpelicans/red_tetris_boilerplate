import runHttpServer from "httpserver";
import runSocketIo, { setupSocketIo } from "socket";
import runRedis from "storage";

runRedis();
const httpServer = runHttpServer();
runSocketIo(httpServer);
// setupSocketIo();
