import * as chai from "chai";
import { expect } from "chai";
import Url from ".";

chai.should();
const
TEST = {
  OK: "https://www.example.com/path/to/foo?a=1&b=2&c=3#fragment",
  ERROR: "$%^&*",
  cases: {
    "throw": {
      empty: "",
      http: "https://",
      httpEmpty: "https:///",
      httpLocal: "https://localhost/",
      local: "localhost/",
    },
    ok: {
      scheme: "scriptable://", schemeEmpty: "scriptable:///", schemeHost: "scriptable://host", host: "example.com", hostPath: "example.com/path",
    },
  },
},
{ OK } = TEST;

describe("Object: URL", function () {
  const PROPERTIES = [
    "scheme",
    "host",
    "path",
    "query",
    "fragment",
  ] as const,
  parts = new Url(OK);

  describe("shape", function () {
    it("is a function", function () {
      Url
        .should.be
        .a("function");
    });
  });
  describe("throws", function () {
    it("on nonsense", function () {
      expect(() => new Url(TEST.ERROR)).throws();
    });
    it("HTTP host-less", function () {
      expect(() => new Url(TEST.cases.throw.http))
        .throws();
    });
    it("HTTP empty host", function () {
      expect(() => new Url(TEST.cases.throw.httpEmpty))
        .throws();
    });
    it("HTTP localhost", function () {
      expect(() => new Url(TEST.cases.throw.httpLocal))
        .throws();
    });
    it("localhost", function () {
      expect(() => new Url(TEST.cases.throw.local))
        .throws();
    });
    it("and empty string", function () {
      expect(() => new Url(TEST.cases.throw.empty))
        .throws();
    });
    it("but not on valid URLs", function () {
      expect(() => new Url(TEST.OK))
        .does.not.throw();
      expect(() => Object.values(TEST.cases.ok).map(u => new Url(u)))
        .does.not.throw();
    });
  });
  describe("output", function () {
    it("is an object", function () {
      parts
        .should.be
        .an("object");
    });
    it("with properties parts of URL", function () {
      expect(PROPERTIES.every(property => property in parts)).ok;
    });
    it(
      "which are all strings",
      function () {
        expect(PROPERTIES.every(property => typeof parts[property] === "string")).ok;
      },
    );
  });
});
