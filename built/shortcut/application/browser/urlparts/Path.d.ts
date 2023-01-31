declare class Path extends UrlPart {
    constructor(path?: (string | Path | undefined));
    protected parse(path: string): string;
}
declare class Query extends UrlPart {
    readonly params: Array<typeof Query.QueryParam>;
    constructor(query?: (string | Query | undefined));
    protected static get QueryParam(): any;
    protected parse(query: string): string;
    static fromObjectEntries(): void;
    static fromQueryString(): void;
}
//# sourceMappingURL=Path.d.ts.map