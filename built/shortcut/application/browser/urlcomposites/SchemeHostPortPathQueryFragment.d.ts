declare const shppqf_UrlComposite: typeof UrlComposite;
declare class SchemeHostPortPathQueryFragment extends shppqf_UrlComposite {
    readonly parts: [
        SchemeHostPort,
        PathQueryFragment
    ];
    readonly schemeHostPort: SchemeHostPort;
    readonly pathQueryFragment: PathQueryFragment;
    constructor(schemeHostPortPathQueryFragment?: SchemeHostPortPathQueryFragment | [
        string | Scheme,
        string | Host,
        string | number | Port,
        string | Path,
        string | Query,
        string | Fragment
    ]);
    constructor(schemeHostPort?: SchemeHostPort, pathQueryFragment?: PathQueryFragment);
    get composite(): string;
}
declare namespace SchemeHostPortPathQueryFragment {
    const _SchemeHostPort: typeof SchemeHostPort;
    const _PathQueryFragment: typeof PathQueryFragment;
}
//# sourceMappingURL=SchemeHostPortPathQueryFragment.d.ts.map