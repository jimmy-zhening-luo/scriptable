const piint_Primitiveful: typeof Primitiveful = importModule(
  "./common/types/safe/acceptors/Primitiveful",
) as typeof Primitiveful;

function PosInfinInt(
  integer: number,
  context?: string,
): posinfinint {
  return piint_Primitiveful(
    (integer: number): integer is posinfinint =>
      Number.isInteger(integer) && integer > 0 || integer === Infinity,
    integer,
    `posinfinint: number is not an [infinite] integer`,
    context,
  );
}

module.exports = PosInfinInt;
