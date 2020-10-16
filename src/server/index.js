import runServer from "run";
import { loginfo } from "utils/log";

runServer().then(() => loginfo("redtetris server is ready to play!"));
