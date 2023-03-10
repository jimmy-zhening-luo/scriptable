const _Char: typeof Char = importModule("char/Char");

class UrlChar extends _Char {
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
      "f",
    ];
  }

  // RFC 3986: https://www.rfc-edi  tor.org/rfc/rfc3986#appendix-A
  static get pchar(): string[] {
    return [
      ...this.unreserved,
      ...this.percentEncoded,
      ...this.subDelims,
      ...this.colon,
      ...this.at,
    ];
  }

  static get unreserved(): string[] {
    return [
      ...this.alphaNumeric,
      ...this.hyphen,
      ...this.dot,
      ...this.underscore,
      ...this.tilde,
    ];
  }

  static get reserved(): string[] {
    return [...this.genDelims, ...this.subDelims];
  }

  static get percentEncoded(): string[] {
    return [...this.percent, ...this.hex];
  }

  static get genDelims(): string[] {
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

  static get subDelims(): string[] {
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

  static get Char(): typeof Char {
    try {
      return _Char;
    } catch (e) {
      throw new ReferenceError(
        `UrlChar: Char: Error importing Char module: ${e}`,
      );
    }
  }
}

module.exports = UrlChar;
