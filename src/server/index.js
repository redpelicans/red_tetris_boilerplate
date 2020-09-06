import runServer from "./http";
import runSocketIo from "./socket";
import params from "../../config/params";
import { logerror, loginfo } from "./log";

runServer(params)
  .then(runSocketIo)
  .then((res) => loginfo("Server launched and ready!"))
  .catch((e) => console.error(e));
