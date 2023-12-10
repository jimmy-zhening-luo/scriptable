declare const r_ValidUrlPart: typeof ValidUrlPart;
declare class ValidUrlRepeater extends r_ValidUrlPart {
    constructor(part: string, minLength?: number, maxLength?: number, ...allowedChars: Array<ConstructorParameters<typeof ValidUrlPart>[4]>);
    static get ValidUrlPart(): typeof ValidUrlPart;
}
//# sourceMappingURL=ValidUrlRepeater.d.ts.map