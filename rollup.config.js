import { nodeResolve } from "@rollup/plugin-node-resolve";
import { babel } from "@rollup/plugin-babel";

const extensions = [".ts"];

export default {
  input: {
    "core/index": "src/core/index.ts",
    "lib/location": "src/lib/location.ts",
    "lib/time": "src/lib/time/index.ts",
    "lib/ui": "src/lib/ui/index.ts",
    "private/Search/index": "src/private/Search/index.ts",
    "private/Search/resolver": "src/private/Search/resolver.ts",
  },
  output: {
    dir: "dist",
    format: "cjs",
    strict: true,
    generatedCode: {
      preset: "es2015",
      constBindings: true,
      objectShorthand: true,
      symbols: true,
    },
  },
  plugins: [
    nodeResolve({ extensions }),
    babel({
      extensions,
      babelHelpers: "runtime",
    }),
  ],
};
