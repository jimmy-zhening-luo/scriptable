const int_typeful: typeof typeful = importModule("typeful/Typeful") as typeof typeful;

declare type int = Brand<"int", number>;

function Int(
  literal: number,
  errorContext?: string,
): int {
  return int_typeful(
    (N: number): N is int =>
      Number.isInteger(N),
    literal,
    "int: value is not a finite integer",
    errorContext,
  );
}

module.exports = Int;
