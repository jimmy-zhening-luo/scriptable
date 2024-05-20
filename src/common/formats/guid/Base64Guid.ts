type guidchars = Tuple<hexchar, 32>;

function Base64Guid(): base64guid {
  function guidchars(guid: string): guidchars {
    if (guid.length !== 32)
      throw new RangeError(
        `generated guid does not have 32 hex chars`,
        {
          cause: {
            guid,
            length: guid.length,
          },
        },
      );
    else
      return [...guid] as guidchars; // skip check bad char, will error later anyway
  }

  function base64guid(bg: string): base64guid {
    if (bg.length !== 8)
      throw new RangeError(
        `base64-encoded guid does not have 8 chars`,
        {
          cause: {
            base64guid: bg,
            length: bg.length,
          },
        },
      );
    else
      return bg as base64guid; // skip check bad char, I don't care as this is not production code (yet)
  }

  const hexBase10 = {
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
  const base64Index: Tuple<base64char, 64> = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "+",
    "/",
  ];

  try {
    const error = [];
    const buffer = [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
    ];
    const guid: guidchars = guidchars(
      UUID
        .string()
        .replaceAll(
          "-",
          "",
        ),
    );

    for (let i = 0; i < 32; ++i)
      (buffer[Math.floor(i / 4)] ?? error)
        .push(
          hexBase10[guid[i]],
        );

    if (error.length > 0)
      throw new RangeError(
        `hex guid char placed into out-of-range word buffer`,
        {
          cause: {
            guid,
            error,
            buffer,
          },
        },
      );
    else
      return base64guid(
        buffer
          .map(
            (quad): number =>
              quad
                .reduce(
                  (acc, vi): number =>
                    acc + vi,
                  0,
                ),
          )
          .map(
            (word10): Null<base64char> =>
              base64Index[word10] ?? null,
          )
          .filter(
            (word64): word64 is base64char =>
              word64 !== null,
          )
          .join(
            "",
          ),
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
