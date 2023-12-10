declare const _RepeatCharString: typeof RepeatCharString;
declare class BoundedRepeatCharString extends _RepeatCharString {
    readonly min: number;
    readonly max: number;
    constructor(min?: number, max?: number, ...repeatCharStringCtorParams: ConstructorParameters<typeof RepeatCharString>);
    static get PositiveInteger(): typeof PositiveInteger;
    static get RepeatCharString(): typeof RepeatCharString;
    protected _qualifies(candidateCharString: string): boolean;
}
//# sourceMappingURL=BoundedRepeatCharString.d.ts.map