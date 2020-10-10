// import runSocketIo from "../../../src/server/socket";
// import runHttpServer from "httpserver";

// import { io } from "../../../src/server/index";
// console.log(io);
// const http = runHttpServer();
// const ioClient = require("socket.io-client");

// const io = runSocketIo(httpServer);

// let sender;
// let ioServer;
// let httpServer;

beforeAll((done) => {
  require("../../../src/server/index");
  // console.log(io);
  // console.log("SAJANDJKASNKJSNKDJNASKJDNKJASNKDJNSAKJDNKJASNDKJNJSAKNDAKJn");
  // httpServer = runHttpServer();
  // ioServer = runSocketIo(httpServer);
  // httpServer.listen(3001);
  done();
});

afterAll((done) => {
  // ioServer.close();
  // httpServer.close();
  done();
});

test("coucou", async () => {
  expect("1").toEqual("1");
});

// describe("Server events", function () {
//   beforeEach(function (done) {
//     sender = ioClient("http://0.0.0.0:3004");
//     sender.on("connect", () => {
//       done();
//     });
//   });

//   afterEach(function (done) {
//     sender.disconnect();
//     done();
//   });

//   describe("Server Events", function () {
//     test("should emit message on room subscribed after connection", (done) => {
//       expect(1).toEqual(1);
//       // expect.assertions(1);

//       // sender.emit("test", "nico", (ack) => {
//       //   ioServer.emit("player:create", player);
//       // sender.on("player:response", function (msg) {
//       //   expect(msg).toBe("test");
//       //   done();
//       // });
//       // });
//     });
//   });
// });
