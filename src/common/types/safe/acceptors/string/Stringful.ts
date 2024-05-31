const s_Primitiveful = importModule(
  `./common/types/safe/acceptors/Primitiveful`,
) as typeof Primitiveful;

function Stringful<
  Prior extends string,
>(
  string: Prior,
  context?: string,
):
  & Prior
  & stringful {
  return s_Primitiveful<
    Prior,
    "stringful",
    & Prior
    & stringful
  >(
    (string): string is
    & Prior
    & stringful =>
      string
        .length > 0,
    string,
    `stringful: string is empty`,
    context,
  );
}

module.exports = Stringful;
