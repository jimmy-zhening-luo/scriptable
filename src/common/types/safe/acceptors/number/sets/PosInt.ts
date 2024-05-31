const pint_Primitiveful = importModule(
  `./common/types/safe/acceptors/Primitiveful`,
) as typeof Primitiveful;

function PosInt(
  number: number,
  context?: string,
) {
  return pint_Primitiveful<
    number,
    "posint",
    posint
  >(
    (number): number is
    & number
    & posint =>
      Number
        .isInteger(
          number,
        )
        && number > 0,
    number,
    `posint: number is not a finite, positive integer`,
    context,
  );
}

module.exports = PosInt;
