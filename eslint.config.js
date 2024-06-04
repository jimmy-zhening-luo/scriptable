import Lint from "@jimbojet/lint";

export default [
  ...new Lint(
    {
      js: ["*.config.js"],
      ts: [
        // "*.config.ts",
        "src/**/*.ts",
      ],
      svelte: ["src/**/*.svelte"],
      json: ["package.json"],
      jsonc: ["tsconfig.json"],
      yml: [".github/workflows/*.yml"],
      md: ["README.md"],
    },
    { overrideTs: { "@typescript-eslint/explicit-module-boundary-types": "off" } },
  )
    .configs,
];
