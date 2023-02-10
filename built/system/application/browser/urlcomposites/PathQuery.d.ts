declare const pq_UrlComposite: typeof UrlComposite;
declare class PathQuery extends pq_UrlComposite {
    readonly parts: [Path, Query];
    readonly path: Path;
    readonly query: Query;
    constructor(pathQuery?: PathQuery);
    constructor(path?: string | Path, query?: string | Query);
    get composite(): string;
}
declare namespace PathQuery {
    const _Path: typeof Path;
    const _Query: typeof Query;
}
//# sourceMappingURL=PathQuery.d.ts.map