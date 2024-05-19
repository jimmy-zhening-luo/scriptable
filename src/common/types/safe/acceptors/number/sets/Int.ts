const int_Primitiveful: typeof Primitiveful = importModule(
  "./common/types/safe/acceptors/Primitiveful",
) as typeof Primitiveful;

function Int(
  number: number,
  context?: string,
): int {
  return int_Primitiveful(
    (number: number): number is int =>
      Number.isInteger(number),
    number,
    `int: number is not a finite integer`,
    context,
  );
}

module.exports = Int;
