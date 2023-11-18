const u_CharSet: typeof CharSet = importModule(
  "charset/CharSet",
) as typeof CharSet;

class UrlCharSet extends u_CharSet {
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
    return [
      ...this.genDelims,
      ...this.subDelims,
    ];
  }

  static get percentEncoded(): string[] {
    return [
      ...this.percent,
      ...this.hex,
    ];
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

  static get CharSet(): typeof CharSet {
    try {
      return u_CharSet;
    }
    catch (e) {
      throw new ReferenceError(
        `UrlCharSet: CharSet: Error importing CharSet module: \n${e}`,
      );
    }
  }
}

module.exports = UrlCharSet;
