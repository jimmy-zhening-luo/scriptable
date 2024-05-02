const int_typeful: typeof typeful = importModule(
  "./common/types/literal/typeful/Typeful",
) as typeof typeful;

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
