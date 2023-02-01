declare abstract class ValidString {
    readonly raw: string;
    readonly cleaned: string;
    readonly value: string | null;
    constructor(text: string, { toLower, trim, trimLeading, trimTrailing }: {
        toLower?: boolean;
        trim?: boolean;
        trimLeading?: string[];
        trimTrailing?: string[];
    }, ...allowedChars: Char.CharInput[]);
    get hasValue(): boolean;
    get isValid(): boolean;
    get string(): string;
    toString(): string;
}
declare namespace ValidString {
    const _OneGram: typeof OneGram;
    const _OneCharString: typeof OneCharString;
}
//# sourceMappingURL=ValidString.d.ts.map