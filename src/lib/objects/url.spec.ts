import { expect } from "chai";
import url from "./url";

const TEST_URLS = {
  OK: "https://www.example.com/path/to/foo?a=1&b=2&c=3#fragment",
  ERROR: "$%^&*",
},
parts = url(TEST_URLS.OK);

describe("Object: URL", function () {
  describe("shape", function () {
    it("is a function", function () {
      expect(url)
        .a("function");
    });
  });
  describe("throws", function () {
    it("on non-URL input", function () {
      expect(() => url(TEST_URLS.ERROR))
        .throws();
    });
    it("but not on valid URL input", function () {
      expect(() => url(TEST_URLS.OK))
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
      expect(Object.entries(parts).every(([,value]) => typeof value === "string"))
        .ok;
    });
  });
});
