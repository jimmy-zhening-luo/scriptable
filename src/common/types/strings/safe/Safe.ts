function safe<S extends string>(
  s: string,
  rejector: rejector = (s: string): boolean =>
    s.length === 0,
  error: string = "",
): Brand<S> {
  if (rejector(s)) {
    throw new TypeError(
      `Safe: ${error}`,
    );
  }

  return s as Brand<S>;
}

module.exports = safe;
