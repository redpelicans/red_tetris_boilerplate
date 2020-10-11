import runServer from "run";
import { logerror, loginfo } from "utils/log";
import { io } from "socket";

runServer().then(() => loginfo("Redis server is ready to play!"));
