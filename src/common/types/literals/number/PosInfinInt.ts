const piint_typeful: typeof typeful = importModule(
  "./common/types/literals/typeful/Typeful",
) as typeof typeful;

function PosInfinInt(
  literal: number,
  errorContext?: string,
): posinfinint {
  return piint_typeful(
    (N: number): N is posinfinint =>
      Number.isInteger(N) && N > 0 || N === Infinity,
    literal,
    `posinfinint: value is not an [infinite] integer`,
    errorContext,
  );
}

module.exports = PosInfinInt;
