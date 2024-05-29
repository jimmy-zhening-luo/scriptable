function Base64Guid() {
  function guidchars(
    guid: string,
  ) {
    if (
      guid
        .length === 32
    )
      return [...guid] as Tuple<
        hexchar
        ,
        32
      >;
    else
      throw new TypeError(
        `Unexpected: invalid guid (length !== 32)`,
        {
          cause: {
            guid,
            length: guid.length,
          },
        },
      );
  }

  function base64guid(
    encodedGuid: string,
  ) {
    if (
      encodedGuid
        .length === 8
    )
      return encodedGuid as stringful; // unsafe
    else
      throw new TypeError(
        `Unexpected: invalid base64-encoded guid (length !== 8)`,
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
  const base64ToBase64Char = [
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
  ] as const;

  try {
    const buffer: Octad<
      hex[]
    > = [
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
      buffer[
        Math
          .floor(
            i / 4,
          ) as octal
      ]
        .push(
          hexcharToHex[
            guid[
              i
            ]
          ],
        );

    const encodedGuid = base64guid(
      buffer
        .filter(
          (row): row is Quad<
            hex
          > =>
            row
              .length === 4,
        )
        .map(
          quad =>
            (
              quad[0]
              + quad[1]
              + quad[2]
              + quad[3]
            ) as base64,
        )
        .filter(
          (word): word is base64 =>
            word >= 0
            && word < 64,
        )
        .map(
          word =>
            base64ToBase64Char[
              word
            ],
        )
        .filter(
          (base64char): base64char is base64char =>
            typeof base64char === "string",
        )
        .join(
          "",
        ),
    );

    return encodedGuid;
  }
  catch (e) {
    throw new EvalError(
      `Base64Guid`,
      { cause: e },
    );
  }
}

module.exports = Base64Guid;
