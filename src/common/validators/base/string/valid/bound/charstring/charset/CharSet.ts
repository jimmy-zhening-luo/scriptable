class CharSet {
  public readonly name: literalful<"CharSet"> = "CharSet";
  public readonly chars: char[];
  public readonly negate: boolean;

  constructor(
    negate?:
      | boolean
      | char
      | char[]
      | CharSet,
    ...charsets: Array<
      | char
      | char[]
      | CharSet
    >
  ) {
    try {
      if (typeof negate === "undefined")
        this
          .negate = false;
      else if (typeof negate === "boolean")
        this
          .negate = negate;
      else {
        charsets
          .unshift(
            negate,
          );
        this
          .negate = charsets
            .some(
              set =>
                set instanceof CharSet
                && set
                  .negate,
            );
      }

      this
        .chars = charsets
          .map(
            set =>
              set instanceof CharSet
                ? set
                  .chars
                : [set]
                    .flat(),
          )
          .flat();
    }
    catch (e) {
      throw new EvalError(
        `CharSet: ctor`,
        { cause: e },
      );
    }
  }

  public static get alphaNumeric() {
    return [
      ...this
        .numbers,
      ...this
        .alpha,
    ];
  }

  public static get alphaNumericLower() {
    return [
      ...this
        .numbers,
      ...this
        .alphaLower,
    ];
  }

  public static get alphaNumericUpper() {
    return [
      ...this
        .numbers,
      ...this
        .alphaUpper,
    ];
  }

  public static get numbers() {
    return [
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
    ] as char[];
  }

  public static get alpha() {
    return [
      ...this
        .alphaLower,
      ...this
        .alphaUpper,
    ];
  }

  public static get alphaLower() {
    return [
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
    ] as char[];
  }

  public static get alphaUpper() {
    return [
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
    ] as char[];
  }

  public static get dot() {
    return ["." as char];
  }

  public static get plus() {
    return ["+" as char];
  }

  public static get hyphen() {
    return ["-" as char];
  }

  public static get dollar() {
    return ["$" as char];
  }

  public static get underscore() {
    return ["_" as char];
  }

  public static get exclam() {
    return ["!" as char];
  }

  public static get asterisk() {
    return ["*" as char];
  }

  public static get quote() {
    return ["'" as char];
  }

  public static get leftParen() {
    return ["(" as char];
  }

  public static get rightParen() {
    return [")" as char];
  }

  public static get comma() {
    return ["," as char];
  }

  public static get leftBrace() {
    return ["{" as char];
  }

  public static get rightBrace() {
    return ["}" as char];
  }

  public static get or() {
    return ["|" as char];
  }

  public static get backslash() {
    return ["\\" as char];
  }

  public static get caret() {
    return ["^" as char];
  }

  public static get tilde() {
    return ["~" as char];
  }

  public static get leftBracket() {
    return ["[" as char];
  }

  public static get rightBracket() {
    return ["]" as char];
  }

  public static get backTick() {
    return ["`" as char];
  }

  public static get lessThan() {
    return ["<" as char];
  }

  public static get greaterThan() {
    return [">" as char];
  }

  public static get hash() {
    return ["#" as char];
  }

  public static get percent() {
    return ["%" as char];
  }

  public static get doubleQuote() {
    return ['"' as char];
  }

  public static get semicolon() {
    return [";" as char];
  }

  public static get slash() {
    return ["/" as char];
  }

  public static get question() {
    return ["?" as char];
  }

  public static get colon() {
    return [":" as char];
  }

  public static get at() {
    return ["@" as char];
  }

  public static get and() {
    return ["&" as char];
  }

  public static get equal() {
    return ["=" as char];
  }

  public static get space() {
    return [" " as char];
  }

  public static get hex() {
    return [
      ...this
        .numbers,
      ...this
        .alphaUpper
        .slice(
          0,
          6,
        ),
      ...this
        .alphaLower
        .slice(
          0,
          6,
        ),
    ];
  }

  // RFC 3986: https://www.rfc-edi  tor.org/rfc/rfc3986#appendix-A
  public static get pchar() {
    return [
      ...this
        .unreserved,
      ...this
        .percentEncoded,
      ...this
        .subDelims,
      ...this
        .colon,
      ...this
        .at,
    ];
  }

  public static get unreserved() {
    return [
      ...this
        .alphaNumeric,
      ...this
        .hyphen,
      ...this
        .dot,
      ...this
        .underscore,
      ...this
        .tilde,
    ];
  }

  public static get reserved() {
    return [
      ...this
        .genDelims,
      ...this
        .subDelims,
    ];
  }

  public static get percentEncoded() {
    return [
      ...this
        .percent,
      ...this
        .hex,
    ];
  }

  public static get genDelims() {
    return [
      ...this
        .colon,
      ...this
        .slash,
      ...this
        .question,
      ...this
        .hash,
      ...this
        .leftBracket,
      ...this
        .rightBracket,
      ...this
        .at,
    ];
  }

  public static get subDelims() {
    return [
      ...this
        .exclam,
      ...this
        .dollar,
      ...this
        .and,
      ...this
        .quote,
      ...this
        .leftParen,
      ...this
        .rightParen,
      ...this
        .asterisk,
      ...this
        .plus,
      ...this
        .comma,
      ...this
        .semicolon,
      ...this
        .equal,
    ];
  }

  public static [Symbol.hasInstance](instance: unknown) {
    try {
      return (
        instance !== null
        && typeof instance === "object"
        && (instance as { name: string }).name === "CharSet"
      );
    }
    catch (e) {
      throw new EvalError(
        `CharSet: [Symbol.hasInstance]`,
        { cause: e },
      );
    }
  }

  public allows(
    c: char,
  ): c is validchar {
    try {
      if (
        this.negate !== this
          .chars
          .includes(
            c,
          )
      )
        return true;
      else
        throw new TypeError(
          `char '${
            c
          }' not allowed`,
          {
            cause: {
              "char": c,
              charset: this.toString(),
              negate: this.negate,
            },
          },
        );
    }
    catch (e) {
      throw new EvalError(
        `CharSet: allows`,
        { cause: e },
      );
    }
  }

  public toString() {
    try {
      return `[${
        this
          .chars
          .join(
            ", ",
          )
      }]`;
    }
    catch (e) {
      throw new EvalError(
        `CharSet: toString: Failed to format-print CharSet members`,
        { cause: e },
      );
    }
  }
}

module.exports = CharSet;
