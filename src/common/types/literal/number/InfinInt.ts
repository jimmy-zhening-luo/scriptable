const iint_typeful: typeof typeful = importModule("./common/types/literal/typeful/Typeful") as typeof typeful;

declare type infinint = Brand<"infinint", number>;

function InfinInt(
  literal: number,
  errorContext?: string,
): infinint {
  return iint_typeful(
    (N: number): N is infinint =>
      Number.isInteger(N) || N === Infinity || N === -Infinity,
    literal,
    "infinint: value is not an [infinite] integer",
    errorContext,
  );
}

module.exports = InfinInt;
