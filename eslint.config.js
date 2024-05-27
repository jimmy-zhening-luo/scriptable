import stylistic from "@stylistic/eslint-plugin";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import Configs from "@jimbojet/lint";

export default [
  ...new Configs(
    {
      stylistic,
      files: ["*.config.js"],
    },
    {
      ts,
      parser: tsParser,
      files: ["src/**/*.ts"],
    },
    { overrideTs: { "@typescript-eslint/explicit-module-boundary-types": "off" } },
  )
    .configs,
];
