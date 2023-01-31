declare class CharSet {
    readonly chars: string[];
    constructor(...charSets: CharSet.CharSetInput[]);
    includes(char: string): boolean;
    static get alphaNumeric(): Array<string>;
    static get alphaNumericLower(): Array<string>;
    static get alphaNumericUpper(): Array<string>;
    static get numbers(): Array<string>;
    static get alpha(): Array<string>;
    static get alphaLower(): Array<string>;
    static get alphaUpper(): Array<string>;
    static get dot(): string;
    static get plus(): string;
    static get hyphen(): string;
    static get dollar(): string;
    static get underscore(): string;
    static get exclam(): string;
    static get asterisk(): string;
    static get quote(): string;
    static get leftParen(): string;
    static get rightParen(): string;
    static get comma(): string;
    static get leftBrace(): string;
    static get rightBrace(): string;
    static get or(): string;
    static get backslash(): string;
    static get caret(): string;
    static get tilde(): string;
    static get leftBracket(): string;
    static get rightBracket(): string;
    static get backTick(): string;
    static get lessThan(): string;
    static get greaterThan(): string;
    static get hash(): string;
    static get percent(): string;
    static get doubleQuote(): string;
    static get semicolon(): string;
    static get slash(): string;
    static get question(): string;
    static get colon(): string;
    static get at(): string;
    static get and(): string;
    static get equal(): string;
    static get space(): string;
}
declare namespace CharSet {
    type CharSetInput = CharSet | string[] | string;
}
//# sourceMappingURL=CharSet.d.ts.map