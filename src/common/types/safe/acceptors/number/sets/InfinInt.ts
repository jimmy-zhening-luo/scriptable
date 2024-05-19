const iint_Primitiveful: typeof Primitiveful = importModule(
  "./common/types/safe/acceptors/Primitiveful",
) as typeof Primitiveful;

function InfinInt(
  integer: number,
  context?: string,
): infinint {
  return iint_Primitiveful(
    (integer: number): integer is infinint =>
      Number.isInteger(integer) || integer === Infinity || integer === -Infinity,
    number,
    `infinint: number is not an [infinite] integer`,
    context,
  );
}

module.exports = InfinInt;
