// eslint.config.js
// v13.1.0
import linted from "linted";

export default new linted(
  {
    js: ["*.config.js"],
    ts: [
      "src/**/*.ts",
      "*.config.ts",
    ],
    svelte: ["src/**/*.svelte"],
    html: ["src/**/*.html"],
    jest: ["src/**/*.spec.ts"],
    jsonc: ["tsconfig.json"],
    json: ["package.json"],
    yml: [".github/workflows/*.yml"],
  },
);
