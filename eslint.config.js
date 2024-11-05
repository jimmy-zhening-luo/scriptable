import linted from "linted";

export default [
  {
    ignores: ["typings/scriptable.d.ts"],
  },
  ...linted(),
];
