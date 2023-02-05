declare const _RepeatCharString: typeof RepeatCharString;
declare class BoundedRepeatCharString extends _RepeatCharString {
    readonly min: number;
    readonly max: number;
    constructor(min: number, max: number, charstring: string);
    constructor(min: number, max: number, charstring: string, ...ofChars: Char[]);
    constructor(min: number, max: number, charstring: string, ...ofStrings: string[]);
    constructor(min: number, max: number, charstring: string, ...ofCharsets: string[][]);
    constructor(min: number, max: number, charstring: string, ...ofCharInputs: Char.CharInput[]);
}
declare namespace BoundedRepeatCharString {
    const positiveInt: typeof PositiveInteger;
}
//# sourceMappingURL=BoundedRepeatCharString.d.ts.map