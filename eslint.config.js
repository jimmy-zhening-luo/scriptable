import linted from "linted";

export default linted(
  {
    "*": {
      ignores: ["typings/scriptable.d.ts"],
    },
    yml: {
      rules: {
        "yml/no-multiple-empty-lines": [
          "error",
          {
            max: 1,
            maxEOF: 0,
            maxBOF: 0,
          },
        ],
      },
    },
  },
);
