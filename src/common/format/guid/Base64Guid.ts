function Base64Guid() {
  function guidchars(guid: string) {
    const hexcharToHex = {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      A: 10,
      B: 11,
      C: 12,
      D: 13,
      E: 14,
      F: 15,
    } as const;

    if (guid.length === 32) {
      const hexes = [...guid] satisfies string[] as Tuple<hexchar, 32>;

      return hexes.map(
        hexchar =>
          hexcharToHex[hexchar],
      ) satisfies hex[] as Tuple<hex, 32>;
    }
    else
      throw new TypeError(
        `Input guid length !== 32`,
        { cause: guid },
      );
  }

  function base64guid(encodedGuid: string) {
    if (encodedGuid.length === 8)
      return encodedGuid as guid<64>;
    else
      throw new TypeError(
        `Generated base64 guid length !== 8`,
        { cause: encodedGuid },
      );
  }

  try {
    const buffer: Octad<hex[]> = [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
    ];
    const guid = guidchars(
      UUID
        .string()
        .replaceAll(
          "-",
          "",
        ),
    );

    for (
      let i: base32 = 0;
      i < 32;
      i = (i + 1) as base32
    )
      buffer[Math.floor(i / 4) as octal].push(guid[i]);

    const quads = buffer as Octad<Quad<hex>>;
    const chars = quads
      .map(
        ([
          q0,
          q1,
          q2,
          q3,
        ]) =>
          q0 + q1 + q2 + q3 as base64,
      )
      .map(
        word =>
          word + 43,
      )
      .map(
        charRangePlus =>
          charRangePlus > 43
            ? charRangePlus + 3
            : charRangePlus,
      )
      .map(
        charRangeSlashDigit =>
          charRangeSlashDigit > 57
            ? charRangeSlashDigit + 7
            : charRangeSlashDigit,
      )
      .map(
        charRangeAlphaUpper =>
          charRangeAlphaUpper > 90
            ? charRangeAlphaUpper + 6
            : charRangeAlphaUpper,
      );

    return base64guid(String.fromCharCode(...chars));
  }
  catch (e) {
    throw new EvalError(
      `Base64Guid`,
      { cause: e },
    );
  }
}

module.exports = Base64Guid;
