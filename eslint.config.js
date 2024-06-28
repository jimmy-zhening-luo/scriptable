// eslint.config.js
// v12.2.0
import linted from "linted";

export default [
  ...new linted(
    {
      js: [
        "eslint.config.js",
        "svelte.config.js",
      ],
      ts: [
        "src/**/*.ts",
        "vite.config.ts",
      ],
      svelte: ["src/**/*.svelte"],
      html: ["src/**/*.html"],
      jest: ["src/**/*.spec.ts"],
      jsonc: ["tsconfig.json"],
      json: ["package.json"],
      yml: [".github/workflows/*.yml"],
    },
  )
    .configs,
];
