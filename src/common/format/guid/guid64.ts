function guid64() {
  try {
    const guid = UUID
      .string()
      .replace(
        "-",
        "",
      )
      .toUpperCase(),
    CTOH = {
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
    hexes = [...guid]
      .map(c => CTOH[c as hexchar]) satisfies hex[] as unknown as Tuple<hex, 32>,
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

    hexes.forEach((h, i) => { buffer[Math.floor(i / 4) as octal].push(h) });

    const quads = buffer satisfies Octad<hex[]> as unknown as Octad<Quad<hex>>,
    chars = quads
      .map(q => q.reduce((q, qi) => q + qi, 0))
      .map(c => c + 43)
      .map(c => c > 43 ? c + 3 : c)
      .map(c => c > 57 ? c + 7 : c)
      .map(c => c > 90 ? c + 6 : c);

    return String.fromCharCode(...chars) as guid<64>;
  }
  catch (e) {
    throw new Error(
      `guid64`,
      { cause: e },
    );
  }
}

module.exports = guid64;
