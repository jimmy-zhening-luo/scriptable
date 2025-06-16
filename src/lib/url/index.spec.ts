import "chai/register-should.js";
import { expect } from "chai";
import Url from ".";
import { TEST_URL } from "./index.cases.spec";

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
      "succeeds",
      function () {
        it(
          "on nonsense",
          function () {
            expect(() => new Url(TEST_URL.CASE.OK.httpLocal))
              .does.not.throw();
          },
        );
        it(
          "HTTP host-less",
          function () {
            expect(() => new Url(TEST_URL.CASE.OK.scheme))
              .does.not.throw();
          },
        );
        it(
          "HTTP empty host",
          function () {
            expect(() => new Url(TEST_URL.CASE.OK.schemeHost))
              .does.not.throw();
          },
        );
        it(
          "and empty string",
          function () {
            expect(() => new Url(TEST_URL.CASE.OK.schemePath))
              .does.not.throw();
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
            expect(() => new Url(TEST_URL.CASE.ERROR.nonsense))
              .throws();
          },
        );
        it(
          "HTTP no host",
          function () {
            expect(() => new Url(TEST_URL.CASE.ERROR.http))
              .throws();
          },
        );
        it(
          "HTTP path but no host",
          function () {
            expect(() => new Url(TEST_URL.CASE.ERROR.httpPath))
              .throws();
          },
        );
        it(
          "no scheme",
          function () {
            expect(() => new Url(TEST_URL.CASE.ERROR.noScheme))
              .throws();
          },
        );
        it(
          "no scheme with path",
          function () {
            expect(() => new Url(TEST_URL.CASE.ERROR.noSchemePath))
              .throws();
          },
        );
        it(
          "no scheme localhost",
          function () {
            expect(() => new Url(TEST_URL.CASE.ERROR.noSchemeLocal))
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
