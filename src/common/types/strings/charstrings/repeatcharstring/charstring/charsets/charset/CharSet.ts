class CharSet {
  public readonly _nominalType: string = "CharSet";
  public readonly charset: string[];
  public readonly negate: boolean;

  constructor(
    negate?: boolean | CharSet | string | string[],
    ...charsets: Array<CharSet | string | string[]>
  ) {
    try {
      if (negate === undefined)
        this.negate === false;
      else if (typeof negate === "boolean") this.negate = negate; 
      else {
        charsets.unshift(negate);
        this.negate = charsets
          .some(set =>
            set instanceof CharSet && set.negate);
      }

      this.charset = charsets
        .map(set =>
          set instanceof CharSet
            ? set.charset
            : [i]
              .flat()
              .filter(c => c.length === 1))
        .flat();
    }
    catch (e) {
      throw new SyntaxError(
        `CharSet: ctor: Error creating CharSet: \n${e as string}`,
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

  public static [Symbol.hasInstance](instance: any): boolean {
    try {
      return (
        instance !== null
        && instance !== undefined
        && typeof instance === "object"
        && "_nominalType" in instance
        && (instance as CharSet)._nominalType === "CharSet"
      );
    }
    catch (e) {
      throw new EvalError(
        `CharSet: [Symbol.hasInstance]: Unhandled exception on operator 'instanceof': \n${e as string}`,
      );
    }
  }

  public allows(char: string): boolean {
    try {
      return (
        char.length === 1
        && this.charset.includes(char) === !this.negate
      );
    }
    catch (e) {
      throw new EvalError(
        `CharSet: includes: Error checking if CharSet allows char: \n${e as string}`,
      );
    }
  }

  public toString(): string {
    try {
      return this.charset.join(" | ");
    }
    catch (e) {
      throw new EvalError(
        `CharSet: toString: Error converting CharSet to string: \n${e as string}`,
      );
    }
  }
}

module.exports = CharSet;
