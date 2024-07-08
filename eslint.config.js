import linted from "linted";

export default linted(
  {},
  {
    overrideTs: {
      "@typescript-eslint/array-type": [
        "error",
        {
          "default": "array",
          readonly: "array",
        },
      ],
    },
  },
);
