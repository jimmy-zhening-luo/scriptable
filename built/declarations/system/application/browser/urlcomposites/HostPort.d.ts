declare const hp_UrlComposite: typeof UrlComposite;
declare class HostPort extends hp_UrlComposite {
    readonly parts: [Host, Port];
    readonly host: Host;
    readonly port: Port;
    constructor(hostOrHostPort?: string | Host | HostPort, port?: string | number | Port);
    static get Host(): typeof Host;
    static get Port(): typeof Port;
    static get UrlComposite(): typeof UrlComposite;
    get composite(): string;
}
//# sourceMappingURL=HostPort.d.ts.map