declare class MinMaxRepeatedChar extends RepeatedChar {
    readonly minReps: number;
    readonly maxReps: number;
    constructor(minReps: number, maxReps: number, ...charsets: Array<RepeatedChar.RepeatedCharInput>);
    match(token: string): boolean;
}
//# sourceMappingURL=MinMaxRepeatedChar.d.ts.map