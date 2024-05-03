const s_typeful: typeof typeful = importModule(
  "./common/types/literals/typeful/Typeful",
) as typeof typeful;

function Stringful<Input extends string>(
  literal: Input,
  errorContext?: string,
): stringful & Input {
  return s_typeful<
    stringful & Input,
    Input
  >(
    (S: Input): S is stringful & Input =>
      S.length !== 0,
    literal,
    "stringful: empty string",
    errorContext,
  );
}

module.exports = Stringful;
