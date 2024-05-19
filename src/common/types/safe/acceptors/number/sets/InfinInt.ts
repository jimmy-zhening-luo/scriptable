const iint_Primitiveful: typeof Primitiveful = importModule(
  "./common/types/safe/acceptors/Primitiveful",
) as typeof Primitiveful;

function InfinInt(
  number: number,
  context?: string,
): infinint {
  return iint_Primitiveful<number, "infinint", infinint>(
    (number: number): number is infinint =>
      Number.isInteger(number) || number === Infinity || number === -Infinity,
    number,
    `infinint: number is not an [infinite] integer`,
    context,
  );
}

module.exports = InfinInt;
