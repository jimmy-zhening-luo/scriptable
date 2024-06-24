import Lint from "@jimbojet/lint";

export default [
  ...new Lint(
    {
      js: ["*.config.js"],
      ts: ["src/**/*.ts"],
      jsonc: ["tsconfig.json"],
      json: ["package.json"],
      yml: [".github/workflows/*.yml"],
      jest: ["src/**/*.spec.ts"],
    },
  )
    .configs,
];
