declare const shp_UrlComposite: typeof UrlComposite;
declare class SchemeHostPort extends shp_UrlComposite {
    readonly parts: [Scheme, HostPort];
    readonly scheme: Scheme;
    readonly hostPort: HostPort;
    constructor(schemeOrSchemeHostPort?: string | Scheme | SchemeHostPort, hostPort?: HostPort | [string | Host, string | number | Port]);
    static get Scheme(): typeof Scheme;
    static get HostPort(): typeof HostPort;
    static get UrlComposite(): typeof UrlComposite;
    get composite(): string;
}
//# sourceMappingURL=SchemeHostPort.d.ts.map