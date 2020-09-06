import { logerror, loginfo } from "../log";
import express from "express";
import http from "http";
import path from "path";

const app = express();
const httpServer = http.createServer(app);

const runServer = (params) => {
  /* To check and remove if needed */
  const file =
    params.url === "/bundle.js" ? "/../../build/bundle.js" : "/../index.html";

  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, file));
  });

  httpServer.listen(params.server.port, () => {
    loginfo("listening on port:", params.server.port);
  });

  return { ...params, httpServer };
};

export default runServer;
