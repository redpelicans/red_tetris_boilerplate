import { logerror, loginfo } from "utils/log";
import express from "express";
import http from "http";
import path from "path";
import params from "../../config/params/params";

const app = express();
const httpServer = http.createServer(app);
const runHttpServer = () => {
  /* To check and remove if not needed */
  const file =
    params.url === "/bundle.js" ? "/../../build/bundle.js" : "/../index.html";

  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, file));
  });

  httpServer.listen(params.server.port, () => {
    loginfo("Server listening on port:", params.server.port);
  });

  return httpServer;
};

export default runHttpServer;
