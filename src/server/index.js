import runHttpServer from "httpserver";
import runSocketIo from "socket";
import runRedis from "store";

const httpServer = runHttpServer();
runSocketIo(httpServer);
runRedis();
