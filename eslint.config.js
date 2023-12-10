// v4.0.0
import stylistic from "@stylistic/eslint-plugin";
import js from "@eslint/js";
import tsLint from "@typescript-eslint/eslint-plugin";
import tsLintParser from "@typescript-eslint/parser";
import JimboLint from "@jimbojet/lint";

export default [
  ...new JimboLint(
    stylistic,
    js,
    tsLint,
    tsLintParser,
    ["eslint.config.js"],
    ["src/**/*.ts"],
  ).configs,
];
