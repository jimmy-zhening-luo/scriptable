declare const _Char: typeof Char;
declare class UrlChar extends _Char {
    static get safe(): string[];
    static get extra(): string[];
    static get national(): string[];
    static get punctuation(): string[];
    static get hex(): string[];
    static get unreserved(): string[];
}
//# sourceMappingURL=UrlChar.d.ts.map