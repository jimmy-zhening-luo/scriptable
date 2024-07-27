function guid64() {
  function hex(guid: string) {
    try {
      const normalized = guid
        .replace(
          "-",
          "",
        )
        .toUpperCase();

      if (normalized.length !== 32)
        throw new SyntaxError(`Wrong input guid length (!32)`);
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
        } as const,
        hexchars = [...normalized]
          .filter((char): char is hexchar => char in hexvalue);

        if (hexchars.length !== 32)
          throw new SyntaxError(`Illegal chars in input guid`);
        else
          return hexchars
            .map(hexchar => hexvalue[hexchar]) satisfies hex[] as unknown as Tuple<hex, 32>;
      }
    }
    catch (e) {
      throw new SyntaxError(
        `hexguid(): ${guid}`,
        { cause: e },
      );
    }
  }

  function base64guid(base64guid: string) {
    if (base64guid.length !== 8)
      throw new SyntaxError(
        `Generated wrong base64guid length (!8)`,
        { cause: base64guid },
      );
    else
      return base64guid as guid<64>;
  }

  try {
    const guid = UUID.string(),
    hexchars = hex(guid),
    buffer: Octad<hex[]> = [
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

    const quads = buffer satisfies Octad<hex[]> as unknown as Octad<Quad<hex>>,
    charcodes = quads
      .map(
        ([
          q0,
          q1,
          q2,
          q3,
        ]) => q0 + q1 + q2 + q3 as base64,
      )
      .map(word => word + 43)
      .map(
        charRangePlus => charRangePlus > 43
          ? charRangePlus + 3
          : charRangePlus,
      )
      .map(
        charRangeSlashDigit => charRangeSlashDigit > 57
          ? charRangeSlashDigit + 7
          : charRangeSlashDigit,
      )
      .map(
        charRangeAlphaUpper => charRangeAlphaUpper > 90
          ? charRangeAlphaUpper + 6
          : charRangeAlphaUpper,
      );

    return base64guid(String.fromCharCode(...charcodes));
  }
  catch (e) {
    throw new Error(
      `Base64Guid`,
      { cause: e },
    );
  }
}

module.exports = guid64;
