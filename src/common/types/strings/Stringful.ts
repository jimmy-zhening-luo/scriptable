const f_safe: typeof safe = importModule("safe/Safe") as typeof safe;

declare type stringful = Brand<"stringful">;

function Stringful(
  string: string,
  label?: string,
): stringful {
  return f_safe<"stringful">(
    string,
    (s: string): boolean =>
      s.length === 0,
    `stringful: empty string${label !== undefined
      ? ": " + label
      : ""}`,
  );
}

module.exports = Stringful;
