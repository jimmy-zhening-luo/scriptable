const pint_typeful: typeof typeful = importModule(
  "./common/types/literals/typeful/Typeful",
) as typeof typeful;

function PosInt(
  literal: number,
  errorContext?: string,
): posint {
  return pint_typeful(
    (N: number): N is posint =>
      Number.isInteger(N) && N > 0,
    literal,
    `posint: value is not a finite, positive integer`,
    errorContext,
  );
}

module.exports = PosInt;
