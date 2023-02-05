const _Char: typeof Char = importModule("char/Char");

class UrlChar extends _Char {
  static get safe(): string[] {
    return [
      this.dollar,
      this.hyphen,
      this.underscore,
      this.dot,
      this.plus
    ];
  }

  static get extra(): string[] {
    return [
      this.exclam,
      this.asterisk,
      this.quote,
      this.leftParen,
      this.rightParen,
      this.comma
    ];
  }

  static get national(): string[] {
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

  static get punctuation(): string[] {
    return [
      this.lessThan,
      this.greaterThan,
      this.hash,
      this.percent,
      this.doubleQuote
    ];
  }

  static get hex(): string[] {
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

  // RFC 3986: https://www.rfc-editor.org/rfc/rfc3986#appendix-A

  static get pchar(): string[] {
    return [
      ...this.unreserved,
      ...this.percentEncoded,
      ...this.subDelims,
      this.colon,
    ]
  }

  static get unreserved(): string[] {
    return [
      ...this.alphaNumeric,
      ...this.safe,
      ...this.extra
    ];
  }
}

module.exports = UrlChar;
