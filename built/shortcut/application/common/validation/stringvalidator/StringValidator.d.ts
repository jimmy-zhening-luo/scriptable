declare abstract class StringValidator {
    readonly raw: string;
    readonly allowedChars: Array<OneRepeatedChar>;
    readonly cleaned: string;
    constructor(text: string, { toLower, trim, trimLeading, trimTrailing }: {
        toLower?: boolean;
        trim?: boolean;
        trimLeading?: Array<string>;
        trimTrailing?: Array<string>;
    }, ...allowedChars: Array<StringValidator.StringValidatorInput>);
    private parseStringValidatorInput;
    private clean;
    get validated(): string;
    get isValid(): boolean;
    private get oneGrams();
}
declare namespace StringValidator {
    type StringValidatorInput = StringValidator | OneRepeatedChar | CharSet.CharSetInput;
}
//# sourceMappingURL=StringValidator.d.ts.map