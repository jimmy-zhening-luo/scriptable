import { expect } from "chai";
import url from "./url";

const TEST = {
  OK: "https://www.example.com/path/to/foo?a=1&b=2&c=3#fragment",
  ERROR: "$%^&*",
  cases: {
    throw: {
      empty: "",
      http: "https://",
    },
    ok: {
      scheme: "scriptable://",
      schemeHost: "scriptable://host",
      schemeHostBlank: "scriptable:///",
      host: "example.com",
      hostPath: "example.com/path",
    },
  },
},
parts = url(TEST.OK);

describe("Object: URL", function () {
  describe("shape", function () {
    it("is a function", function () {
      expect(url)
        .a("function");
    });
  });
  describe("throws", function () {
    it("on non-URL input", function () {
      expect(() => url(TEST.ERROR))
        .throws();
      expect(() => url(TEST.cases.throw.empty))
        .throws();
      expect(() => url(TEST.cases.throw.http))
        .throws();
    });
    it("but not on valid URL input", function () {
      expect(() => url(TEST.OK))
        .does.not.throw();
      expect(() => Object.values(TEST.cases.ok).map(u => url(u))
        .does.not.throw();
    });
  });
  describe("output", function () {
    it("is an object", function () {
      expect(parts)
        .an("object");
    });
    it("with properties parts of URL", function () {
      expect(parts)
        .has.all.keys(
          "scheme",
          "host",
          "path",
          "query",
          "fragment",
        );
    });
    it("which are all strings", function () {
      expect(Object.values(parts).every(part => typeof part === "string"))
        .ok;
    });
  });
});
