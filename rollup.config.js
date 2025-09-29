import { nodeResolve } from "@rollup/plugin-node-resolve";
import { babel } from "@rollup/plugin-babel";

const extensions = [".ts"];

export default {
  input: {
    "app/index": "src/app/index.ts",
    "app/share": "src/app/share.ts",
    "app/widget/index": "src/app/widget/index.ts",
    "app/widget/date": "src/app/widget/date.ts",
    "lib/location": "src/lib/location.ts",
    "lib/time": "src/lib/time/index.ts",
  },
  output: {
    dir: "dist",
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
