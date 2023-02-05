declare const pqf_UrlComposite: typeof UrlComposite;
declare class PathQueryFragment extends pqf_UrlComposite {
    readonly parts: [PathQuery, Fragment];
    readonly pathQuery: PathQuery;
    readonly fragment: Fragment;
    constructor(pathQueryFragment?: PathQueryFragment);
    constructor(pathQuery?: PathQuery | [
        string | Path,
        string | Query
    ], fragment?: string | Fragment);
    get composite(): string;
}
declare namespace PathQueryFragment {
    const _PathQuery: typeof PathQuery;
    const _Fragment: typeof Fragment;
}
//# sourceMappingURL=PathQueryFragment.d.ts.map