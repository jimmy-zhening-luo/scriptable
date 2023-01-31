declare class Rational extends Real {
    readonly value: number | null;
    constructor(value: Rational | number, cardinality?: Cardinality, bounds?: Bounds);
    protected qualifies(value: number): boolean;
    get isNumber(): boolean;
    get isFinite(): boolean;
    get isInfinite(): boolean;
    get isPositiveInfinite(): boolean;
    get isNegativeInfinite(): boolean;
    get isZero(): boolean;
    get isStrictlyPositive(): boolean;
    get isStrictlyNegative(): boolean;
    get isPositive(): boolean;
    get isNegative(): boolean;
    get isInteger(): boolean;
    get string(): string;
    get number(): number;
}
//# sourceMappingURL=Rational.d.ts.map