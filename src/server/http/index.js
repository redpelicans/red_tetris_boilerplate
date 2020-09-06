import { logerror, loginfo } from "../log";

const runServer = (params) => {
  const promise = new Promise((resolve, reject) => {
    const app = require("express")();
    const httpServer = require("http").createServer(app);

    const path = require("path");

    /* To check and remove if needed */
    const file =
      resolve.url === "/bundle.js"
        ? "/../../build/bundle.js"
        : "/../index.html";

    app.get("/", (req, res) => {
      res.sendFile(path.resolve(__dirname + file));
    });

    httpServer.listen(params.server.port, () => {
      loginfo("listening on port:", params.server.port);
    });

    resolve({ ...params, httpServer: httpServer });
  });

  return promise;
};

export default runServer;
