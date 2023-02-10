declare const shp_UrlComposite: typeof UrlComposite;
declare class SchemeHostPort extends shp_UrlComposite {
    readonly parts: [Scheme, HostPort];
    readonly scheme: Scheme;
    readonly hostPort: HostPort;
    constructor(schemeHostPort?: SchemeHostPort);
    constructor(scheme?: string | Scheme, hostPort?: HostPort | [
        string | Host,
        string | number | Port
    ]);
    get composite(): string;
}
declare namespace SchemeHostPort {
    const _Scheme: typeof Scheme;
    const _HostPort: typeof HostPort;
}
//# sourceMappingURL=SchemeHostPort.d.ts.map