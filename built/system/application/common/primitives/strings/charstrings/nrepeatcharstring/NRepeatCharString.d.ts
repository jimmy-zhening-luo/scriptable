declare const _BoundedRepeatCharString: typeof BoundedRepeatCharString;
declare class NRepeatCharString extends _BoundedRepeatCharString {
    constructor(n: number, charstring: string);
    constructor(n: number, charstring: string, ...ofChars: Char[]);
    constructor(n: number, charstring: string, ...ofStrings: string[]);
    constructor(n: number, charstring: string, ...ofCharsets: string[][]);
    constructor(n: number, charstring: string, ...ofCharInputs: Char.CharInput[]);
    get n(): number;
}
//# sourceMappingURL=NRepeatCharString.d.ts.map