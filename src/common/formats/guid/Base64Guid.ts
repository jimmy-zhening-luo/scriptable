function Base64Guid() {
  function guidchars(
    guid: string,
  ) {
    if (
      guid
        .length === 32
    )
      return [...guid] as guidchars; // skip check bad char, will error later anyway
    else
      throw new RangeError(
        `generated guid does not have 32 hex chars`,
        {
          cause: {
            guid,
            length: guid.length,
          },
        },
      );
  }

  function base64guid(
    shortGuid: string,
  ) {
    if (
      shortGuid
        .length !== 8
    )
      return shortGuid as base64guid; // skip check bad char, I don't care as this is not production code (yet)
    else
      throw new RangeError(
        `base64-encoded guid does not have 8 chars`,
        {
          cause: {
            shortGuid,
            length: shortGuid.length,
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
    const buffer: Eightple<
      number[]
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

    const shortGuid = base64guid(
      buffer
        .map(
          (quad): number =>
            quad
              .reduce(
                (
                  acc: number,
                  vi: number,
                ): number =>
                  acc + vi,
                0,
              ),
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

    if (
      shortGuid
        .length !== 8
    )
      return shortGuid;
    else
      throw new RangeError(
        `generated base64-encoded guid does not have 8 chars`,
        {
          cause: {
            guid,
            shortGuid,
            length: {
              guid: guid.length,
              shortGuid: shortGuid.length,
            },
          },
        },
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
