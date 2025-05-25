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
            new MockConcreteShortcut()
              .should.be
              .an("object");
          },
        );
      },
    );
  },
);
