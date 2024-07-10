function Base64Guid() {
  function guidchars(guid: string) {
    if (guid.length === 32)
      return [...guid] as Tuple<hexchar, 32>;
    else
      throw new TypeError(
        `Invalid guid (length !== 32)`,
        {
          cause: {
            guid,
            length: guid.length,
          },
        },
      );
  }

  function base64guid(encodedGuid: string) {
    if (encodedGuid.length === 8)
      return encodedGuid as guid<64>; // unsafe
    else
      throw new TypeError(
        `Invalid base64-encoded guid (length !== 8)`,
        {
          cause: {
            encodedGuid,
            length: encodedGuid.length,
          },
        },
      );
  }

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
      buffer[Math.floor(i / 4) as octal]
        .push(
          hexcharToHex[guid[i]],
        );

    const chars = buffer
      .filter(
        (row): row is Quad<hex> =>
          row.length === 4,
      )
      .map(
        ([
          q0,
          q1,
          q2,
          q3,
        ]) =>
          q0 + q1 + q2 + q3 as base64,
      )
      .filter(
        (word): word is base64 =>
          word >= 0 && word < 64,
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

    return base64guid(
      String.fromCharCode(...chars),
    );
  }
  catch (e) {
    throw new EvalError(
      `Base64Guid`,
      { cause: e },
    );
  }
}

module.exports = Base64Guid;
