import { expect } from "chai";

class FakeDateFormatter {
  public dateFormat = "DEFAULT DATE FORMAT";

  public string(date: Date) {
    return String(date.getTime());
  }
}

global.DateFormatter = FakeDateFormatter as unknown as typeof DateFormatter;

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
