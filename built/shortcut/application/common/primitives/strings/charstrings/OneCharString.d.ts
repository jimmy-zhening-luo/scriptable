declare const _NRepeatCharString: typeof NRepeatCharString;
declare class OneRepeatedChar extends _NRepeatCharString {
    constructor(charstring: string);
    constructor(charstring: string, ...ofChars: Char[]);
    constructor(charstring: string, ...ofStrings: string[]);
    constructor(charstring: string, ...ofCharsets: string[][]);
    constructor(charstring: string, ...ofCharInputs: Char.CharInput[]);
}
//# sourceMappingURL=OneCharString.d.ts.map