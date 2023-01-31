declare abstract class RepeatedChar {
    readonly charset: CharSet;
    constructor(...charsets: Array<RepeatedChar.RepeatedCharInput>);
    abstract match(token: string): boolean;
}
declare namespace RepeatedChar {
    type RepeatedCharInput = RepeatedChar | CharSet.CharSetInput;
}
//# sourceMappingURL=RepeatedChar.d.ts.map