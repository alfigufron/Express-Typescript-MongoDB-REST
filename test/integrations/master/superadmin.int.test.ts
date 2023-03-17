import { describe, it } from "node:test";
import { chaiApp, expect, expectMetaSuccess } from "../../support/chai";

describe("Integration Test Super Admin", () => {
  it("Get list Superadmin API Request", async () => {
    const res = await chaiApp.get("/api/v1/superadmin");

    expectMetaSuccess(res);
    expect(res.body.meta.message).equal("List Super Admin");
    expect(res.body.data).to.be.an("array");
  });
});
