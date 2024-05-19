const pint_Primitiveful: typeof Primitiveful = importModule(
  "./common/types/safe/acceptors/Primitiveful",
) as typeof Primitiveful;

function PosInt(
  integer: number,
  context?: string,
): posint {
  return pint_Primitiveful(
    (integer: number): integer is posint =>
      Number.isInteger(integer) && integer > 0,
    integer,
    `posint: number is not a finite, positive integer`,
    context,
  );
}

module.exports = PosInt;
