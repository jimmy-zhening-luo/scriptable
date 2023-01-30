/// <reference path="Validation.ts" />
namespace Validation {
  export class CharSet {
    readonly chars: string[];
    constructor(
      ...charSets: CharSet.CharSetInput[]
    ) {
      this.chars = new Array<string>();
      charSets.forEach(
        (charset: CharSet.CharSetInput) => {
          charset instanceof CharSet ?
            this.chars.push(
              ...charset.chars
            )
            : Array.isArray(charset) ?
              this.chars.push(...charset)
              : this.chars.push(charset);
        }
      );
    }

    includes(char: string): boolean {
      return this.chars.includes(char);
    }

    static get alphaNumeric(): Array<string> {
      return [
        ...this.numbers,
        ...this.alpha
      ];
    }

    static get alphaNumericLower(): Array<string> {
      return [
        ...this.numbers,
        ...this.alphaLower
      ];
    }

    static get alphaNumericUpper(): Array<string> {
      return [
        ...this.numbers,
        ...this.alphaUpper
      ];
    }

    static get numbers(): Array<string> {
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

    static get alpha(): Array<string> {
      return [
        ...this.alphaLower,
        ...this.alphaUpper
      ];
    }

    static get alphaLower(): Array<string> {
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

    static get alphaUpper(): Array<string> {
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

    static get dot(): string {
      return ".";
    }

    static get plus(): string {
      return "+";
    }

    static get hyphen(): string {
      return "-";
    }

    static get dollar(): string {
      return "$";
    }

    static get underscore(): string {
      return "_";
    }

    static get exclam(): string {
      return "!";
    }

    static get asterisk(): string {
      return "*";
    }

    static get quote(): string {
      return "'";
    }

    static get leftParen(): string {
      return "(";
    }

    static get rightParen(): string {
      return ")";
    }

    static get comma(): string {
      return ",";
    }

    static get leftBrace(): string {
      return "{";
    }

    static get rightBrace(): string {
      return "}";
    }

    static get or(): string {
      return "|";
    }

    static get backslash(): string {
      return "\\";
    }

    static get caret(): string {
      return "^";
    }

    static get tilde(): string {
      return "~";
    }

    static get leftBracket(): string {
      return "[";
    }

    static get rightBracket(): string {
      return "]";
    }

    static get backTick(): string {
      return "`";
    }

    static get lessThan(): string {
      return "<";
    }

    static get greaterThan(): string {
      return ">";
    }

    static get hash(): string {
      return "#";
    }

    static get percent(): string {
      return "%";
    }

    static get doubleQuote(): string {
      return "\"";
    }

    static get semicolon(): string {
      return ";";
    }

    static get slash(): string {
      return "/";
    }

    static get question(): string {
      return "?";
    }

    static get colon(): string {
      return ":";
    }

    static get at(): string {
      return "@";
    }

    static get and(): string {
      return "&";
    }

    static get equal(): string {
      return "=";
    }

    static get space(): string {
      return " ";
    }
  }

  export namespace CharSet {
    export type CharSetInput = CharSet
      | string[]
      | string;

    export class UrlCharSet extends CharSet {
      static get safe(): Array<string> {
        return [
          this.dollar,
          this.hyphen,
          this.underscore,
          this.dot,
          this.plus
        ];
      }

      static get extra(): Array<string> {
        return [
          this.exclam,
          this.asterisk,
          this.quote,
          this.leftParen,
          this.rightParen,
          this.comma
        ];
      }

      static get national(): Array<string> {
        return [
          this.leftBrace,
          this.rightBrace,
          this.or,
          this.backslash,
          this.caret,
          this.tilde,
          this.leftBracket,
          this.rightBracket,
          this.backTick
        ];
      }

      static get punctuation(): Array<string> {
        return [
          this.lessThan,
          this.greaterThan,
          this.hash,
          this.percent,
          this.doubleQuote
        ];
      }

      static get hex(): Array<string> {
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
          "f"
        ];
      }

      static get unreserved(): Array<string> {
        return [
          ...this.alphaNumeric,
          ...this.safe,
          ...this.extra
        ];
      }
    }
  }
}

module.exports = Validation.CharSet;
