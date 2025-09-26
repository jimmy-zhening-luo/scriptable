import { nodeResolve } from "@rollup/plugin-node-resolve";
import { babel } from "@rollup/plugin-babel";

const extensions = [".ts"];

export default {
  input: "./src/core/index.ts",
  output: {
    file: "./dist/core/index.js",
  },
  plugins: [
    nodeResolve({ extensions }),
    babel({
      extensions,
      babelHelpers: "runtime",
    }),
  ],
};
