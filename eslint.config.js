import Lint from "@jimbojet/lint";

export default [
  ...new Lint(
    {
      js: ["*.config.js"],
      ts: ["src/**/*.ts"],
    },
    { overrideTs: { "@typescript-eslint/explicit-module-boundary-types": "off" } },
  )
    .configs,
];
