import stylistic from "@stylistic/eslint-plugin";
import ts from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";
import Lint from "@jimbojet/lint";

export default [
  ...new Lint(
    {
      stylistic,
      files: ["*.config.js"],
    },
    {
      ts,
      parser,
      files: ["src/**/*.ts"],
    },
    { overrideTs: { "@typescript-eslint/explicit-module-boundary-types": "off" } },
  )
    .configs,
];
