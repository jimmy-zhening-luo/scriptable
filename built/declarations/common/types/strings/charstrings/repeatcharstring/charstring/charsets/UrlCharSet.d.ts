declare const u_CharSet: typeof CharSet;
declare class UrlCharSet extends u_CharSet {
    static get hex(): string[];
    static get pchar(): string[];
    static get unreserved(): string[];
    static get reserved(): string[];
    static get percentEncoded(): string[];
    static get genDelims(): string[];
    static get subDelims(): string[];
    static get CharSet(): typeof CharSet;
}
//# sourceMappingURL=UrlCharSet.d.ts.map