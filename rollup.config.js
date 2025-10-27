import { nodeResolve } from "@rollup/plugin-node-resolve";
import { babel } from "@rollup/plugin-babel";

const extensions = [".ts"];

export default {
  input: "src/core/index.ts",
  output: {
    dir: "dist/core",
    format: "cjs",
    strict: false,
    generatedCode: "esnext",
  },
  plugins: [
    nodeResolve({ extensions }),
    babel({
      extensions,
      babelHelpers: "runtime",
    }),
  ],
};
