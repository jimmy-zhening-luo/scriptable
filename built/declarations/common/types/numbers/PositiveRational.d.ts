declare const pr_Integer: typeof Integer;
declare class PositiveRational extends pr_Integer.Rational {
    protected cardinality: Cardinality;
    static get Integer(): typeof Integer;
    static get Rational(): typeof Rational;
}
//# sourceMappingURL=PositiveRational.d.ts.map