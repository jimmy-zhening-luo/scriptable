"use strict";
const u_CharSet = importModule("charset/CharSet");
class UrlCharSet extends u_CharSet {
    static get hex() {
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
    static get pchar() {
        return [
            ...this.unreserved,
            ...this.percentEncoded,
            ...this.subDelims,
            ...this.colon,
            ...this.at,
        ];
    }
    static get unreserved() {
        return [
            ...this.alphaNumeric,
            ...this.hyphen,
            ...this.dot,
            ...this.underscore,
            ...this.tilde,
        ];
    }
    static get reserved() {
        return [
            ...this.genDelims,
            ...this.subDelims,
        ];
    }
    static get percentEncoded() {
        return [
            ...this.percent,
            ...this.hex,
        ];
    }
    static get genDelims() {
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
    static get subDelims() {
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
    static get CharSet() {
        try {
            return u_CharSet;
        }
        catch (e) {
            throw new ReferenceError(`UrlCharSet: CharSet: Error importing CharSet module: \n${e}`);
        }
    }
}
module.exports = UrlCharSet;
