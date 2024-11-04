import { expect } from "chai";
import Query from "./query.js";
import * as consts from "./query.consts.spec.js";
import * as queries from "./query.queries.spec.js";
import stringfuls from "./query.stringfuls.spec.js";

const query = new Query(
  queries.base,
  consts.engines,
  consts.alias,
  ...stringfuls([
    consts.SELECTOR,
    consts.OPERATORS,
    consts.MATH,
    consts.TRANSLATE,
  ] as const),
  stringfuls(consts.FALLBACK),
);

describe("Query", function () {
  describe("(stub) constructor", function () {
    it("should return a Query instance", function () {
      expect(query)
        .an.instanceOf(Query);
    });
  });
});
