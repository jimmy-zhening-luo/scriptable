declare const up_ValidString: typeof ValidString;
declare class ValidUrlPart extends up_ValidString {
    constructor(part: string, minLength: number | undefined, maxLength: number | undefined, { toLower, trimLeading, trimTrailing, }: {
        toLower?: boolean;
        trimLeading?: string[];
        trimTrailing?: string[];
    }, ...allowedChars: Array<ConstructorParameters<typeof CharSet>[1]>);
    static get ValidString(): typeof ValidString;
}
//# sourceMappingURL=ValidUrlPart.d.ts.map