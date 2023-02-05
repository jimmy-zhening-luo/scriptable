class Char {
    constructor(...charInputs) {
        this.charset = [];
        charInputs.forEach(input => {
            input instanceof Char ?
                this.charset.push(...input.charset)
                : Array.isArray(input) ?
                    this.charset.push(...input)
                    : this.charset.push(input);
        });
    }
    includes(char) {
        return this.charset.includes(char);
    }
    toString() {
        return this.charset.join(" | ");
    }
    static get alphaNumeric() {
        return [
            ...this.numbers,
            ...this.alpha
        ];
    }
    static get alphaNumericLower() {
        return [
            ...this.numbers,
            ...this.alphaLower
        ];
    }
    static get alphaNumericUpper() {
        return [
            ...this.numbers,
            ...this.alphaUpper
        ];
    }
    static get numbers() {
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
    static get alpha() {
        return [
            ...this.alphaLower,
            ...this.alphaUpper
        ];
    }
    static get alphaLower() {
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
    static get alphaUpper() {
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
    static get dot() {
        return ["."];
    }
    static get plus() {
        return ["+"];
    }
    static get hyphen() {
        return ["-"];
    }
    static get dollar() {
        return ["$"];
    }
    static get underscore() {
        return ["_"];
    }
    static get exclam() {
        return ["!"];
    }
    static get asterisk() {
        return ["*"];
    }
    static get quote() {
        return ["'"];
    }
    static get leftParen() {
        return ["("];
    }
    static get rightParen() {
        return [")"];
    }
    static get comma() {
        return [","];
    }
    static get leftBrace() {
        return ["{"];
    }
    static get rightBrace() {
        return ["}"];
    }
    static get or() {
        return ["|"];
    }
    static get backslash() {
        return ["\\"];
    }
    static get caret() {
        return ["^"];
    }
    static get tilde() {
        return ["~"];
    }
    static get leftBracket() {
        return ["["];
    }
    static get rightBracket() {
        return ["]"];
    }
    static get backTick() {
        return ["`"];
    }
    static get lessThan() {
        return ["<"];
    }
    static get greaterThan() {
        return [">"];
    }
    static get hash() {
        return ["#"];
    }
    static get percent() {
        return ["%"];
    }
    static get doubleQuote() {
        return ["\""];
    }
    static get semicolon() {
        return ["];"];
    }
    static get slash() {
        return ["/"];
    }
    static get question() {
        return ["?"];
    }
    static get colon() {
        return [":"];
    }
    static get at() {
        return ["@"];
    }
    static get and() {
        return ["&"];
    }
    static get equal() {
        return ["="];
    }
    static get space() {
        return [" "];
    }
}
module.exports = Char;
//# sourceMappingURL=Char.js.map