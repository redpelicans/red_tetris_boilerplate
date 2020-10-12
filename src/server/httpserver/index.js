import { logerror, loginfo } from "utils/log";
import express from "express";
import http from "http";
import path from "path";
import params from "../../config/params/params";

const app = express();
export const httpServer = http.createServer(app);

const runHttpServer = () => {
  return new Promise((resolve, reject) => {
    /* To check and remove if not needed */
    const file =
      params.url === "/bundle.js" ? "/../../build/bundle.js" : "/../index.html";

    app.get("/", (req, res) => {
      res.sendFile(path.resolve(__dirname, file));
    });

    httpServer.listen(params.server.port, () => {
      loginfo("Server listening on port:", params.server.port);
      resolve(httpServer);
    });

    setTimeout(() => {
      reject(new Error("Failed to run HttpServer wihtin 5 seconds."));
    }, 5000);
  });
};

export const quitHttpServer = async () => {
  return new Promise((resolve, reject) => {
    httpServer.close(() => resolve());

    setTimeout(() => {
      reject(new Error("Failed to quit HttpServer wihtin 5 seconds."));
    }, 5000);
  });
};

export default runHttpServer;
