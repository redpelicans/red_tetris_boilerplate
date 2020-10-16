import runHttpServer, { httpServer, quitHttpServer } from "httpserver";
import request from "supertest";
import { promiseTimeout } from "utils/promise";

describe("Http Server", () => {
  test("Connection", async () => {
    try {
      await promiseTimeout(
        runHttpServer,
        "Failed to run runHttpServer within 5 seconds.",
      );
    } catch (error) {
      console.log("Promise rejected:", error);
    }
    const res = await request(httpServer).get("/");
    expect(res.statusCode).toEqual(404);
  });

  test("Disconnection", async () => {
    try {
      await promiseTimeout(
        quitHttpServer,
        "Failed to run quitHttpServer within 5 seconds.",
      );
    } catch (error) {
      console.log("Promise rejected:", error);
    }
    const res = await request(httpServer).get("/");
    expect(res.statusCode).toEqual(404);
  });
});
