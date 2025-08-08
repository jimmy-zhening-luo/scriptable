import "chai/register-should.js";

describe(
  "Shortcut",
  function () {
    describe(
      "shape",
      function () {
        it(
          "is extensible",
          function () {
            new ConcreteShortcut()
              .should.be
              .an("object");
          },
        );
      },
    );
  },
);
