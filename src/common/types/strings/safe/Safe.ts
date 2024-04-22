function safe<S extends string>(
  string: string,
  rejector: rejector = (s: string): boolean =>
    s.length === 0,
  error: string = "",
): Brand<S> {
  if (rejector(string)) {
    throw new TypeError(
      `Safe: ${error}`,
    );
  }

  return string as Brand<S>;
}

module.exports = safe;
