import { expect } from "chai";
import TestEngine from "./index.engine.spec.js";
import query from "./index.query.spec.js";

describe("SearchEngine", function () {
  const engine = new TestEngine("find", "Tester"),
  outEngine = new TestEngine("find", "TesterWithOutput", true);

  describe("shape", function () {
    it("is object", function () {
      expect(engine)
        .an("object");
    });
  });
  describe("property", function () {
    it("app is engine type", function () {
      expect(engine["app"])
        .a("string")
        .that.equals("find");
      expect(outEngine["app"])
        .a("string")
        .that.equals("find");
    });
    it("engine has assigned name", function () {
      expect(engine["engine"])
        .a("string")
        .that.equals("Tester");
      expect(outEngine["engine"])
        .a("string")
        .that.equals("TesterWithOutput");
    });
    it("output is Null<true>", function () {
      expect(engine["output"])
        .a("null")
        .that.equals(null);
      expect(outEngine["output"])
        .a("boolean")
        .that.equals(true);
    });
  });
  describe("output", function () {
    it("is object", function () {
      expect(engine.resolve(query))
        .an("object");
      expect(outEngine.resolve(query))
        .an("object");
    });
    it("has all keys", function () {
      expect(engine.resolve(query))
        .has.all.keys("app", "find", "output", "action", "reversed");
      expect(outEngine.resolve(query))
        .has.all.keys("app", "find", "output", "action", "reversed");
    });
    it("has expected values", function () {
      expect(engine.resolve(query))
        .deep.equals({
          app: "find",
          find: "Tester",
          output: null,
          action: "items near me",
          reversed: "em raen smeti",
        });
      expect(outEngine.resolve(query))
        .deep.equals({
          app: "find",
          find: "TesterWithOutput",
          output: true,
          action: "items near me",
          reversed: "em raen smeti",
        });
    });
  });
});
