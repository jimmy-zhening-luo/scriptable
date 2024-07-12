function Base64Guid() {
  function hex(guid: string) {
    try {
      const normal = guid
        .replace(
          "-",
          "",
        )
        .toUpperCase();

      if (normal.length !== 32)
        throw new TypeError(`Wrong input guid length (!32)`);
      else {
        const hexvalue = {
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
        const hexchars = [...normal].filter(
          (char): char is hexchar =>
            char in hexvalue,
        );

        if (hexchars.length !== 32)
          throw new TypeError(`Illegal chars in input guid`);
        else
          return hexchars.map(
            hexchar =>
              hexvalue[hexchar],
          ) as Tuple<hex, 32>;
      }
    }
    catch (e) {
      throw new Error(
        `hexguid(): ${guid}`,
        { cause: e },
      )
    }
  }

  function base64guid(base64guid: string) {
    if (base64guid.length !== 8)
      throw new EvalError(
        `Generated wrong base64guid length (!8)`,
        { cause: base64guid },
      );
    else
      return base64guid as guid<64>;
  }

  try {
    const guid = UUID.string();
    const hexchars = hex(guid);
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

    hexchars.forEach(
      (hexchar, i) => {
        buffer[Math.floor(i / 4) as octal].push(hexchar);
      },
    );

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
    throw new Error(
      `Base64Guid`,
      { cause: e },
    );
  }
}

module.exports = Base64Guid;
