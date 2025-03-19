import { expect } from "chai";
import { SyntheticDateFormatter } from "./date.synthetic.spec";

global.DateFormatter = SyntheticDateFormatter;

import date from "./date";

const SYNTHETIC_OVERRIDE_PARAMETER_DATEFORMATSTRING = "SYNTHETIC_OVERRIDE_PARAMETER_DATEFORMATSTRING";

describe("Object: Date", function () {
  describe("shape", function () {
    it("is a function", function () {
      expect(date)
        .a("function");
    });
  });
  describe("output", function () {
    it(`is stringful`, function () {
      expect(date({ date: SYNTHETIC_OVERRIDE_PARAMETER_DATEFORMATSTRING }))
        .a("string")
        .with.length.above(1);
    });
  });
});
