declare class ValidString {
    readonly cleaned: string;
    private readonly _boundedRepeatCharString;
    constructor(candidateString?: string, { min, max, negate, allowedChars, }?: {
        min?: number;
        max?: number;
        negate?: boolean;
        allowedChars?: Array<ConstructorParameters<typeof BoundedRepeatCharString>[4]>;
    }, cleanOptions?: Parameters<typeof ValidString._clean>[1]);
    static get BoundedRepeatCharString(): typeof BoundedRepeatCharString;
    static get CharSets(): typeof CharSets;
    static get CharSet(): typeof CharSet;
    static get UrlCharSet(): typeof UrlCharSet;
    get value(): typeof BoundedRepeatCharString.prototype.value;
    get isValid(): boolean;
    get min(): number;
    get max(): number;
    private static _clean;
    private static _trimEdge;
    toString(): string;
}
declare namespace ValidString {
    enum Edge {
        Leading = 0,
        Trailing = 1
    }
}
//# sourceMappingURL=ValidString.d.ts.map