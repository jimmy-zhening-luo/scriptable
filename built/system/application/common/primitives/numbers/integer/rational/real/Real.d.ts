declare abstract class Real {
    readonly bounds: Bounds;
    readonly cardinality: Cardinality;
    constructor(cardinality?: Cardinality, bounds?: Bounds);
    abstract get number(): number;
    toNumber(): number;
    abstract get string(): string;
    toString(): string;
}
declare namespace Real {
    const _AnyCardinality: typeof AnyCardinality;
    const _Infinite: typeof Infinite;
}
//# sourceMappingURL=Real.d.ts.map