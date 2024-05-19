const s_Primitiveful: typeof Primitiveful = importModule(
  "./common/types/safe/acceptors/Primitiveful",
) as typeof Primitiveful;

function Stringful<S extends string>(
  s: S,
  context?: string,
): S & stringful {
  return s_Primitiveful(
    (s: S): s is S & stringful =>
      s.length > 0,
    s,
    `stringful: string is empty`,
    context,
  );
}

module.exports = Stringful;
