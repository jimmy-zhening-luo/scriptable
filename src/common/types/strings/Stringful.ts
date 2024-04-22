const f_safe: typeof safe = importModule("brand/Safe") as typeof safe;

declare type stringful = Brand<"stringful">;

function Stringful(
  s: string,
): stringful {
  return f_safe<"stringful">(
    s,
    (s: string): boolean =>
      s.length === 0,
    `stringful: empty string`,
  );
}

module.exports = Stringful;
