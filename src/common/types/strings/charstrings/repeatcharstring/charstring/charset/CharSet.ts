class CharSet {
  public readonly _nominalType: string = "CharSet";
  public readonly members: string[];
  public readonly negate: boolean;

  constructor(
    negate?:
      | boolean
      | string
      | string[]
      | CharSet,
    ...charsets: Array<
      | string
      | string[]
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

      this.members = charsets
        .map(
          set =>
            set instanceof CharSet
              ? set.members
              : [set]
                  .flat()
                  .filter(
                    c =>
                      c.length === 1,
                  ),
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

  public static get alphaNumeric(): string[] {
    return [
      ...this.numbers,
      ...this.alpha,
    ];
  }

  public static get alphaNumericLower(): string[] {
    return [
      ...this.numbers,
      ...this.alphaLower,
    ];
  }

  public static get alphaNumericUpper(): string[] {
    return [
      ...this.numbers,
      ...this.alphaUpper,
    ];
  }

  public static get numbers(): string[] {
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
    ];
  }

  public static get alpha(): string[] {
    return [
      ...this.alphaLower,
      ...this.alphaUpper,
    ];
  }

  public static get alphaLower(): string[] {
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
    ];
  }

  public static get alphaUpper(): string[] {
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
    ];
  }

  public static get dot(): string[] {
    return ["."];
  }

  public static get plus(): string[] {
    return ["+"];
  }

  public static get hyphen(): string[] {
    return ["-"];
  }

  public static get dollar(): string[] {
    return ["$"];
  }

  public static get underscore(): string[] {
    return ["_"];
  }

  public static get exclam(): string[] {
    return ["!"];
  }

  public static get asterisk(): string[] {
    return ["*"];
  }

  public static get quote(): string[] {
    return ["'"];
  }

  public static get leftParen(): string[] {
    return ["("];
  }

  public static get rightParen(): string[] {
    return [")"];
  }

  public static get comma(): string[] {
    return [","];
  }

  public static get leftBrace(): string[] {
    return ["{"];
  }

  public static get rightBrace(): string[] {
    return ["}"];
  }

  public static get or(): string[] {
    return ["|"];
  }

  public static get backslash(): string[] {
    return ["\\"];
  }

  public static get caret(): string[] {
    return ["^"];
  }

  public static get tilde(): string[] {
    return ["~"];
  }

  public static get leftBracket(): string[] {
    return ["["];
  }

  public static get rightBracket(): string[] {
    return ["]"];
  }

  public static get backTick(): string[] {
    return ["`"];
  }

  public static get lessThan(): string[] {
    return ["<"];
  }

  public static get greaterThan(): string[] {
    return [">"];
  }

  public static get hash(): string[] {
    return ["#"];
  }

  public static get percent(): string[] {
    return ["%"];
  }

  public static get doubleQuote(): string[] {
    return ['"'];
  }

  public static get semicolon(): string[] {
    return ["];"];
  }

  public static get slash(): string[] {
    return ["/"];
  }

  public static get question(): string[] {
    return ["?"];
  }

  public static get colon(): string[] {
    return [":"];
  }

  public static get at(): string[] {
    return ["@"];
  }

  public static get and(): string[] {
    return ["&"];
  }

  public static get equal(): string[] {
    return ["="];
  }

  public static get space(): string[] {
    return [" "];
  }

  public static get hex(): string[] {
    return [
      ...this.numbers,
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
    ];
  }

  // RFC 3986: https://www.rfc-edi  tor.org/rfc/rfc3986#appendix-A
  public static get pchar(): string[] {
    return [
      ...this.unreserved,
      ...this.percentEncoded,
      ...this.subDelims,
      ...this.colon,
      ...this.at,
    ];
  }

  public static get unreserved(): string[] {
    return [
      ...this.alphaNumeric,
      ...this.hyphen,
      ...this.dot,
      ...this.underscore,
      ...this.tilde,
    ];
  }

  public static get reserved(): string[] {
    return [
      ...this.genDelims,
      ...this.subDelims,
    ];
  }

  public static get percentEncoded(): string[] {
    return [
      ...this.percent,
      ...this.hex,
    ];
  }

  public static get genDelims(): string[] {
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

  public static get subDelims(): string[] {
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
        && "_nominalType" in instance
        && (instance as CharSet)._nominalType === "CharSet"
      );
    }
    catch (e) {
      throw new EvalError(
        `CharSet: [Symbol.hasInstance]`,
        { cause: e },
      );
    }
  }

  public allows(char: string): boolean {
    try {
      if (char.length !== 1)
        throw new RangeError(
          `expected char of length 1; instead, char '${char}' has length ${char}`,
        );
      else
        return this.members.includes(char) !== this.negate;
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
      return this.members.join(" | ");
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
