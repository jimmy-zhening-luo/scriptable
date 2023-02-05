declare class Char {
    readonly charset: string[];
    constructor();
    constructor(...chars: Char[]);
    constructor(...strings: string[]);
    constructor(...charsets: string[][]);
    constructor(...charInputs: Char.CharInput[]);
    includes(char: string): boolean;
    toString(): string;
    static get alphaNumeric(): string[];
    static get alphaNumericLower(): string[];
    static get alphaNumericUpper(): string[];
    static get numbers(): string[];
    static get alpha(): string[];
    static get alphaLower(): string[];
    static get alphaUpper(): string[];
    static get dot(): string[];
    static get plus(): string[];
    static get hyphen(): string[];
    static get dollar(): string[];
    static get underscore(): string[];
    static get exclam(): string[];
    static get asterisk(): string[];
    static get quote(): string[];
    static get leftParen(): string[];
    static get rightParen(): string[];
    static get comma(): string[];
    static get leftBrace(): string[];
    static get rightBrace(): string[];
    static get or(): string[];
    static get backslash(): string[];
    static get caret(): string[];
    static get tilde(): string[];
    static get leftBracket(): string[];
    static get rightBracket(): string[];
    static get backTick(): string[];
    static get lessThan(): string[];
    static get greaterThan(): string[];
    static get hash(): string[];
    static get percent(): string[];
    static get doubleQuote(): string[];
    static get semicolon(): string[];
    static get slash(): string[];
    static get question(): string[];
    static get colon(): string[];
    static get at(): string[];
    static get and(): string[];
    static get equal(): string[];
    static get space(): string[];
}
declare namespace Char {
    type CharInput = Char | string | string[];
}
//# sourceMappingURL=Char.d.ts.map