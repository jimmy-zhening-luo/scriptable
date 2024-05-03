import stylistic from "@stylistic/eslint-plugin";
import tsLint from "@typescript-eslint/eslint-plugin";
import tsLintParser from "@typescript-eslint/parser";
import Configs from "@jimbojet/lint";

export default [
  ...new Configs(
    stylistic,
    tsLint,
    tsLintParser,
    ["eslint.config.js"],
    ["src/**/*.ts"],
  ).configs,
];
