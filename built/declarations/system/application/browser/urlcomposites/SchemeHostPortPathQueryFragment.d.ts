declare const shppqf_UrlComposite: typeof UrlComposite;
declare class SchemeHostPortPathQueryFragment extends shppqf_UrlComposite {
    readonly parts: [SchemeHostPort, PathQueryFragment];
    readonly schemeHostPort: SchemeHostPort;
    readonly pathQueryFragment: PathQueryFragment;
    constructor(schemeHostPortOrSchemeHostPortPathQueryFragment?: SchemeHostPort | SchemeHostPortPathQueryFragment | [
        string | Scheme,
        string | Host,
        string | number | Port,
        string | Path,
        string | Query,
        string | Fragment
    ], pathQueryFragment?: PathQueryFragment);
    static get SchemeHostPort(): typeof SchemeHostPort;
    static get PathQueryFragment(): typeof PathQueryFragment;
    static get UrlComposite(): typeof UrlComposite;
    get composite(): string;
}
//# sourceMappingURL=SchemeHostPortPathQueryFragment.d.ts.map