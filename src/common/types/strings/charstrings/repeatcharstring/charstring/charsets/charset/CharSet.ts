class CharSet {
  readonly charset: string[] = [];
  readonly negate: boolean = false;

  constructor(
    negate?: boolean | CharSet | string | string[],
    ...charInputs: (CharSet | string | string[])[]
  ) {
    try {
      if (negate === undefined) negate = false;
      else if (typeof negate === "boolean") this.negate = negate;
      else charInputs.unshift(negate);
      charInputs.forEach(input => {
        input instanceof CharSet
          ? this.charset.push(...input.charset)
          : Array.isArray(input)
            ? this.charset.push(...input)
            : this.charset.push(input);
      });
      this.charset.filter(char => char.length === 1);
    }
    catch (e) {
      throw new SyntaxError(
        `CharSet: constructor: Error creating CharSet object: \n${e}`,
      );
    }
  }

  allows(char: string): boolean {
    try {
      return (
        char.length === 1
        && (!this.negate && this.charset.includes(char)
          || this.negate && !this.charset.includes(char))
      );
    }
    catch (e) {
      throw new EvalError(
        `CharSet: includes: Error checking if CharSet allows char: \n${e}`,
      );
    }
  }

  toString(): string {
    try {
      return this.charset.join(" | ");
    }
    catch (e) {
      throw new EvalError(
        `CharSet: toString: Error converting CharSet to string: \n${e}`,
      );
    }
  }

  static get alphaNumeric(): string[] {
    return [
      ...this.numbers,
      ...this.alpha,
    ];
  }

  static get alphaNumericLower(): string[] {
    return [
      ...this.numbers,
      ...this.alphaLower,
    ];
  }

  static get alphaNumericUpper(): string[] {
    return [
      ...this.numbers,
      ...this.alphaUpper,
    ];
  }

  static get numbers(): string[] {
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

  static get alpha(): string[] {
    return [
      ...this.alphaLower,
      ...this.alphaUpper,
    ];
  }

  static get alphaLower(): string[] {
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

  static get alphaUpper(): string[] {
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

  static get dot(): string[] {
    return ["."];
  }

  static get plus(): string[] {
    return ["+"];
  }

  static get hyphen(): string[] {
    return ["-"];
  }

  static get dollar(): string[] {
    return ["$"];
  }

  static get underscore(): string[] {
    return ["_"];
  }

  static get exclam(): string[] {
    return ["!"];
  }

  static get asterisk(): string[] {
    return ["*"];
  }

  static get quote(): string[] {
    return ["'"];
  }

  static get leftParen(): string[] {
    return ["("];
  }

  static get rightParen(): string[] {
    return [")"];
  }

  static get comma(): string[] {
    return [","];
  }

  static get leftBrace(): string[] {
    return ["{"];
  }

  static get rightBrace(): string[] {
    return ["}"];
  }

  static get or(): string[] {
    return ["|"];
  }

  static get backslash(): string[] {
    return ["\\"];
  }

  static get caret(): string[] {
    return ["^"];
  }

  static get tilde(): string[] {
    return ["~"];
  }

  static get leftBracket(): string[] {
    return ["["];
  }

  static get rightBracket(): string[] {
    return ["]"];
  }

  static get backTick(): string[] {
    return ["`"];
  }

  static get lessThan(): string[] {
    return ["<"];
  }

  static get greaterThan(): string[] {
    return [">"];
  }

  static get hash(): string[] {
    return ["#"];
  }

  static get percent(): string[] {
    return ["%"];
  }

  static get doubleQuote(): string[] {
    return ['"'];
  }

  static get semicolon(): string[] {
    return ["];"];
  }

  static get slash(): string[] {
    return ["/"];
  }

  static get question(): string[] {
    return ["?"];
  }

  static get colon(): string[] {
    return [":"];
  }

  static get at(): string[] {
    return ["@"];
  }

  static get and(): string[] {
    return ["&"];
  }

  static get equal(): string[] {
    return ["="];
  }

  static get space(): string[] {
    return [" "];
  }
}

module.exports = CharSet;
