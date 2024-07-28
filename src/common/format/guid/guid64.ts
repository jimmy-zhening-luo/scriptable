function guid64() {
  try {
    const guid = UUID.string()
      .replace(
        "-",
        "",
      )
      .toUpperCase(),
    CTOH = {
      A: 10,
      B: 11,
      C: 12,
      D: 13,
      E: 14,
      F: 15,
    } as const,
    hexes = [...guid].map(c => typeof CTOH[c as keyof typeof CTOH] === "undefined" ? Number(c) as decimal : CTOH[c as Exclude<hexchar, digit>]) satisfies hex[] as unknown as Tuple<hex, 32>,
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

    hexes.forEach((h, i) => {
      buffer[Math.floor(i / 4) as octal].push(h);
    });

    const quads = buffer satisfies Octad<hex[]> as unknown as Octad<Quad<hex>>,
    chars = quads
      .map(q => q.reduce(
        (q: number, qi) => q + qi,
        0,
      ))
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
