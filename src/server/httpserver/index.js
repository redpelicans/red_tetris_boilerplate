import { loginfo } from "utils/log";
import express from "express";
import http from "http";
import path from "path";
import params from "../../config/params/params";

const app = express();
export const httpServer = http.createServer(app);

const runHttpServer = () =>
  new Promise((resolve) => {
    const file =
      params.url === "/bundle.js" ? "/../../build/bundle.js" : "/../index.html";

    app.get("/", (req, res) => {
      res.sendFile(path.resolve(__dirname, file));
    });

    httpServer.listen(params.server.port, () => {
      loginfo("Server listening on port:", params.server.port);
      resolve(httpServer);
    });
  });

export const quitHttpServer = async () =>
  new Promise((resolve) => {
    httpServer.close(resolve);
  });

export default runHttpServer;
