const n_typeful: typeof typeful = importModule("typeful/Typeful") as typeof typeful;

declare type numberful = Brand<"numberful", number>;

function Numberful(
  literal: number,
  errorContext?: string,
): numberful {
  return n_typeful<
    numberful,
    number
  >(
    (N: number): N is numberful =>
      !Number.isNaN(N),
    literal,
    "numberful: value is NaN",
    errorContext,
  );
}

module.exports = Numberful;
