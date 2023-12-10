declare const rp_CharString: typeof CharString;
declare class RepeatCharString extends rp_CharString {
    static get CharString(): typeof CharString;
    protected _qualifies(candidateCharString: string): boolean;
}
//# sourceMappingURL=RepeatCharString.d.ts.map