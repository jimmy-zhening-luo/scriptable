import linted from "linted";

export default [
  ...new linted(
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
