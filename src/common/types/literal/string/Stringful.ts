const s_typeful: typeof typeful = importModule("./common/types/literal/typeful/Typeful") as typeof typeful;

declare type stringful = Brand<"stringful">;

function Stringful(
  literal: string,
  errorContext?: string,
): stringful {
  return s_typeful<
    stringful,
    string
  >(
    (S: string): S is stringful =>
      S.length !== 0,
    literal,
    "stringful: empty string",
    errorContext,
  );
}

module.exports = Stringful;
