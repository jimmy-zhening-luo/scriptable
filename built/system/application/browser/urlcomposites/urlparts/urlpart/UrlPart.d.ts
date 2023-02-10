declare abstract class UrlPart {
    readonly value: null | string;
    readonly ClassDecorator_UrlPart: string;
    constructor(part?: null | string | UrlPart);
    protected abstract parse(part: string): null | string;
    get isValid(): boolean;
    toString(): string;
}
//# sourceMappingURL=UrlPart.d.ts.map