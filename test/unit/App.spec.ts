///// <reference path="../references.ts" />
import {App} from "../../examples/App";

describe("App", () => {
  describe("during initialization", () => {
    it("is alive", () => {
      //App.should.not.be.undefined;
      chai.assert(typeof App !== undefined)
    });
  });
});
