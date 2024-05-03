import stylistic from "@stylistic/eslint-plugin";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import Configs from "@jimbojet/lint";

export default [
  ...new Configs(
    stylistic,
    ts,
    tsParser,
    ["eslint.config.js"],
    ["src/**/*.ts"],
  ).configs,
];
