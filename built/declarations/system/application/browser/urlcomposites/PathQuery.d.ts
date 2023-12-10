declare const pq_UrlComposite: typeof UrlComposite;
declare class PathQuery extends pq_UrlComposite {
    readonly parts: [Path, Query];
    readonly path: Path;
    readonly query: Query;
    constructor(pathOrPathQuery?: string | Path | PathQuery, query?: string | Query);
    static get Path(): typeof Path;
    static get Query(): typeof Query;
    static get UrlComposite(): typeof UrlComposite;
    get composite(): string;
}
//# sourceMappingURL=PathQuery.d.ts.map