const pint_typeful: typeof typeful = importModule(
  "./common/types/literal/typeful/Typeful",
) as typeof typeful;

declare type posint = Brand<"posint", number>;

function PosInt(
  literal: number,
  errorContext?: string,
): posint {
  return pint_typeful(
    (N: number): N is posint =>
      Number.isInteger(N) && N > 0,
    literal,
    "posint: value is not a finite, positive integer",
    errorContext,
  );
}

module.exports = PosInt;
