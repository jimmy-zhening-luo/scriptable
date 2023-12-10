declare class StringSplitter {
    readonly separator: string;
    private readonly _merged;
    constructor(stringOrTokens: Parameters<typeof StringSplitter._split>[0], separator?: Parameters<typeof StringSplitter._split>[1], splitOptions?: Parameters<typeof StringSplitter._split>[2], mergeOptions?: Parameters<typeof StringSplitter._merge>[3]);
    static get PositiveInteger(): typeof PositiveInteger;
    get numTokens(): number;
    get length(): number;
    get wasMerged(): boolean;
    private static _merge;
    private static _split;
    private static __aggregate;
    private static __tokenize;
    toTuple(): string[];
    toString(): string;
}
declare namespace StringSplitter {
    enum Direction {
        Left = 0,
        Right = 1
    }
}
//# sourceMappingURL=StringSplitter.d.ts.map