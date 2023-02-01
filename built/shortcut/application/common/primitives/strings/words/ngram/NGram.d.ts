declare const _Word: typeof Word;
declare class NGram extends _Word {
    readonly n: number;
    readonly remainder: string;
    constructor(text: string, n: number);
    get isWord(): boolean;
    get hasValue(): boolean;
    get isValid(): boolean;
    get hasFixedLength(): boolean;
    get hasRemainder(): boolean;
}
declare namespace NGram {
    const positiveInt: typeof PositiveInteger;
}
//# sourceMappingURL=NGram.d.ts.map