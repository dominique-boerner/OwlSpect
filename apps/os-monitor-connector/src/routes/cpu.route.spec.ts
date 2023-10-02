import { ConnectorResponse } from "../../../shared/models/connector-response.interface";
import { application } from "../index";
import { Cpu } from "../../../shared/models/cpu.interface";

const supertest = require("supertest");

describe("GET /cpu", () => {
  it("should return cpu information", async () => {
    const response = await supertest(application).get("/cpu");

    const responseBody = response.body as ConnectorResponse<Cpu[]>;

    if (!responseBody.response || responseBody.response?.length === 0) {
      throw new Error("Response is not correctly defined.");
    }

    expect(response.status).toEqual(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(responseBody).toBeDefined();

    expect(responseBody.response[0].model).toBeDefined();
    expect(responseBody.response[0].speed).not.toBeNaN();
    expect(responseBody.response[0].times.irq).toBeDefined();
    expect(responseBody.response[0].times.sys).toBeDefined();
    expect(responseBody.response[0].times.idle).toBeDefined();
    expect(responseBody.response[0].times.nice).toBeDefined();
    expect(responseBody.response[0].times.user).toBeDefined();
  });
});
