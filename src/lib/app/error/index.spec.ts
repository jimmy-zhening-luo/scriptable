import { expect } from "chai";
import error from "./index.js";

describe("Error", function () {
  describe("shape", function () {
    it("is function", function () {
      expect(error)
        .a("function");
    });
  });
});
