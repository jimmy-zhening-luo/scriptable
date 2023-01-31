class UrlCharSet extends CharSet {
    static get safe() {
        return [
            this.dollar,
            this.hyphen,
            this.underscore,
            this.dot,
            this.plus
        ];
    }
    static get extra() {
        return [
            this.exclam,
            this.asterisk,
            this.quote,
            this.leftParen,
            this.rightParen,
            this.comma
        ];
    }
    static get national() {
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
    static get punctuation() {
        return [
            this.lessThan,
            this.greaterThan,
            this.hash,
            this.percent,
            this.doubleQuote
        ];
    }
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
            "f"
        ];
    }
    static get unreserved() {
        return [
            ...this.alphaNumeric,
            ...this.safe,
            ...this.extra
        ];
    }
}
//# sourceMappingURL=UrlCharSet.js.map