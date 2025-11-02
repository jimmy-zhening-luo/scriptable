import "chai/register-should.js";
import Time from "../../lib/time";

describe(
  "Time",
  function () {
    describe(
      "shape",
      function () {
        it(
          "is a class",
          function () {
            Time
              .should.be
              .a("function");
          },
        );
        it(
          "is instantiable",
          function () {
            new Time()
              .should.be
              .an("object");
          },
        );
        it(
          "contains a valid number epoch",
          function () {
            new Time()
              .should
              .have
              .own
              .property("epoch")
              .a("number")
              .not
              .NaN;
          },
        );
      },
    );
    describe(
      "constructor",
      function () {
        it(
          "defaults to now",
          function () {
            new Time()
              .epoch
              .should.be
              .within(
                Date.now() - 5000,
                Date.now() + 5000,
              );
          },
        );
      },
    );
  },
);
