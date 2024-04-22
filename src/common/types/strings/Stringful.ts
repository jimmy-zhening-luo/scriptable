const f_safe: typeof safe = importModule("brand/Safe") as typeof safe;

declare type stringful = Brand<"stringful">;

function Stringful(
  string: string,
  error?: string,
): stringful {
  return f_safe<"stringful">(
    string,
    (s: string): boolean =>
      s.length === 0,
    `stringful: empty string${error !== undefined
      ? ": " + error
      : ""}`,
  );
}

module.exports = Stringful;
