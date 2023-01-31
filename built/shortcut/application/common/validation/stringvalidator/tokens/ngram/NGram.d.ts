declare class NGram extends Gram {
    readonly n: number;
    readonly remainder: string;
    constructor(text: string, n?: number);
    get isToken(): boolean;
    get valid(): boolean;
    get deterministic(): boolean;
    get hasRemainder(): boolean;
}
//# sourceMappingURL=NGram.d.ts.map