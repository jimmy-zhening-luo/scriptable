import stylistic from "@stylistic/eslint-plugin";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import Configs from "@jimbojet/lint";

export default [
  ...new Configs(
    {
      stylistic,
      files: ["eslint.config.js"],
    },
    {
      ts,
      parser: tsParser,
      files: ["src/**/*.ts"],
    },
    {
      overrideTs: {
        "@typescript-eslint/explicit-function-return-type": [
          "error",
          { allowFunctionsWithoutTypeParameters: true },
        ],
        "@typescript-eslint/explicit-module-boundary-types": "off",
      },
    },
  ).configs,
];
