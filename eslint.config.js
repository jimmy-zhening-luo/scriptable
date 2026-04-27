import linted from "linted";

export default linted({
  ts: {
    rules: {
      "ts/no-unnecessary-type-assertion": 0 /* @BUG 8.59.0, 8.59.1, ... */,
      "ts/require-array-sort-compare": 0,
      "ts/strict-boolean-expressions": 0,
    },
  },
});
