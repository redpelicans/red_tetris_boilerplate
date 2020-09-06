import runServer from "./http";
import runSocketIo from "./socket";
import params from "../../config/params";
import { logerror, loginfo } from "./log";

const httpParams = runServer(params);
runSocketIo(httpParams);
