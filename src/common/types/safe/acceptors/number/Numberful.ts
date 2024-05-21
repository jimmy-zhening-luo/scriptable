const n_Primitiveful = importModule(
  "./common/types/safe/acceptors/Primitiveful",
) as typeof Primitiveful;

function Numberful(
  number: number,
  context?: string,
) {
  return n_Primitiveful<
    number,
    "numberful",
    numberful
  >(
    (number): number is numberful =>
      !Number
        .isNaN(
          number,
        ),
    number,
    `numberful: number is NaN`,
    context,
  );
}

module.exports = Numberful;
