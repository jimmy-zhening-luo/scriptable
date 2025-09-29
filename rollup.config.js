import { nodeResolve } from "@rollup/plugin-node-resolve";
import { babel } from "@rollup/plugin-babel";

const extensions = [".ts"];

export default {
  input: [
    "src/app/index.ts",
    "src/app/share.ts",
    "src/app/widget/index.ts",
    "src/app/widget/date.ts",
    "src/lib/location.ts",
    "src/lib/time/index.ts",
  ],
  output: {
    dir: "dist/core",
    format: "cjs",
    strict: false,
  },
  plugins: [
    nodeResolve({ extensions }),
    babel({
      extensions,
      babelHelpers: "runtime",
    }),
  ],
};
