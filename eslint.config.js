import Lint from "@jimbojet/lint";

export default [
  ...new Lint(
    {
      js: ["*.config.js"],
      ts: ["src/**/*.ts"],
      json: ["package.json"],
      jsonc: ["tsconfig.json"],
      yml: [".github/workflows/*.yml"],
    },
    { overrideTs: { "@typescript-eslint/explicit-module-boundary-types": "off" } },
  )
    .configs,
];
