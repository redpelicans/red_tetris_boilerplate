import runHttpServer from "httpserver";
import runSocketIo from "socket";

const httpServer = runHttpServer();
runSocketIo(httpServer);
