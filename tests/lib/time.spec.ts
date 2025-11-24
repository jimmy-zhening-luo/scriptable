import "chai/register-should.js";
import Time from "../../lib/time";

describe(
  "Time",
  () => {
    describe(
      "shape",
      () => {
        it(
          "is a class",
          () => {
            Time
              .should.be
              .a("function");
          },
        );
        it(
          "is instantiable",
          () => {
            new Time()
              .should.be
              .an("object");
          },
        );
        it(
          "contains a valid number epoch",
          () => {
            new Time()
              .should
              .have
              .own
              .property("epoch")
              .a("number");
          },
        );
      },
    );
    describe(
      "constructor",
      () => {
        it(
          "defaults to now",
          () => {
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
