import linted from "linted";

export default linted(
  {
    "*": {
      ignores: ["typings/scriptable.d.ts"],
    },
    js: {
      rules: {
        "@stylistic/no-multiple-empty-lines": [
          ON,
          {
            max: 1,
            maxEOF: 0,
            maxBOF: 0,
          },
        ],
      }
    },
  },
);

