class Char {
  readonly charset: string[];
  constructor();
  constructor(...chars: Char[]);
  constructor(...strings: string[]);
  constructor(...charsets: string[][]);
  constructor(...charInputs: Char.CharInput[]);
  constructor(
    ...charInputs: Char.CharInput[]
  ) {
    this.charset = [];
    charInputs.forEach(input => {
      input instanceof Char ?
        this.charset.push(...input.charset)
        : Array.isArray(input) ?
          this.charset.push(...input)
          : this.charset.push(input);
      }
    );
  }

  includes(char: string[]): boolean {
    return this.charset.includes(char);
  }

  toString(): string[] {
    return this.charset.join(" | ");
  }

  static get alphaNumeric(): string[] {
    return [
      ...this.numbers,
      ...this.alpha
    ];
  }

  static get alphaNumericLower(): string[] {
    return [
      ...this.numbers,
      ...this.alphaLower
    ];
  }

  static get alphaNumericUpper(): string[] {
    return [
      ...this.numbers,
      ...this.alphaUpper
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
      "9"
    ];
  }

  static get alpha(): string[] {
    return [
      ...this.alphaLower,
      ...this.alphaUpper
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
      "z"
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
      "Z"
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
    return ["\""];
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

namespace Char {
  export type CharInput = Char | string[] | string[];
}

module.exports = Char;
