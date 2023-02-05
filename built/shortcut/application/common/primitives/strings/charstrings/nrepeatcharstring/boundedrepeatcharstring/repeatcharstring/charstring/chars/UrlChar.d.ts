declare const _Char: typeof Char;
declare class UrlChar extends _Char {
    static get hex(): string[];
    static get pchar(): string[];
    static get unreserved(): string[];
    static get reserved(): string[];
    static get percentEncoded(): string[];
    static get genDelims(): string[];
    static get subDelims(): string[];
}
//# sourceMappingURL=UrlChar.d.ts.map