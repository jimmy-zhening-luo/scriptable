declare abstract class Real {
    readonly bounds: Bounds;
    readonly cardinality: Cardinality;
    constructor(cardinality?: Cardinality, bounds?: Bounds);
    abstract get number(): number;
    toNumber(): number;
    abstract get string(): string;
    toString(): string;
}
//# sourceMappingURL=Real.d.ts.map