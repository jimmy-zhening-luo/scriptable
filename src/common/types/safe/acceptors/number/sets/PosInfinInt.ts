const piint_Primitiveful = importModule(
  `./common/types/safe/acceptors/Primitiveful`,
) as typeof Primitiveful;

function PosInfinInt(
  number: number,
  context?: string,
) {
  return piint_Primitiveful<
    number,
    "posinfinint",
    posinfinint
  >(
    (number): number is posinfinint =>
      Number
        .isInteger(
          number,
        )
        && number > 0
        || number === Infinity,
    number,
    `posinfinint: number is not an [infinite] integer`,
    context,
  );
}

module.exports = PosInfinInt;
