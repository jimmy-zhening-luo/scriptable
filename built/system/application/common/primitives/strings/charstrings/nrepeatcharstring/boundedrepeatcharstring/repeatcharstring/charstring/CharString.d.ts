declare abstract class CharString {
    readonly charstring: null | string;
    readonly ofChar: Char;
    constructor(charstring: string);
    constructor(charstring: string, ...ofChars: Char[]);
    constructor(charstring: string, ...ofStrings: string[]);
    constructor(charstring: string, ...ofCharsets: string[][]);
    constructor(charstring: string, ...ofCharInputs: Char.CharInput[]);
    protected abstract qualifies(candidateCharString: string): boolean;
    protected get Char(): typeof Char;
    get isValid(): boolean;
    toString(): string;
}
//# sourceMappingURL=CharString.d.ts.map