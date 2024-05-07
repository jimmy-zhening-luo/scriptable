const n_typeful: typeof typeful = importModule(
  "./common/types/literals/typeful/Typeful",
) as typeof typeful;

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
    `numberful: value is NaN`,
    errorContext,
  );
}

module.exports = Numberful;
