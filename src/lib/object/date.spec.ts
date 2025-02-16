import { expect } from "chai";
import { FakeDateFormatter } from "./_fakes/index.spec";

global.DateFormatter = FakeDateFormatter;

import date from "./date";

describe("Object: Date", function () {
  describe("shape", function () {
    it("is a function", function () {
      expect(date)
        .a("function");
    });
  });
  describe("output", function () {
    it(`is a string  [Actual: ${date({ date: "NOT REAL FORMAT STRING" })}]`, function () {
      expect(date({ date: "NOT REAL FORMAT STRING" }))
        .a("string");
    });
  });
});
