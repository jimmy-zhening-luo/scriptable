declare const _Rational: typeof Rational;
declare class Integer extends _Rational {
    static get Rational(): typeof Rational;
    protected _qualifies(rawNumber: number): boolean;
}
//# sourceMappingURL=Integer.d.ts.map