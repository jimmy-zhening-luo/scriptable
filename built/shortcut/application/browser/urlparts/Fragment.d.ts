declare class Fragment extends UrlPart {
    readonly encode: boolean;
    constructor(fragment?: string | Fragment, encode?: boolean);
    get string(): string;
    protected parse(fragment: string): string;
}
//# sourceMappingURL=Fragment.d.ts.map