import "chai/register-should.js";
import location from "../../lib/location";

const coordinates = ["latitude", "longitude"];

describe(
  "Time",
  () => {
    describe(
      "shape",
      () => {
        it(
          "is a function",
          () => {
            location
              .should.be
              .a("function");
          },
        );
        it(
          "is callable",
          () => {
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
      () => {
        it(
          "an object containing latlong",
          async () => {
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
          async () => {
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
          async () => {
            parseFloat(
              (await location()).latitude,
            )
              .should
              .be
              .a("number");
            parseFloat(
              (await location()).longitude,
            )
              .should
              .be
              .a("number");
          },
        );
      },
    );
  },
);
