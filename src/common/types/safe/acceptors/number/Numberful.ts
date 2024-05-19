const n_Primitiveful: typeof Primitiveful = importModule(
  "./common/types/safe/acceptors/Primitiveful",
) as typeof Primitiveful;

function Numberful(
  number: number,
  context?: string,
): numberful {
  return n_Primitiveful<
    number,
    "numberful",
    numberful
  >(
    (number: number): number is numberful =>
      !Number.isNaN(number),
    number,
    `numberful: number is NaN`,
    context,
  );
}

module.exports = Numberful;
