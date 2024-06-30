import linted from "linted";

export default linted(
  {
    _VERSION: "13.3.0",
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
