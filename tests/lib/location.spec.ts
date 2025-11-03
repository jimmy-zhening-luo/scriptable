import "chai/register-should.js";
import location from "../../lib/location";

const coordinates = ["latitude", "longitude"];

describe(
  "Time",
  function () {
    describe(
      "shape",
      function () {
        it(
          "is a function",
          function () {
            location
              .should.be
              .a("function");
          },
        );
        it(
          "is callable",
          function () {
            location
              .should
              .not
              .throw();
          },
        );
      },
    );
    describe(
      "returns",
      function () {
        it(
          "an object containing latlong",
          async function () {
            (await location())
              .should
              .be
              .an("object")
              .with
              .keys(coordinates);
          },
        );
        it(
          "strings",
          async function () {
            (await location())
              .should
              .have
              .own
              .property("latitude")
              .a("string");
            (await location())
              .should
              .have
              .own
              .property("longitude")
              .a("string");
          },
        );
        it(
          "containing floats",
          async function () {
            parseFloat(
              (await location()).latitude,
            )
              .should
              .be
              .a("number")
              .not
              .NaN;
            parseFloat(
              (await location()).longitude,
            )
              .should
              .be
              .a("number")
              .not
              .NaN;
          },
        );
      },
    );
  },
);
