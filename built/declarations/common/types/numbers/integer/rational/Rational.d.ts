declare const r_Real: typeof Real;
declare class Rational extends r_Real {
    protected readonly _raw: number;
    protected readonly bounds: Bounds;
    protected readonly cardinality: Cardinality;
    constructor(number: number | string | Rational);
    static get Real(): typeof Real;
    get isNaN(): boolean;
    get isZero(): boolean;
    get isNonZero(): boolean;
    get isFinite(): boolean;
    get isInfinity(): boolean;
    get isPositiveInfinity(): boolean;
    get isNegativeInfinity(): boolean;
    get isStrictlyPositive(): boolean;
    get isStrictlyNegative(): boolean;
    get isPositive(): boolean;
    get isNegative(): boolean;
    get isFiniteInteger(): boolean;
    get isInteger(): boolean;
    protected _qualifies(rawNumber: number): boolean;
}
//# sourceMappingURL=Rational.d.ts.map