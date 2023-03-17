import * as chai from "chai";

import chaiHttp = require("chai-http");

chai.should();
chai.use(chaiHttp);

export const expect = chai.expect;

export const chaiApp = chai.request("http://localhost:5050");

export const expectMetaSuccess = res => {
  expect(res.status).to.equal(200);
  expect(res.body.meta.success).equal(true);
  expect(res.body.meta.code).equal(200);
  expect(res.body.meta.status).equal("Success");
};
