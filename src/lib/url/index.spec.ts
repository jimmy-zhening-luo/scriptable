import "chai/register-should.js";
import { expect } from "chai";
import Url from ".";
import { TEST_URL } from "./index.urls.spec";

describe(
  "Object: URL",
  function () {
    const parts = new Url(TEST_URL.OK);

    describe(
      "shape",
      function () {
        it(
          "is a function",
          function () {
            Url
              .should.be
              .a("function");
          },
        );
      },
    );
    describe(
      "throws",
      function () {
        it(
          "on nonsense",
          function () {
            expect(() => new Url(TEST_URL.ERROR))
              .throws();
          },
        );
        it(
          "HTTP host-less",
          function () {
            expect(() => new Url(TEST_URL.CASE.ERROR.http))
              .throws();
          },
        );
        it(
          "HTTP empty host",
          function () {
            expect(() => new Url(TEST_URL.CASE.ERROR.httpEmpty))
              .throws();
          },
        );
        it(
          "HTTP localhost",
          function () {
            expect(() => new Url(TEST_URL.CASE.ERROR.httpLocal))
              .throws();
          },
        );
        it(
          "localhost",
          function () {
            expect(() => new Url(TEST_URL.CASE.ERROR.local))
              .throws();
          },
        );
        it(
          "and empty string",
          function () {
            expect(() => new Url(TEST_URL.CASE.ERROR.empty))
              .throws();
          },
        );
        it(
          "but not on valid URLs",
          function () {
            expect(() => new Url(TEST_URL.OK))
              .does.not.throw();
            expect(() => Object.values(TEST_URL.CASE.OK)
              .map(u => new Url(u)))
              .does.not.throw();
          },
        );
      },
    );
    describe(
      "output",
      function () {
        const PROPERTIES = [
          "scheme",
          "host",
          "path",
          "query",
          "fragment",
        ] as const;

        it(
          "is an object",
          function () {
            parts
              .should.be
              .an("object");
          },
        );
        it(
          "with properties parts of URL",
          function () {
            expect(
              PROPERTIES
                .every(property => property in parts),
            )
              .ok;
          },
        );
        it(
          "which are all strings",
          function () {
            expect(
              PROPERTIES
                .every(property => typeof parts[property] === "string"),
            )
              .ok;
          },
        );
      },
    );
  },
);
