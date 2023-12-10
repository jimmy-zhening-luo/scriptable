declare abstract class UrlPart {
    readonly _nominalType: string;
    readonly value: null | string;
    constructor(part?: string | UrlPart);
    static get Repeaters(): typeof Repeaters;
    static get UrlValidators(): typeof UrlValidators;
    get isValid(): boolean;
    static [Symbol.hasInstance](instance: any): boolean;
    toString(): string;
    protected abstract parse(part: string): null | string;
}
//# sourceMappingURL=UrlPart.d.ts.map