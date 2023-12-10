declare abstract class CharString {
    readonly charset: CharSet;
    private readonly _raw;
    constructor(candidateCharString?: string, ...charsetCtorParams: ConstructorParameters<typeof CharSet>);
    static get CharSets(): typeof CharSets;
    get isValid(): boolean;
    get value(): null | string;
    toString(): string;
    protected abstract _qualifies(candidateCharString: string): boolean;
}
//# sourceMappingURL=CharString.d.ts.map