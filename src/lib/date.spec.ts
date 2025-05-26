import "chai/register-should.js";
import date from "./date";

const SYNTHETIC_OVERRIDE_PARAMETER_DATEFORMATSTRING = "SYNTHETIC_OVERRIDE_PARAMETER_DATEFORMATSTRING";

describe(
  "Object: Date",
  function () {
    describe(
      "shape",
      function () {
        it(
          "is a function",
          function () {
            date
              .should.be
              .a("function");
          },
        );
      },
    );
    describe(
      "output",
      function () {
        it(
          "is stringful",
          function () {
            date(
              {
                date: SYNTHETIC_OVERRIDE_PARAMETER_DATEFORMATSTRING,
              },
            )
              .should.be
              .a("string")
              .with.length.above(1);
          },
        );
      },
    );
  },
);
