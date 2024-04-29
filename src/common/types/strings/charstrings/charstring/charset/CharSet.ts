declare const charset: unique symbol;

declare type ValidChar = char & { [charset]: "allowed" };

class CharSet {
  public readonly name: string = "CharSet";
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
      if (negate === undefined)
        this.negate = false;
      else if (typeof negate === "boolean")
        this.negate = negate;
      else {
        charsets.unshift(negate);
        this.negate = charsets
          .some(set =>
            set instanceof CharSet && set.negate);
      }

      this.chars = charsets
        .map(
          set =>
            set instanceof CharSet
              ? set.chars
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

  public static get alphaNumeric(): char[] {
    return [
      ...this.numbers,
      ...this.alpha,
    ];
  }

  public static get alphaNumericLower(): char[] {
    return [
      ...this.numbers,
      ...this.alphaLower,
    ];
  }

  public static get alphaNumericUpper(): char[] {
    return [
      ...this.numbers,
      ...this.alphaUpper,
    ];
  }

  public static get numbers(): char[] {
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

  public static get alpha(): char[] {
    return [
      ...this.alphaLower,
      ...this.alphaUpper,
    ];
  }

  public static get alphaLower(): char[] {
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

  public static get alphaUpper(): char[] {
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

  public static get dot(): char[] {
    return ["." as char];
  }

  public static get plus(): char[] {
    return ["+" as char];
  }

  public static get hyphen(): char[] {
    return ["-" as char];
  }

  public static get dollar(): char[] {
    return ["$" as char];
  }

  public static get underscore(): char[] {
    return ["_" as char];
  }

  public static get exclam(): char[] {
    return ["!" as char];
  }

  public static get asterisk(): char[] {
    return ["*" as char];
  }

  public static get quote(): char[] {
    return ["'" as char];
  }

  public static get leftParen(): char[] {
    return ["(" as char];
  }

  public static get rightParen(): char[] {
    return [")" as char];
  }

  public static get comma(): char[] {
    return ["," as char];
  }

  public static get leftBrace(): char[] {
    return ["{" as char];
  }

  public static get rightBrace(): char[] {
    return ["}" as char];
  }

  public static get or(): char[] {
    return ["|" as char];
  }

  public static get backslash(): char[] {
    return ["\\" as char];
  }

  public static get caret(): char[] {
    return ["^" as char];
  }

  public static get tilde(): char[] {
    return ["~" as char];
  }

  public static get leftBracket(): char[] {
    return ["[" as char];
  }

  public static get rightBracket(): char[] {
    return ["]" as char];
  }

  public static get backTick(): char[] {
    return ["`" as char];
  }

  public static get lessThan(): char[] {
    return ["<" as char];
  }

  public static get greaterThan(): char[] {
    return [">" as char];
  }

  public static get hash(): char[] {
    return ["#" as char];
  }

  public static get percent(): char[] {
    return ["%" as char];
  }

  public static get doubleQuote(): char[] {
    return ['"' as char];
  }

  public static get semicolon(): char[] {
    return [";" as char];
  }

  public static get slash(): char[] {
    return ["/" as char];
  }

  public static get question(): char[] {
    return ["?" as char];
  }

  public static get colon(): char[] {
    return [":" as char];
  }

  public static get at(): char[] {
    return ["@" as char];
  }

  public static get and(): char[] {
    return ["&" as char];
  }

  public static get equal(): char[] {
    return ["=" as char];
  }

  public static get space(): char[] {
    return [" " as char];
  }

  public static get hex(): char[] {
    return [
      ...this.numbers,
      ...this.alphaUpper.slice(
        0,
        6,
      ),
      ...this.alphaLower.slice(
        0,
        6,
      ),
    ];
  }

  // RFC 3986: https://www.rfc-edi  tor.org/rfc/rfc3986#appendix-A
  public static get pchar(): char[] {
    return [
      ...this.unreserved,
      ...this.percentEncoded,
      ...this.subDelims,
      ...this.colon,
      ...this.at,
    ];
  }

  public static get unreserved(): char[] {
    return [
      ...this.alphaNumeric,
      ...this.hyphen,
      ...this.dot,
      ...this.underscore,
      ...this.tilde,
    ];
  }

  public static get reserved(): char[] {
    return [
      ...this.genDelims,
      ...this.subDelims,
    ];
  }

  public static get percentEncoded(): char[] {
    return [
      ...this.percent,
      ...this.hex,
    ];
  }

  public static get genDelims(): char[] {
    return [
      ...this.colon,
      ...this.slash,
      ...this.question,
      ...this.hash,
      ...this.leftBracket,
      ...this.rightBracket,
      ...this.at,
    ];
  }

  public static get subDelims(): char[] {
    return [
      ...this.exclam,
      ...this.dollar,
      ...this.and,
      ...this.quote,
      ...this.leftParen,
      ...this.rightParen,
      ...this.asterisk,
      ...this.plus,
      ...this.comma,
      ...this.semicolon,
      ...this.equal,
    ];
  }

  public static [Symbol.hasInstance](instance: unknown): boolean {
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

  public allows(c: char): c is ValidChar {
    try {
      if (this.chars.includes(c) !== this.negate)
        return true;
      else
        throw new TypeError(
          `char '${c}' not allowed`,
        );
    }
    catch (e) {
      throw new EvalError(
        `CharSet: allows`,
        { cause: e },
      );
    }
  }

  public toString(): string {
    try {
      return this.chars.join(" | ");
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
