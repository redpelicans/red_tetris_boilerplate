import runHttpServer, { httpServer, quitHttpServer } from "httpserver";
import request from "supertest";

describe("Http Server", () => {
  test("Connection", async () => {
    await runHttpServer();
    const res = await request(httpServer).get("/");
    expect(res.statusCode).toEqual(404);
  });

  test("Disconnection", async () => {
    await quitHttpServer();
    const res = await request(httpServer).get("/");
    expect(res.statusCode).toEqual(404);
  });
});
