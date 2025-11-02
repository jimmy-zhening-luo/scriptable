import { nodeResolve } from "@rollup/plugin-node-resolve";
import { babel } from "@rollup/plugin-babel";

const extensions = [".ts"];

/** @type {import('rollup').RollupOptions} */
export default {
  input: {
    "core/index": "src/core/index.ts",
    "lib/location": "src/lib/location/index.ts",
    "lib/time": "src/lib/time/index.ts",
    "lib/ui": "src/lib/ui/index.ts",
    "app/index": "src/app/index.ts",
    "app/share": "src/app/share.ts",
    "app/widget/iwidget": "src/app/widget/iwidget/index.ts",
    "app/widget/index": "src/app/widget/index.ts",
    "app/widget/date": "src/app/widget/date.ts",
    "private/Search/index": "src/private/Search/index.ts",
    "private/Search/resolver": "src/private/Search/resolver.ts",
  },
  output: {
    dir: "dist",
    format: "esm",
    strict: true,
    hoistTransitiveImports: false,
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
