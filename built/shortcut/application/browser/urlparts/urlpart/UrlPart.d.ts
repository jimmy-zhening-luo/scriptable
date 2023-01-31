declare abstract class UrlPart {
    readonly part: string;
    constructor(part?: UrlPart | string);
    get string(): string;
    toString(): string;
    protected abstract parse(part: string): string;
}
//# sourceMappingURL=UrlPart.d.ts.map