import "chai/register-should.js";

describe(
  "File",
  function () {
    describe(
      "shape",
      function () {
        it(
          "is a constructor",
          function () {
            ambientFile
              .should.be
              .an("object");
          },
        );
      },
    );
  },
);
