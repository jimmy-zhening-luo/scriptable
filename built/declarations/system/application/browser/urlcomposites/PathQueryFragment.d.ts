declare const pqf_UrlComposite: typeof UrlComposite;
declare class PathQueryFragment extends pqf_UrlComposite {
    readonly parts: [PathQuery, Fragment];
    readonly pathQuery: PathQuery;
    readonly fragment: Fragment;
    constructor(pathOrPathQueryOrPathQueryFragment?: PathQuery | [string | Path, string | Query] | PathQueryFragment, fragment?: string | Fragment);
    static get PathQuery(): typeof PathQuery;
    static get Fragment(): typeof Fragment;
    static get UrlComposite(): typeof UrlComposite;
    get composite(): string;
}
//# sourceMappingURL=PathQueryFragment.d.ts.map