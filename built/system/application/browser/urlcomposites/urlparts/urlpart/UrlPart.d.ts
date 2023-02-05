declare abstract class UrlPart {
    readonly value: null | string;
    readonly ClassDecorator_UrlPart: string;
    constructor(part?: UrlPart | string);
    protected abstract parse(part: string): null | string;
    get isValid(): boolean;
    get string(): string;
    toString(): string;
}
//# sourceMappingURL=UrlPart.d.ts.map