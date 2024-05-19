const piint_Primitiveful: typeof Primitiveful = importModule(
  "./common/types/safe/acceptors/Primitiveful",
) as typeof Primitiveful;

function PosInfinInt(
  number: number,
  context?: string,
): posint {
  return piint_Primitiveful<number, "posinfinint", posinfinint>(
    (number: number): number is posint =>
      Number.isInteger(number) && number > 0 || number === Infinity,
    number,
    `posinfinint: number is not an [infinite] integer`,
    context,
  );
}

module.exports = PosInfinInt;
