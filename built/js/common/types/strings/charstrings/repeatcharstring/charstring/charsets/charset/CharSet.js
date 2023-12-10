"use strict";
class CharSet {
    constructor(negate, ...charInputs) {
        this.charset = [];
        this.negate = false;
        try {
            if (negate === undefined)
                negate = false;
            else if (typeof negate === "boolean")
                this.negate = negate;
            else
                charInputs.unshift(negate);
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
            throw new SyntaxError(`CharSet: constructor: Error creating CharSet object: \n${e}`);
        }
    }
    static get alphaNumeric() {
        return [
            ...this.numbers,
            ...this.alpha,
        ];
    }
    static get alphaNumericLower() {
        return [
            ...this.numbers,
            ...this.alphaLower,
        ];
    }
    static get alphaNumericUpper() {
        return [
            ...this.numbers,
            ...this.alphaUpper,
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
            "9",
        ];
    }
    static get alpha() {
        return [
            ...this.alphaLower,
            ...this.alphaUpper,
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
            "z",
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
            "Z",
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
        return ['"'];
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
    allows(char) {
        try {
            return (char.length === 1
                && (!this.negate && this.charset.includes(char)
                    || this.negate && !this.charset.includes(char)));
        }
        catch (e) {
            throw new EvalError(`CharSet: includes: Error checking if CharSet allows char: \n${e}`);
        }
    }
    toString() {
        try {
            return this.charset.join(" | ");
        }
        catch (e) {
            throw new EvalError(`CharSet: toString: Error converting CharSet to string: \n${e}`);
        }
    }
}
module.exports = CharSet;
