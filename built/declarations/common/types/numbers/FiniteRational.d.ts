declare const fr_Integer: typeof Integer;
declare class FiniteRational extends fr_Integer.Rational {
    protected bounds: Bounds;
    static get Integer(): typeof Integer;
    static get Rational(): typeof Rational;
}
//# sourceMappingURL=FiniteRational.d.ts.map