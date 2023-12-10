declare abstract class Real {
    protected abstract readonly _raw: number;
    static get Sets(): typeof Sets;
    static get Bounds(): typeof Sets.Bounds;
    static get Cardinality(): typeof Sets.Cardinality;
    get isValid(): boolean;
    get value(): null | number;
    toNumber(): number;
    toString(): string;
    protected abstract _qualifies(rawNumber: number): boolean;
}
//# sourceMappingURL=Real.d.ts.map